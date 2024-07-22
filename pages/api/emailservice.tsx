import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer, { SendMailOptions, SentMessageInfo } from 'nodemailer';

// Define the type for your form data
type MyFormData = {
    name: string;
    email: string;
    subject?: string;
    message: string;
};

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Or use 'gmail' or other services as needed
    port: 587,
    secure: false, // For port 587 or true for 465
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
    },
});

const sendEmail = async (
    formData: MyFormData
): Promise<{ success: boolean; result?: SentMessageInfo; error?: Error }> => {
    const mailOptions: SendMailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: formData.email, // Recipient's email from form data
        subject: formData.subject || 'New Contact Form Submission', // Subject line
        text: `You have a new contact form submission from ${formData.name}. Email: ${formData.email}. Message: ${formData.message}`, // Plain text body
        // html: "<p>HTML version of the message</p>" // HTML body (optional)
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        return { success: true, result };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error: error as Error };
    }
};

const handleEmailRequest = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method === 'POST') {
        const formData: MyFormData = req.body;
        const { success, result, error } = await sendEmail(formData);

        if (success) {
            console.log('Email sent: ', result);
            res.status(200).json({
                message: 'Email sent successfully',
                info: result,
            });
        } else {
            console.error('Failed to send email:', error);
            res.status(500).json({
                error: 'Failed to send email',
                details: error?.message,
            });
        }
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handleEmailRequest;
