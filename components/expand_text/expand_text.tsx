import React, { useEffect, useRef, useState } from 'react'
import styles from './expand.module.scss'

const ExpandCollapse: React.FC = () => {
    const textContainerRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const textContainer = textContainerRef.current
        const button = buttonRef.current

        if (textContainer && button) {
            const initialHeight = '100px'
            const expandedHeight = `${textContainer.scrollHeight}px`

            textContainer.style.height = initialHeight

            button.addEventListener('click', () => {
                if (textContainer.style.height === initialHeight) {
                    textContainer.style.height = expandedHeight
                    button.innerHTML = '&gt; se mindre'
                } else {
                    textContainer.style.height = initialHeight
                    button.innerHTML = '&gt; se mer'
                }
                setIsExpanded(!isExpanded) // Toggle state
            })
        }
    }, [isExpanded])

    return (
        <div className={styles.container}>
            <div className={styles.textWrapper}>
                <h1 className={styles.omHeading}>Heading</h1>
                <div ref={textContainerRef} className={styles.textContainer}>
                    <p className={styles.paragraph2}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit.
                    </p>
                </div>
            </div>
            <div ref={buttonRef} className={styles.button}>
                &gt; se mer
            </div>
        </div>
    )
}

export default ExpandCollapse
