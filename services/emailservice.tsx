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

const sendEmail = async (to: string, subject: string, text: string): Promise<{ success: boolean, result?: SentMessageInfo, error?: Error }> => {
  const mailOptions: SendMailOptions = {
    from: 'tinius.lono@hotmail.com',
    to,
    subject,
    text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, result: info };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

export default sendEmail;