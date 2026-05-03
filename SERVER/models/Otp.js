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
    const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="margin: 0 0 16px; color: #111827;">Email Verification</h2>
            <p style="margin: 0 0 12px;">Your OTP is:</p>
            <div style="margin: 16px 0; font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #0f172a;">${otp}</div>
            <p style="margin: 0;">This OTP is valid for 5 minutes.</p>
        </div>
    `;

    const mailResponse = await mailSender(
        email,
        "Verification Email from StudyNotion",
        body
    );

    console.log("? Email sent successfully", mailResponse);
}

otpSchema.pre("save", async function () {
    await sendVerificationEmail(this.email, this.otp);
});

module.exports = mongoose.model("OTP",otpSchema)
