import React from 'react'
require('dotenv').config();
import ContactForm from '../components/Contactform';

const HomePage: React.FC = () => {
    // Example of using format inside a useEffect or another function if needed
    // React.useEffect(() => {
    //     const options = {}; // Define your options here
    //     const formatted = format(options);
    //     console.log(formatted);
    // }, []);

    return (
        <div>
            <h1>Welcome to My Website!</h1>
            <p>This is the home page.</p>
            <ContactForm />
        </div>
    )
}

export default HomePage
