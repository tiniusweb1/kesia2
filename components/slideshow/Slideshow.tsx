// components/slideshow/Slideshow.tsx
import React from 'react'
import Image from 'next/image'
import { Image as ImageType } from '../../src/types'
import styles from './Slideshow.module.scss'

interface SlideshowProps {
  images: ImageType[]
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  return (
    <div className={styles.slideshow}>
      {images.map((image) => (
        <div key={image.id} className={styles.imageContainer}>
          <Image
            src={image.url}
            alt={`Image ${image.id}`}
            fill // Updated from layout="responsive"
            style={{ objectFit: 'cover' }} // Updated from objectFit="cover"
            priority // Add priority for critical images
          />
        </div>
      ))}
    </div>
  )
}

export default Slideshow
