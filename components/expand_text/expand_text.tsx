import React, { useEffect } from 'react'

import styles from './expand.module.scss'
import { initExpandCollapse } from './ExpandCollapse'

const ExpandCollapse: React.FC = () => {
    useEffect(() => {
        initExpandCollapse()
    }, [])

    return (
        <div>
            <div className={styles.textWrapper}>
                <h1 className={styles.omHeading}>Heading</h1>
                <div className={styles.textContainer}>
                    <p className={styles.paragraph2}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vel risus ac ipsum faucibus hendrerit.
                    </p>
                </div>
            </div>
            <div className={styles.button}>&gt; se mer</div>
        </div>
    )
}

export default ExpandCollapse
