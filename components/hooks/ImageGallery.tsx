import React, { useEffect, useRef, useState, Suspense } from 'react'

import useImageLoader from './useImageLoader'
import LazyImage from '../carousel/LazyImage'
import { ImageResult } from '../../src/types' // Correct import path

interface ImageGalleryProps {
    imageList: string[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageList }) => {
    const { images: imageStatuses } = useImageLoader(imageList) // Uses useImageLoader to get image statuses
    const [observed, setObserved] = useState<boolean[]>(
        new Array(imageList.length).fill(false)
    )
    const imageRefs = useRef<(HTMLImageElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = imageRefs.current.indexOf(
                            entry.target as HTMLImageElement
                        )
                        if (index !== -1) {
                            setObserved((prev) => {
                                const newObserved = [...prev]
                                newObserved[index] = true
                                return newObserved
                            })
                        }
                    }
                })
            },
            { rootMargin: '100px' }
        )

        const currentImages = imageRefs.current
        currentImages.forEach((img) => {
            if (img) observer.observe(img)
        })

        return () => {
            currentImages.forEach((img) => {
                if (img) observer.unobserve(img)
            })
        }
    }, [imageList.length])

    return (
        <div>
            {imageStatuses.map((result: ImageResult, index: number) => (
                <div
                    key={index}
                    style={{ position: 'relative', minHeight: '100px' }}
                >
                    <Suspense fallback={<div key={index}>Loading...</div>}>
                        {result.status === 'fulfilled' && observed[index] ? (
                            <LazyImage
                                key={index}
                                src={result.value || ''}
                                alt={`Image ${index}`}
                                placeholderSrc="path/to/placeholder.jpg"
                                sizes="(max-width: 600px) 480px, 800px"
                            />
                        ) : result.status === 'rejected' ? (
                            <p key={index}>
                                Error loading image: {result.reason?.message}
                            </p>
                        ) : (
                            <p key={index}>Loading...</p>
                        )}
                    </Suspense>
                </div>
            ))}
        </div>
    )
}

export default ImageGallery
