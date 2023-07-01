// used to lazy import mapbox bundle, until user scrolls into view

import { useEffect, useRef, useState } from 'react'

export const useIntersectionObserver = () => {
  const [inView, setInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.5, // percentage of the element visible
    }

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        setInView(entry.isIntersecting)
        if (!hasBeenInView && entry.isIntersecting) {
          setHasBeenInView(true)
        }
      })
    }

    observerRef.current = new IntersectionObserver(
      handleIntersection,
      observerOptions
    )

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [hasBeenInView])

  const observeEl = (el: HTMLElement | null): void => {
    if (observerRef.current && el) {
      observerRef.current.observe(el)
    }
  }

  return { inView, hasBeenInView, observeEl }
}
