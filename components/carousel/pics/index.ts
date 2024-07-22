// components/carousel/pics/index.ts
import { ImageResult, ImageError } from '../../../src/types'

/**
 * Retrieves a list of image filenames.
 * Uses a default list if no list is provided.
 * @param imageList - An optional array of image filenames.
 * @returns A promise that resolves to an array of image filenames.
 */
export const getImages = (
    imageList: string[] = [
        '/images/img1.png',
        '/images/img2.png',
        '/images/img3.png',
        '/images/img4.png',
    ]
): Promise<string[]> => Promise.resolve(imageList)

/**
 * Resolves an image path and returns its URL.
 * @param image - The filename of the image.
 * @returns A promise that resolves to an ImageResult.
 */
export const importImage = async (image: string): Promise<ImageResult> => {
    try {
        // Directly use the image path as it's served statically from public folder
        const imageUrl = image

        if (typeof imageUrl !== 'string') {
            console.error(
                `Unexpected value type for ${image}: ${typeof imageUrl}`
            )
            throw new Error('Unexpected value type')
        }

        return { status: 'fulfilled', value: imageUrl }
    } catch (error) {
        console.error(`Failed to import ${image}`, error)
        return { status: 'rejected', reason: error as ImageError }
    }
}

/**
 * Returns a list of placeholder images.
 * @returns An array of ImageResult representing placeholder images.
 */
export const getPlaceholderImages = (): ImageResult[] => {
    return [
        { status: 'fulfilled', value: '/images/placeholder1.webp' },
        { status: 'fulfilled', value: '/images/placeholder2.webp' },
        { status: 'fulfilled', value: '/images/placeholder3.webp' },
        { status: 'fulfilled', value: '/images/placeholder4.webp' },
    ]
}
