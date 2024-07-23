// components/carousel/LazyImage.tsx
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface LazyImageProps {
    src: string
    alt: string
    placeholderSrc?: string
    sizes?: string
    layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive'
    priority?: boolean
    objectFit?: 'cover' | 'contain' | 'none' | 'scale-down'
}

const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    placeholderSrc = '',
    sizes = '(max-width: 600px) 480px, 800px',
    layout = 'responsive',
    priority = false,
    objectFit = 'cover',
}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const imgElement = imgRef.current
        const handleLoad = () => setIsLoaded(true)
        const handleError = () => setHasError(true)

        if (imgElement) {
            imgElement.addEventListener('load', handleLoad)
            imgElement.addEventListener('error', handleError)

            if (imgElement.complete) {
                setIsLoaded(true)
            }
        }

        return () => {
            if (imgElement) {
                imgElement.removeEventListener('load', handleLoad)
                imgElement.removeEventListener('error', handleError)
            }
        }
    }, [src])

    return (
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
            {!isLoaded && !hasError && (
                <div
                    role="status"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(240, 240, 240, 0.8)',
                    }}
                >
                    Loading...
                </div>
            )}
            {hasError ? (
                <div
                    role="alert"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(240, 240, 240, 0.8)',
                        color: 'red',
                    }}
                >
                    Failed to load image.
                </div>
            ) : (
                <Image
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    placeholder="blur"
                    blurDataURL={placeholderSrc}
                    layout={layout}
                    priority={priority}
                    objectFit={objectFit}
                    sizes={sizes}
                    onLoadingComplete={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                />
            )}
        </div>
    )
}

export default React.memo(LazyImage)
