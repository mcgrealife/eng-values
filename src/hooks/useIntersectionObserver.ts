import { useEffect, useRef, useState } from 'react'

// simpler hook, but requires observeElement() inside useEffect() in the calling component // useIntersectionObserver2.ts trades complexity in the hook for simpler call signature
// this hook also offers the 'once' prop, so keep for now
export const useIntersectionObserver = (
  options?: IntersectionObserverInit & {
    once?: boolean
    onIntersect?: (inView: boolean) => void
  }
) => {
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting ? setInView(true) : setInView(false)
        options?.onIntersect && options.onIntersect(entry.isIntersecting)
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
