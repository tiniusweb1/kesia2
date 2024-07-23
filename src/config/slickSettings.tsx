// src/config/slickSettings.ts
import React from 'react'

import { NextArrow, PrevArrow } from '../../components/slideshow/CustomArrows'

const getSlickSettings = (isMobile: boolean) => {
    return {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: isMobile ? <NextArrow /> : undefined,
        prevArrow: isMobile ? <PrevArrow /> : undefined,
    }
}

export default getSlickSettings
