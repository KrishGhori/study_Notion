const mongoose = require("mongoose") ;
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email :{
        type : String ,
        required : true
    } ,
    otp : {
        type : String ,
        required : true
    } ,
    createdAt : {
        type : Date ,
        default : Date.now ,
        expires : 5 * 60
    }
}) ;


async function sendVerificationEmail(email, otp) {
    try {
        const body = `
            <h2>Email Verification</h2>
            <p>Your OTP is:</p>
            <h1>${otp}</h1>
            <p>This OTP is valid for 5 minutes.</p>
        `;

        const mailResponse = await mailSender(
            email,
            "Verification Email from StudyNotion",
            body
        );

        console.log("✅ Email sent successfully", mailResponse);

    } catch (error) {
        console.error("❌ Email send failed:", error.message);
        // Re-throw so pre-hook can decide to continue or fail
        throw error;
    }
}

otpSchema.pre("save", async function () {
    try {
        await sendVerificationEmail(this.email, this.otp);
    } catch (error) {
        console.error("⚠️ Email failed but OTP saved to DB. User can retry signup:", error.message);
        // Do NOT rethrow - allow OTP to save even if mail fails
    }
});

module.exports = mongoose.model("OTP",otpSchema)

