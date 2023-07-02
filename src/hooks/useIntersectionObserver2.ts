import { useEffect, useRef, useState } from 'react'

// This hook is more complex, but does not require callers to observeElement() inside a useEffect()
export const useIntersectionObserver2 = ({
  ref,
  onIntersect,
  options,
}: {
  ref: React.RefObject<HTMLElement>
  onIntersect?: (inView: boolean) => void
  options?: IntersectionObserverInit & {
    once?: boolean
    onIntersect?: (inView: boolean) => void
  }
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [inView, setInView] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true)
          onIntersect && onIntersect(true)
        } else {
          setInView(false)
          onIntersect && onIntersect(false)
        }
      })
    })

    observerRef.current = observer

    return () => {
      observer.disconnect()
      observerRef.current = null
    }
  }, [])

  useEffect(() => {
    const target = ref.current
    if (observerRef.current && target) {
      observerRef.current.observe(target)
    }

    return () => {
      if (observerRef.current && target) {
        observerRef.current.unobserve(target)
      }
    }
  }, [ref])

  return inView
}
