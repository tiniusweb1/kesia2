export const initExpandCollapse = (classNames: { textContainer: string, button: string }) => {
    if (typeof document !== 'undefined') {
        const wrappers = document.querySelectorAll(`.${classNames.textContainer}`) as NodeListOf<HTMLElement>;
        const buttons = document.querySelectorAll(`.${classNames.button}`) as NodeListOf<HTMLElement>;
        const initialHeight = '100px'; // Set this to your initial height

        wrappers.forEach((wrapper, index) => {
            const button = buttons[index];
            if (wrapper) {
                const expandedHeight = wrapper.scrollHeight + 'px'; // Automatically calculates full height

                // Set initial height
                wrapper.style.height = initialHeight;

                if (button) {
                    button.addEventListener('click', () => {
                        const isExpanded = wrapper.style.height !== initialHeight;
                        wrapper.style.height = isExpanded ? initialHeight : expandedHeight;
                        button.innerHTML = isExpanded ? '&gt; se mer' : '&gt; se mindre'; // Toggle button text
                    });
                }
            }
        });
    }
};
