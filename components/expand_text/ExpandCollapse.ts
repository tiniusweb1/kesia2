// expandCollapse.ts
export const initExpandCollapse = () => {
    document.addEventListener('DOMContentLoaded', function () {
        const wrapper = document.querySelector('.textContainer') as HTMLElement
        const button = document.querySelector('.button') as HTMLElement
        const initialHeight = '100px' // Set this to your initial height
        const expandedHeight = wrapper.scrollHeight + 'px' // Automatically calculates full height

        // Set initial height
        wrapper.style.height = initialHeight

        button.addEventListener('click', function () {
            if (wrapper.style.height === initialHeight) {
                wrapper.style.height = expandedHeight
                button.innerHTML = '> se mindre' // Change button text to "see less"
            } else {
                wrapper.style.height = initialHeight
                button.innerHTML = '> se mer' // Change button text back to "see more"
            }
        })
    })
}
