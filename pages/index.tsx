import React from 'react'

import ContactForm from '../components/ContactForm'
import Carousel from '../components/carousel/carousel' // Correct import for Carousel
import ExpandCollapse from '../components/expand_text/expand_text' // Correct import for ExpandCollapse

const HomePage: React.FC = () => {
    const criticalImages = [
        '/images/img1.png',
        '/images/img2.png',
        '/images/img3.png',
    ] // Updated paths

    return (
        <div>
            <h1>Welcome to Next.js!</h1>
            <ContactForm />
            <Carousel criticalImages={criticalImages} />{' '}
            {/* Pass the criticalImages prop */}
            <ExpandCollapse />
        </div>
    )
}

export default HomePage
