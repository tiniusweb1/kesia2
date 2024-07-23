// hooks/useImageLoader.ts
import { useState, useEffect } from 'react'

import { ImageResult } from '../../src/types'

const useImageLoader = (urls: string[]) => {
    const [images, setImages] = useState<ImageResult[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadImage = async (url: string): Promise<ImageResult> => {
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const blob = await response.blob()
                const imageUrl = URL.createObjectURL(blob)
                return {
                    status: 'fulfilled',
                    value: { url: imageUrl, id: url },
                }
            } catch (error) {
                return {
                    status: 'rejected',
                    reason: {
                        message: (error as Error).message,
                        name: 'ImageError',
                    },
                }
            }
        }

        const loadImages = async () => {
            const results = await Promise.all(urls.map(loadImage))
            setImages(results)
            setLoading(false)
        }

        loadImages()
    }, [urls])

    return { images, loading, reloadImages: () => setLoading(true) }
}

export default useImageLoader
