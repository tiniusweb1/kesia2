import type { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from '../../services/emailservice';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { to, subject, text } = req.body;

        try {
            const { success, result, error } = await sendEmail(to, subject, text);
            if (success) {
                res.status(200).json({ success: true, message: 'Email sent successfully', result });
            } else {
                throw error;
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to send email', error: (error as Error).message });
        }
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export const apiFunction = async (to: string, subject: string, text: string) => {
    try {
        const response = await fetch('/api/emailservice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to, subject, text }),
        });

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};