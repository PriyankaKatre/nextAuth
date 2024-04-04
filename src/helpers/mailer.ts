import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel'

export const sendEmail = async ({ email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }
        let transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f28d3a62eddee9", // X
                pass: "5c4f64e2e4d999" // X
            }
        });

       const mailOptions =  {
            from: 'priyanka@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Your Password',
           html: `<p>Click <a href=${process.env.DOMAIN}/verifyemail?token=${hashedToken}>Here </a> to ${emailType === 'VERIFY' ? "Verify Your Email" : "Reset Your Password"}
            or copy paste the link below in your browser.
            <br />
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
           </p>`,
       }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse
     }
    catch (error: any) {
        throw new Error(error.message)
        console.log(error)
    }
}
