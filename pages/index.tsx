import React from 'react'
// Import the format function from the utils file

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
        </div>
    )
}

export default HomePage
