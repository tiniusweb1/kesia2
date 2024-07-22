import React from 'react'

import { ImageError as ImageErrorType } from '../../src/types' // Ensure correct import path

interface ImageErrorDisplayProps {
    error: ImageErrorType & { code?: string }
}

const ImageErrorDisplay: React.FC<ImageErrorDisplayProps> = ({ error }) => {
    return (
        <div role="alert" style={{ color: 'red' }}>
            <p>Error loading image: {error.message}</p>
            {error.code && <p>Error Code: {error.code}</p>}
        </div>
    )
}

export default ImageErrorDisplay
