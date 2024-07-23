// components/carousel/ImageErrorDisplay.tsx
import React from 'react'

interface ImageErrorDisplayProps {
    error: {
        message: string
        code?: string
        name?: string
    }
}

const ImageErrorDisplay: React.FC<ImageErrorDisplayProps> = ({ error }) => {
    return (
        <div>
            <p>Error: {error.message}</p>
            {error.code && <p>Code: {error.code}</p>}
        </div>
    )
}

export default ImageErrorDisplay
