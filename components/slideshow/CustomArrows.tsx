// components/slideshow/CustomArrows.tsx
import React from 'react'

import styles from './Slideshow.module.scss'

interface ArrowProps {
    className?: string
    style?: React.CSSProperties
    onClick?: () => void
}

export const NextArrow: React.FC<ArrowProps> = ({
    className,
    style,
    onClick,
}) => (
    <button
        className={`${className} ${styles.arrow} ${styles.arrowRight}`}
        style={{ ...style }}
        onClick={onClick}
        aria-label="Next slide"
    >
        {'>'}
    </button>
)

export const PrevArrow: React.FC<ArrowProps> = ({
    className,
    style,
    onClick,
}) => (
    <button
        className={`${className} ${styles.arrow} ${styles.arrowLeft}`}
        style={{ ...style }}
        onClick={onClick}
        aria-label="Previous slide"
    >
        {'<'}
    </button>
)
