import { useEffect } from 'react'

interface IntersectionObserverProps {
    targetIds: string[]
    onIntersect: (_id: string, _isIntersecting: boolean) => void
    rootMargin?: string
}

const useIntersectionObserver = ({
    targetIds,
    onIntersect,
    rootMargin = '0px',
}: IntersectionObserverProps) => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    onIntersect(entry.target.id, entry.isIntersecting)
                })
            },
            { rootMargin }
        )

        const elements = targetIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null)

        elements.forEach((element) => observer.observe(element))

        return () => {
            elements.forEach((element) => observer.unobserve(element))
        }
    }, [targetIds, onIntersect, rootMargin])
}

export default useIntersectionObserver
