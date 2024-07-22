import React, { useState, useEffect, memo } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import useImageLoader from '../hooks/useImageLoader'
import useInterval from '../hooks/useInterval'
import styles from './carousel.module.scss'
import ImageErrorDisplay from './ImageErrorDisplay'

const AUTO_SCROLL_INTERVAL = 3000 // Define magic number as constant
const VIEW_ROOT_MARGIN = '50px' // Define rootMargin as constant for clarity

interface CarouselProps {
    criticalImages: string[]
}

interface ErrorDisplayProps {
    reloadImages: () => void
    errors: { status: 'rejected'; reason: Error }[]
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = memo(
    ({ reloadImages, errors }) => (
        <div role="alert">
            <p>Some images could not be loaded. Please try again later.</p>
            <button onClick={reloadImages}>Retry</button>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>
                        <ImageErrorDisplay error={error.reason} />
                    </li>
                ))}
            </ul>
        </div>
    )
)

ErrorDisplay.displayName = 'ErrorDisplay'

const Carousel: React.FC<CarouselProps> = ({ criticalImages }) => {
    const { images, loading, reloadImages } = useImageLoader(criticalImages)
    const [index, setIndex] = useState(0)
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: VIEW_ROOT_MARGIN,
    })

    const { start, stop } = useInterval(() => {
        setIndex((current) => (current + 1) % images.length)
    }, AUTO_SCROLL_INTERVAL)

    useEffect(() => {
        if (images.length > 0 && inView) start()
        else stop()
    }, [images.length, inView, start, stop])

    const errors = images.filter((image) => image.status === 'rejected') as {
        status: 'rejected'
        reason: Error
    }[]

    return (
        <div className={styles.container} ref={ref} aria-live="polite">
            {loading && <div>Loading...</div>}
            {errors.length > 0 && (
                <ErrorDisplay reloadImages={reloadImages} errors={errors} />
            )}
            <div className={styles.carouselTrack}>
                {images.length > 0 &&
                    images.map((image, idx) => (
                        <div
                            key={idx}
                            className={`${styles.carouselItem} ${index === idx ? styles.active : ''}`}
                        >
                            {image.status !== 'rejected' && (
                                <Image
                                    src={image.value}
                                    alt={`Carousel image ${idx + 1} of ${images.length}`}
                                    layout="fill"
                                    priority={idx < criticalImages.length}
                                />
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default memo(Carousel)
