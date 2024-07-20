const images = ['img1.png', 'img2.png', 'img3.png', 'img4.png']

const importedImages = images.map((image) => import(`./${image}`))

export default importedImages
