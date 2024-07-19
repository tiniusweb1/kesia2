import React, { useState } from 'react'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const handleChange = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
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
                // Handle success (e.g., showing a success message)
            } else {
                console.error('Submission failed', response)
                // Handle error (e.g., showing an error message)
            }
        } catch (error) {
            console.error('Submission error', error)
            // Handle error (e.g., showing an error message)
        }
    }

    return (
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
    )
}

export default ContactForm
