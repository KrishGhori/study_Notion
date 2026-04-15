const mongoose = require("mongoose");
require("dotenv").config();

function buildUriWithDbName(uri, dbName) {
  const match = uri.match(/^(mongodb(?:\+srv)?:\/\/[^/]+\/)([^?]*)(\?.*)?$/i);

  if (!match) {
    throw new Error("Invalid MongoDB URI format in MONGODB_URL");
  }

  const prefix = match[1];
  const query = match[3] || "";

  return `${prefix}${dbName}${query}`;
}

async function copyCollectionWithUpsert(sourceDb, targetDb, collectionName) {
  const sourceCollection = sourceDb.collection(collectionName);
  const targetCollection = targetDb.collection(collectionName);

  const docs = await sourceCollection.find({}).toArray();

  if (docs.length === 0) {
    return { copied: 0, skipped: true };
  }

  const chunkSize = 500;
  let copied = 0;

  for (let i = 0; i < docs.length; i += chunkSize) {
    const chunk = docs.slice(i, i + chunkSize);
    const operations = chunk.map((doc) => ({
      replaceOne: {
        filter: { _id: doc._id },
        replacement: doc,
        upsert: true,
      },
    }));

    const result = await targetCollection.bulkWrite(operations, { ordered: false });
    copied += result.upsertedCount + result.modifiedCount + result.matchedCount;
  }

  return { copied, skipped: false };
}

async function main() {
  const baseUri = process.env.MONGODB_URL;

  if (!baseUri) {
    throw new Error("MONGODB_URL is missing in .env");
  }

  const sourceUri = buildUriWithDbName(baseUri, "test");
  const targetUri = buildUriWithDbName(baseUri, "studynotion");

  const sourceConn = mongoose.createConnection(sourceUri);
  const targetConn = mongoose.createConnection(targetUri);

  try {
    await Promise.all([sourceConn.asPromise(), targetConn.asPromise()]);

    const collections = await sourceConn.db
      .listCollections({}, { nameOnly: true })
      .toArray();

    const userCollections = collections
      .map((c) => c.name)
      .filter((name) => !name.startsWith("system."));

    if (userCollections.length === 0) {
      console.log("No user collections found in test database.");
      return;
    }

    console.log(`Found ${userCollections.length} collections in test.`);

    for (const name of userCollections) {
      const { copied, skipped } = await copyCollectionWithUpsert(
        sourceConn.db,
        targetConn.db,
        name
      );

      if (skipped) {
        console.log(`- ${name}: empty, skipped`);
      } else {
        console.log(`- ${name}: migrated ${copied} docs (upsert mode)`);
      }
    }

    console.log("Migration completed from test -> studynotion.");
  } finally {
    await Promise.all([sourceConn.close(), targetConn.close()]);
  }
}

main().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
