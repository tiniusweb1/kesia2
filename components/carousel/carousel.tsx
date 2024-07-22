import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import useImageLoader from '../hooks/useImageLoader'
import useInterval from '../hooks/useInterval'
import styles from './carousel.module.scss'
import { ImageError } from '../../src/types'
import ImageErrorDisplay from './ImageErrorDisplay' // Correct import path

interface CarouselProps {
    criticalImages: string[]
}

const Carousel: React.FC<CarouselProps> = ({ criticalImages }) => {
    const { images, loading, reloadImages } = useImageLoader(criticalImages)
    const [index, setIndex] = useState(0)
    const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '50px' })

    const { start, stop } = useInterval(() => {
        setIndex((current) => (current + 1) % images.length)
    }, 3000)

    useEffect(() => {
        if (images.length > 0 && inView) start()
        else stop()
    }, [images.length, inView, start, stop])

    const handleImageLoad = useCallback(() => {}, [])

    return (
        <div className={styles.container} ref={ref} aria-live="polite">
            {loading && <div>Loading...</div>}
            {images.some((image) => image.status === 'rejected') && (
                <div role="alert">
                    <p>
                        Some images could not be loaded. Please try again later.
                    </p>
                    <button onClick={reloadImages}>Retry</button>
                    <ul>
                        {images
                            .filter(
                                (
                                    image
                                ): image is {
                                    status: 'rejected'
                                    reason: ImageError
                                } => image.status === 'rejected'
                            )
                            .map((error, idx) => (
                                <li key={idx}>
                                    <ImageErrorDisplay error={error.reason} />
                                </li>
                            ))}
                    </ul>
                </div>
            )}
            {images.length > 0 && images[index].status === 'fulfilled' && (
                <Image
                    src={images[index].value || ''}
                    alt={`Carousel image ${index + 1} of ${images.length}`}
                    layout="fill"
                    onLoad={handleImageLoad}
                    priority={index < criticalImages.length}
                />
            )}
        </div>
    )
}

export default React.memo(Carousel)
