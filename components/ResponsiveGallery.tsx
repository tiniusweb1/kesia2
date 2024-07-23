// components/ResponsiveGallery.tsx
import React from 'react'

import useViewport from './hooks/useViewport'
import Slideshow from './slideshow/Slideshow'
import Carousel from './carousel/Carousel'
import { Image } from '../src/types'

interface ResponsiveGalleryProps {
    images: Image[]
    criticalImages: Image[]
}

const ResponsiveGallery: React.FC<ResponsiveGalleryProps> = ({
    images,
    criticalImages,
}) => {
    const { width } = useViewport()

    if (images.length === 0) {
        return <p>Loading...</p>
    }

    return width <= 1024 ? (
        <Slideshow images={images} />
    ) : (
        <Carousel criticalImages={criticalImages} images={images} />
    )
}

export default ResponsiveGallery
