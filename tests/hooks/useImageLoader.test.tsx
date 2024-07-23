import { renderHook } from '@testing-library/react-hooks'

import useImageLoader from '../../components/hooks/useImageLoader'

describe('useImageLoader hook', () => {
    it('loads images correctly', async () => {
        const urls = ['image1.jpg', 'image2.jpg']

        const { result, waitForNextUpdate } = renderHook(() =>
            useImageLoader(urls)
        )

        expect(result.current.loading).toBe(true)

        await waitForNextUpdate()

        expect(result.current.loading).toBe(false)
        expect(result.current.images.length).toBe(2)
        expect(result.current.images[0].status).toBe('fulfilled')
    })

    it('handles image loading errors', async () => {
        const urls = ['invalid.jpg']

        const { result, waitForNextUpdate } = renderHook(() =>
            useImageLoader(urls)
        )

        await waitForNextUpdate()

        expect(result.current.loading).toBe(false)
        expect(result.current.images[0].status).toBe('rejected')
    })
})
