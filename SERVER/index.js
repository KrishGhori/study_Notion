const express = require("express") ;
const app = express() ; 
const dotenv =require("dotenv")
dotenv.config();

const userRoute = require("./routes/User")
const profileRoute = require("./routes/Profile")
const paymentRoute = require("./routes/Payment")
const courseRoute = require("./routes/Course")
const {auth} = require("./middelwares/auth")
const {deleteAccount} = require("./controllers/Profile")


const database = require("./config/database") ;
const cookieParser = require("cookie-parser") ;
const cors = require("cors")
const {cloudinaryConnect} = require("./config/coludinary")
const fileuploader = require("express-fileupload")

const PORT = process.env.PORT || 4000 ;
const allowedOrigins = new Set([
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    "https://localhost:5173",
    "https://127.0.0.1:5173",
    "https://localhost:3000",
    "https://127.0.0.1:3000",
    "https://localhost:4173",
    "https://127.0.0.1:4173",
])

database.connect() ;

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin : (origin, callback) => {
            if (!origin || allowedOrigins.has(origin)) {
                return callback(null, true)
            }

            return callback(null, false)
        },
        credentials : true
    })
)

app.use(fileuploader({
    useTempFiles:true ,
    tempFileDir : "/tmp"
}))


// cloudinary connection
cloudinaryConnect();

//// routes 
app.use("/api/v1/auth",userRoute)
app.use("/api/v1/profile",profileRoute)
app.use("/api/v1/payment",paymentRoute)
app.use("/api/v1/course",courseRoute)
app.delete("/api/v1/deleteProfile", auth, deleteAccount)


// def route 
app.get("/",(req,res)=>{
    return res.json({
        success : true ,
        message : "your surver is running..."
    })
})


app.listen(PORT , ()=>{
    console.log(`app is running at PORT No. ${PORT}`)
})