const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        // Log all configuration (with sensitive parts hidden)
        console.log("\n" + "=".repeat(60));
        console.log("📧 EMAIL CONFIGURATION CHECK:");
        console.log("=".repeat(60));
        console.log("MAIL_HOST:", process.env.MAIL_HOST);
        console.log("MAIL_PORT:", process.env.MAIL_PORT);
        console.log("MAIL_USER:", process.env.MAIL_USER);
        console.log("MAIL_PASS length:", process.env.MAIL_PASS ? process.env.MAIL_PASS.length + " chars" : "NOT SET");
        console.log("=".repeat(60) + "\n");

        // Validate env vars before attempting send
        if (!process.env.MAIL_HOST) {
            throw new Error("❌ MISSING MAIL_HOST - Set in .env file");
        }
        if (!process.env.MAIL_PORT) {
            throw new Error("❌ MISSING MAIL_PORT - Set in .env file");
        }
        if (!process.env.MAIL_USER) {
            throw new Error("❌ MISSING MAIL_USER - Set in .env file (your email)");
        }
        if (!process.env.MAIL_PASS) {
            throw new Error("❌ MISSING MAIL_PASS - Set in .env file (app password for Gmail)");
        }

        console.log("✅ All email config variables are present");

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,      
            secure: process.env.MAIL_PORT == 465 ? true : false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        console.log("🔗 Testing email transporter connection...");
        await transporter.verify();
        console.log("✅ Transporter verified successfully");

        console.log("📤 Sending email to:", email);
        console.log("Subject:", title);
        
        const info = await transporter.sendMail({
            from: `"StudyNotion" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("✅ EMAIL SENT SUCCESSFULLY!");
        console.log("Server Response:", info.response);
        console.log("=".repeat(60) + "\n");
        return info;

    } catch (error) {
        console.error("\n" + "❌".repeat(30));
        console.error("EMAIL SENDING FAILED");
        console.error("❌".repeat(30));
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);
        
        if (error.code === "EAUTH") {
            console.error("\n🔐 AUTHENTICATION ERROR - Credentials rejected");
            console.error("📋 FIX FOR GMAIL:");
            console.error("  1. Go to: https://myaccount.google.com/apppasswords");
            console.error("  2. Select 'Mail' and 'Windows Computer'");
            console.error("  3. Google will generate a 16-character password");
            console.error("  4. Copy it exactly (spaces included)");
            console.error("  5. Update .env: MAIL_PASS=<your-16-char-password>");
            console.error("  6. RESTART the server");
            console.error("\n  ⚠️ DO NOT use your regular Gmail password!");
        } else if (error.code === "ECONNREFUSED") {
            console.error("\n🌐 CONNECTION ERROR - Cannot connect to email server");
            console.error("  Check: MAIL_HOST=smtp.gmail.com");
            console.error("  Check: MAIL_PORT=587");
        } else if (error.code === "EHOSTUNREACH") {
            console.error("\n🌐 HOST UNREACHABLE - Server not found");
            console.error("  Verify MAIL_HOST is correct");
        }
        
        console.error("\n📋 COMPLETE CHECKLIST:");
        console.error("  [ ] Is .env file in SERVER folder?");
        console.error("  [ ] Are these lines in .env?");
        console.error("      MAIL_HOST=smtp.gmail.com");
        console.error("      MAIL_PORT=587");
        console.error("      MAIL_USER=your-email@gmail.com");
        console.error("      MAIL_PASS=your-16-char-app-password");
        console.error("  [ ] Did you use Gmail App Password (not regular password)?");
        console.error("  [ ] Did you restart the server after updating .env?");
        console.error("  [ ] Is your internet connection working?");
        console.error("❌".repeat(30) + "\n");
        
        throw error;
    }
};

module.exports = mailSender;
