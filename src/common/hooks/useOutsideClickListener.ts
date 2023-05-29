import { useEffect, useRef, useState } from 'react'

/**
 * I took it here
 * https://www.youtube.com/watch?v=_uXqLmlHxpo&ab_channel=REDGroup
 */
export default function useOutsideClickListener(initialIsVisible: boolean) {
  const [isShow, setIsShow] = useState(initialIsVisible)
  const ref = useRef<HTMLAnchorElement | null>(null)

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return { ref, isShow, setIsShow }
}
