import nodemailer, { SendMailOptions, SentMessageInfo } from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
  }
});

const sendEmail = (to: string, subject: string, text: string): Promise<string> => {
  const mailOptions: SendMailOptions = {
    from: 'tinius.lono@hotmail.com',
    to,
    subject,
    text
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
};

export default sendEmail;