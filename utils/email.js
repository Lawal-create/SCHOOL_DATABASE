const nodemailer=require("nodemailer")

    const sendEmails=async(options)=>{
        //Creates a transporter
        const transporter=nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        //Defines the mail options
        const mailOptions={
            from:"Hakeem Lawal <lawinohal@gmail.com>",
            to:options.email,
            subject:options.subject,
            text:options.value
        }
        //Sends the mail
        await transporter.sendMail(mailOptions)
}

module.exports=sendEmails