import React from 'react'
import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'
import Carousel from '../../../components/carousel/Carousel'
import { Image } from '../../../src/types'

// Mock useImageLoader hook
jest.mock('../../../components/hooks/useImageLoader', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        images: [
            { status: 'fulfilled', value: { url: 'image1.jpg', id: '1' } },
            { status: 'fulfilled', value: { url: 'image2.jpg', id: '2' } },
        ],
        loading: false,
        reloadImages: jest.fn(),
    })),
}))

const criticalImages: Image[] = [
    { url: 'image1.jpg', id: '1' },
    { url: 'image2.jpg', id: '2' },
]

describe('Carousel component', () => {
    it('renders loading state initially', () => {
        jest.mock('../../../components/hooks/useImageLoader', () => ({
            __esModule: true,
            default: jest.fn(() => ({
                images: [],
                loading: true,
                reloadImages: jest.fn(),
            })),
        }))

        render(<Carousel criticalImages={criticalImages} />)
        expect(screen.getByRole('status')).toHaveTextContent('Loading...')
    })

    it('renders images correctly', () => {
        render(<Carousel criticalImages={criticalImages} />)

        const images = screen.getAllByRole('img')
        expect(images.length).toBe(2)
        expect(images[0]).toHaveAttribute('src', 'image1.jpg')
    })

    it('handles errors and displays error messages', () => {
        jest.mock('../../../components/hooks/useImageLoader', () => ({
            __esModule: true,
            default: jest.fn(() => ({
                images: [
                    {
                        status: 'rejected',
                        reason: { message: 'Failed to load' },
                    },
                ],
                loading: false,
                reloadImages: jest.fn(),
            })),
        }))

        render(<Carousel criticalImages={criticalImages} />)
        expect(screen.getByRole('alert')).toHaveTextContent(
            'Failed to load image.'
        )
    })
})
