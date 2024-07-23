// components/carousel/Carousel.tsx
import React, { useState, useEffect, memo } from 'react'
import Slider from 'react-slick'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

import useViewport from '../hooks/useViewport'
import useImageLoader from '../hooks/useImageLoader'
import useInterval from '../hooks/useInterval'
import styles from './carousel.module.scss'
import { Image as ImageType } from '../../src/types'
import getSlickSettings from '../../src/config/slickSettings'

const AUTO_SCROLL_INTERVAL = 3000
const VIEW_ROOT_MARGIN = '50px'

interface CarouselProps {
    criticalImages: ImageType[]
    images: ImageType[]
}

interface ErrorDisplayProps {
    reloadImages: () => void
    errors: { status: 'rejected'; reason: { message: string } }[]
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
    reloadImages,
    errors,
}) => (
    <div role="alert">
        <p>Some images could not be loaded. Please try again later.</p>
        <button onClick={reloadImages}>Retry</button>
        <ul>
            {errors.map((error, idx) => (
                <li key={idx}>{error.reason.message}</li>
            ))}
        </ul>
    </div>
)

const Carousel: React.FC<CarouselProps> = ({ criticalImages, images }) => {
    const { images: loadedImages, loading, reloadImages } = useImageLoader(
        criticalImages.map((image) => image.url)
    )
    const [index, setIndex] = useState(0)
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: VIEW_ROOT_MARGIN,
    })

    const { isMobile } = useViewport()

    const settings = getSlickSettings(isMobile)

    const { start, stop } = useInterval(() => {
        setIndex((current) => (current + 1) % loadedImages.length)
    }, AUTO_SCROLL_INTERVAL)

    useEffect(() => {
        if (loadedImages.length > 0 && inView) start()
        else stop()
    }, [loadedImages.length, inView, start, stop])

    const errors = loadedImages.filter((image) => image.status === 'rejected') as {
        status: 'rejected'
        reason: { message: string }
    }[]

    const isImageObject = (
        value: string | { url: string; id: string }
    ): value is { url: string; id: string } => {
        return (
            typeof value === 'object' &&
            value !== null &&
            'url' in value &&
            'id' in value
        )
    }

    return (
        <div className={styles.container} ref={ref} aria-live="polite">
            {loading && <div>Loading...</div>}
            {errors.length > 0 && (
                <ErrorDisplay reloadImages={reloadImages} errors={errors} />
            )}
            <Slider {...settings} className={styles.carouselTrack}>
                {loadedImages.length > 0 &&
                    loadedImages.map((image, idx) => (
                        <div
                            key={
                                image.status === 'fulfilled' &&
                                isImageObject(image.value)
                                    ? image.value.id
                                    : `error-${idx}`
                            }
                            className={`${styles.carouselItem} ${
                                index === idx ? styles.active : ''
                            }`}
                            style={{ position: 'relative', height: '300px' }}
                        >
                            {image.status !== 'rejected' &&
                                isImageObject(image.value) && (
                                    <Image
                                        src={image.value.url}
                                        alt={`Carousel image ${
                                            idx + 1
                                        } of ${loadedImages.length}`}
                                        fill // Updated from layout="responsive"
                                        style={{ objectFit: 'cover' }} // Updated from objectFit="cover"
                                        priority={criticalImages.some(
                                            img => img.url === (isImageObject(image.value) && image.value.url)
                                        )}
                                    />
                                )}
                        </div>
                    ))}
            </Slider>
        </div>
    )
}

export default memo(Carousel)
