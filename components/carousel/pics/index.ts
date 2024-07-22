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
 * Dynamically imports an image and returns its URL.
 * Validates that the imported module's structure is as expected.
 * @param image - The filename of the image to import.
 * @returns A promise that resolves to an ImageResult.
 */
export const importImage = async (image: string): Promise<ImageResult> => {
    try {
        const importedModule = await import(`../../../public${image}`)
        const imageUrl = importedModule.src || importedModule.default

        // Ensure the imported value is a string
        if (typeof imageUrl !== 'string') {
            console.error(
                `Unexpected value type for ${image}: ${typeof imageUrl}`
            )
            throw new Error('Unexpected value type')
        }

        // Additional check to ensure it's a valid URL
        if (!isValidUrl(imageUrl)) {
            console.error(`Invalid URL for ${image}: ${imageUrl}`)
            throw new Error('Invalid URL format')
        }

        return { status: 'fulfilled', value: imageUrl }
    } catch (error) {
        console.error(`Failed to import ${image}`, error)
        return { status: 'rejected', reason: error as ImageError }
    }
}

/**
 * Validates if the given string is a valid URL.
 * @param url - The string to validate.
 * @returns True if the string is a valid URL, otherwise false.
 */
const isValidUrl = (url: string): boolean => {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}
