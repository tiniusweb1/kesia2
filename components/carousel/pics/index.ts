export type ImageResult =
    | { status: 'fulfilled'; value: string }
    | { status: 'rejected'; reason: Error }

// Exporting a function that returns a Promise resolving to an array of strings
export const getImages = (imageList?: string[]): Promise<string[]> => {
    // Allow passing a custom image list, defaulting to a hardcoded list
    const images = imageList || ['img1.png', 'img2.png', 'img3.png', 'img4.png']
    return Promise.resolve(images)
}

const importImage = async (image: string): Promise<ImageResult> => {
    try {
        const importedModule = await import(`./${image}`)
        return { status: 'fulfilled', value: importedModule.default }
    } catch (error) {
        console.error(`Failed to import ${image}`, error)
        return { status: 'rejected', reason: error as Error }
    }
}

const importedImages = getImages().then((images) =>
    Promise.allSettled(images.map((image) => importImage(image)))
)

export default importedImages
