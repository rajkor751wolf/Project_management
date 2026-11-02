import Mailgen from "mailgen";
import nodemailer from "nodemailer";


const sendmail=async(options)=>{
     const mailGenerator=new Mailgen({
        theme: "default",
        product:{
            name:"Task Manager",
            link:"https://taskmanagelink.com"
        }

     })

     const emailTextual=mailGenerator.generatePlaintext(options.mailgenContent)
     const emailHtml=mailGenerator.generatePlaintext(options.mailgenContent)

     nodemailer.createTransport({
        host:process.env.MAILTRAP_SMTP_HOST,
        port:process.env.MAILTRAP_SMTP_PORT,
        auth:{
            user:process.env.MAILTRAP_SMTP_USER,
            pass:process.env.MAILTRAP_SMTP_PASS,
        }
     })


     const mail={
        from:"mail.taskmanger@example.com",
        to:options.email,
        Subject:options.subject,
        text:emailTextual,
        html:emailHtml
     }


     try{
        await transporter.sendMail(mail)
     }catch(error){
        console.error("Email serviece failed silently because of the credentials")
        console.error("Error:",error)
     }
}


const emailVerificationMailgenContent=(username,verificationUrl)=>{
    return {
        body:{
            name: username,
            intro:"Welcome to promang app! We are excited to have you on board",
            action:{
                instructions:"To verify the email please click on the following button",
                button:{
                    color: "#00f700",
                    text:"verify your email",
                    link : verificationUrl
                }
            },
            outro:"If you Need any help please reply to this email."
        },
    };
};
const forgotPasswordMailgenContent=(username,passwordResetUrl)=>{
    return {
        body:{
            name: username,
            intro:"We got your request to reset your password",
            action:{
                instructions:"To reset password please click on the following button",
                button:{
                    color: "#00f700",
                    text:"Reset Password",
                    link : passwordResetUrl
                }
            },
            outro:"If you Need any help please reply to this email."
        },
    };
};

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent
}