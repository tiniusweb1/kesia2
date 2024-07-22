import React, { useState } from 'react'

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [message, setMessage] = useState<string | null>(null) // State for success/error messages

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault() // Prevent default form submission behavior

        try {
            const response = await fetch('/api/emailservice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                const data = await response.json()
                console.log('Submission successful', data)
                setMessage('Email sent successfully!') // Set success message

                // Clear the message after 4 seconds
                setTimeout(() => {
                    setMessage(null)
                }, 4000)
            } else {
                console.error('Submission failed', response)
                setMessage('Failed to send email. Please try again later.') // Set error message

                // Clear the message after 4 seconds
                setTimeout(() => {
                    setMessage(null)
                }, 4000)
            }
        } catch (error) {
            console.error('Submission error', error)
            setMessage('An error occurred. Please try again later.') // Set error message

            // Clear the message after 4 seconds
            setTimeout(() => {
                setMessage(null)
            }, 4000)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                />

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>

                <button type="submit">Send Email</button>
            </form>
            {message && <p>{message}</p>} {/* Display success/error message */}
        </div>
    )
}

export default ContactForm
