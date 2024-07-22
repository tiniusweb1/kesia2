import React, { useState } from 'react'

import styles from './expand.module.scss'

const ExpandCollapse: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleExpandCollapse = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className={styles.container}>
            <div className={styles.textWrapper}>
                <h1 className={styles.omHeading}>Heading</h1>
                <div
                    className={`${styles.textContainer} ${
                        isExpanded ? styles.expanded : styles.collapsed
                    }`}
                >
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
                        Suspendisse vel risus ac ipsum faucibus hendrerit.
                    </p>
                </div>
            </div>
            <div className={styles.button} onClick={handleExpandCollapse}>
                {isExpanded ? '< se mindre' : '> se mer'}
            </div>
        </div>
    )
}

export default ExpandCollapse
