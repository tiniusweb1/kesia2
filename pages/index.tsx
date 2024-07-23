// pages/index.tsx
import React, { useState, useEffect } from 'react'

import ResponsiveGallery from '../components/ResponsiveGallery'
import ContactForm from '../components/ContactForm'
import ExpandCollapse from '../components/expand_text/expand_text'
import { Image } from '../src/types'

const HomePage: React.FC = () => {
    const [images, setImages] = useState<Image[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imageUrls = [
                    '/images/img1.png',
                    '/images/img2.png',
                    '/images/img3.png',
                    '/images/img4.png',
                ]
                const serverImages: Image[] = imageUrls.map((url, idx) => ({
                    url,
                    id: String(idx),
                }))
                setImages(serverImages)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching images:', error)
                setLoading(false)
            }
        }
        fetchImages()
    }, [])

    return (
        <div>
            <h1>Welcome to Next.js!</h1>
            <ContactForm />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ResponsiveGallery
                    images={images}
                    criticalImages={images.slice(0, 2)}
                />
            )}
            <ExpandCollapse />
        </div>
    )
}

export default HomePage
