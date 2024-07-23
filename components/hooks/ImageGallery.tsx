// components/ImageGallery.tsx
import React, { useState, Suspense } from 'react'
import Image from 'next/image'

import useImageLoader from '../hooks/useImageLoader'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import { ImageResult } from '../../src/types'

interface ImageGalleryProps {
    imageList: string[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageList }) => {
    const { images, loading } = useImageLoader(imageList)
    const [observed, setObserved] = useState<boolean[]>(
        new Array(imageList.length).fill(false)
    )

    useIntersectionObserver({
        targetIds: images.map((_, index) => `image-${index}`),
        onIntersect: (id, isIntersecting) => {
            if (isIntersecting) {
                const index = parseInt(id.split('-')[1], 10)
                setObserved((prev) => {
                    const newObserved = [...prev]
                    newObserved[index] = true
                    return newObserved
                })
            }
        },
        rootMargin: '100px',
    })

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                images.map((result: ImageResult, index: number) => (
                    <div
                        key={
                            result.status === 'fulfilled' &&
                            typeof result.value === 'object'
                                ? result.value.id
                                : `error-${index}`
                        }
                        id={`image-${index}`}
                        style={{ position: 'relative', minHeight: '100px' }}
                    >
                        <Suspense fallback={<div>Loading...</div>}>
                            {result.status === 'fulfilled' &&
                            typeof result.value === 'object' &&
                            observed[index] ? (
                                <Image
                                    src={result.value.url}
                                    alt={`Image ${index}`}
                                    fill // Updated from layout="responsive"
                                    style={{ objectFit: 'cover' }} // Updated from objectFit="cover"
                                    priority // Add priority for critical images
                                />
                            ) : result.status === 'rejected' ? (
                                <p>Error loading image: {result.reason.message}</p>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </Suspense>
                    </div>
                ))
            )}
        </div>
    )
}

export default ImageGallery


