import React, { useState, ChangeEvent, FormEvent } from 'react';
import sendEmail from '../services/emailservice';
import { AxiosError } from 'axios';

interface FormData {
    name: string;
    phone: string;
    subject: string;
    email: string;
    message: string;
}

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        subject: '',
        email: '',
        message: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form data
        if (!formData.email || !formData.subject || !formData.message) {
            console.error('All fields are required.');
            // Update component's state here to display an error message if needed
            return; // Stop the function if validation fails
        }

        try {
            const response = await sendEmail(formData.email, formData.subject, formData.message);
            console.log('Email sent successfully!', response);
        } catch (error: AxiosError | any) {
            console.error('There was an error sending the email!', error);
            // Handle error here, possibly updating state to show an error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <input type="text" name="name" placeholder="Navn" value={formData.name} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Telefon" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-row">
                <input type="text" name="subject" placeholder="Subjekt" value={formData.subject} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>
            <textarea name="message" placeholder="Din melding" value={formData.message} onChange={handleChange} required></textarea>
            <button type="submit">Send</button>
        </form>
    );
};

export default ContactForm;
