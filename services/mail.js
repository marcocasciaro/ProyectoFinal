const nodemailer = require("nodemailer");



const send = async(obj) => {
    try{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth : {
            user : process.env.MAIL_USER,
            pass : process.env.MAIL_PASSWORD,
        }
    });
    const info = {
        to : obj.mail,
        message: obj.message
    }
    const sendMail = await transporter.sendMail(info);
    return sendMail;
    }
    catch(error){
        console.log(error);
    }
}


module.exports = {send};