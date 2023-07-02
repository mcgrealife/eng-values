import { useEffect, useRef, useState } from 'react'

export const useIntersectionObserver = (
  options?: IntersectionObserverInit & { once?: boolean; callback?: () => void }
) => {
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting ? setInView(true) : setInView(false)
        options?.callback && options.callback()
        // if 'once' disconnect the observer early, before cleanup
        if (options?.once && entry.isIntersecting && observerRef.current) {
          observerRef.current.disconnect()
        }
      })
    }, options)

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [options])

  const observeEl = (el: HTMLElement | null): void => {
    if (observerRef.current && el) {
      observerRef.current.observe(el)
    }
  }

  return { inView, observeEl }
}
