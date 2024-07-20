import React from 'react'
import ContactForm from '../components/ContactForm'
import Slideshow from '../components/carousel/carousel' // Step 1: Import Slideshow

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to Next.js!</h1>
            <ContactForm />
            <Slideshow />
        </div>
    )
}

export default HomePage
