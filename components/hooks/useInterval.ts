// useInterval.ts
import { useEffect, useRef, useCallback } from 'react'

const useInterval = (callback: () => void, delay: number) => {
    const savedCallback = useRef<() => void>()
    const intervalId = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    const start = useCallback(() => {
        if (intervalId.current !== null) clearInterval(intervalId.current)
        intervalId.current = setInterval(() => {
            if (savedCallback.current) savedCallback.current()
        }, delay)
    }, [delay])

    const stop = useCallback(() => {
        if (intervalId.current !== null) clearInterval(intervalId.current)
        intervalId.current = null
    }, [])

    useEffect(() => {
        if (delay !== null) {
            start()
            return stop
        }
    }, [delay, start, stop])

    return { start, stop }
}

export default useInterval
