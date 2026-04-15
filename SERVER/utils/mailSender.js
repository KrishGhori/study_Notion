    const nodemailer = require("nodemailer");

    const mailSender = async (email, title, body) => {
        try {
            // Validate env vars before attempting send
            if (!process.env.MAIL_HOST || !process.env.MAIL_PORT || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
                throw new Error("❌ MISSING EMAIL CONFIG: Check MAIL_HOST, MAIL_PORT, MAIL_USER, and MAIL_PASS in .env file");
            }

            const transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,      
                secure: false,                     
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            });

            const info = await transporter.sendMail({
                from: `"StudyNotion" <${process.env.MAIL_USER}>`,
                to: email,
                subject: title,
                html: body,
            });

            console.log("✅ Email sent to:", email);
            console.log("Response:", info.response);
            return info;

        } catch (error) {
            if (error.code === "EAUTH") {
                console.error("❌ AUTHENTICATION FAILED - Gmail rejected credentials");
                console.error("📋 SOLUTION for Gmail:");
                console.error("  1. Enable 2-Factor Authentication on your Google account");
                console.error("  2. Generate an App Password at: https://myaccount.google.com/apppasswords");
                console.error("  3. Use the 16-char APP PASSWORD in .env as MAIL_PASS (not your regular password)");
                console.error("  4. Ensure MAIL_USER is your full Gmail address (e.g., you@gmail.com)");
                console.error("  5. Restart the app after updating .env");
            }
            
            console.error("❌ Mail send error:", error.message || error);
            throw error;
        }
    };

    module.exports = mailSender;