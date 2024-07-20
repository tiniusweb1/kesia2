import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import styles from './carousel.module.scss'
import importedImages from './pics/index'

const Carousel = () => {
    const [index, setIndex] = useState(0)
    const images = importedImages

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((current) => (current + 1) % images.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [images.length])

    const containerCls = cn(styles.container)
    const imageCls = cn(styles.image)

    return renderCarouselImage()

    function renderCarouselImage() {
        return (
            <div className={containerCls}>
                <Image
                    src={images[index].src}
                    alt="Image"
                    className={imageCls}
                    layout="fill"
                />
            </div>
        )
    }
}

export default Carousel
