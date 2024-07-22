import { useState, useEffect, useCallback, useRef } from 'react'

import { getImages, importImage } from '../../components/carousel/pics'
import { ImageResult, ImageError, ErrorReason } from '../../src/types'

const useImageLoader = (criticalImages: string[]) => {
    const [state, setState] = useState<{
        images: ImageResult[]
        loading: boolean
    }>({
        images: [],
        loading: true,
    })

    const retryCount = useRef(0)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const loadImages = useCallback(async () => {
        if (retryCount.current >= 5) {
            setState((prevState) => ({
                ...prevState,
                images: [
                    ...prevState.images,
                    {
                        status: 'rejected',
                        reason: {
                            name: 'ImageLoadingError',
                            message:
                                'Failed to load images after multiple attempts.',
                        } as ImageError,
                    },
                ],
                loading: false,
            }))
            return
        }

        try {
            const imageFilenames = await getImages(criticalImages)
            const results = await Promise.allSettled(
                imageFilenames.map(importImage)
            )

            const imageResults: ImageResult[] = results.map((result) => {
                if (result.status === 'fulfilled') {
                    if (typeof result.value === 'string') {
                        return {
                            status: 'fulfilled',
                            value: result.value,
                        }
                    } else {
                        return {
                            status: 'rejected',
                            reason: {
                                name: 'UnexpectedValueTypeError',
                                message: 'Unexpected value type',
                                code: 'UNEXPECTED_TYPE',
                            } as ImageError,
                        }
                    }
                } else {
                    const reason = result.reason as Error & Partial<ErrorReason>
                    return {
                        status: 'rejected',
                        reason: {
                            name: reason.name || 'ImageLoadingError',
                            message: reason.message,
                            code: reason.code || 'UNKNOWN_ERROR',
                        } as ImageError,
                    }
                }
            })

            setState({
                images: imageResults,
                loading: false,
            })
        } catch (error) {
            console.error('Error loading images:', error)
            retryCount.current += 1
            const delay = 1000 * 2 ** retryCount.current
            timeoutRef.current = setTimeout(loadImages, delay)
        }
    }, [criticalImages])

    useEffect(() => {
        loadImages()

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [loadImages])

    const reloadImages = useCallback(() => {
        retryCount.current = 0
        setState({ images: [], loading: true })
        loadImages()
    }, [loadImages])

    return { ...state, reloadImages }
}

export default useImageLoader
