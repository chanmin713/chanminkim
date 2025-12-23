import { useState, useEffect } from 'react'

const BREAKPOINTS = {
  mobile: 480,
  tablet: 640,
  desktop: 768,
} as const

const SCALE_VALUES = {
  mobile: 2.2,
  tablet: 2.6,
  desktop: 3.0,
  large: 3.6,
} as const

/**
 * 화면 크기에 따라 Prism 배경의 scale 값을 반환하는 훅
 * @returns 현재 화면 크기에 맞는 scale 값
 */
export function usePrismScale() {
  const [scale, setScale] = useState(SCALE_VALUES.large)

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth
      
      if (width <= BREAKPOINTS.mobile) {
        setScale(SCALE_VALUES.mobile)
      } else if (width <= BREAKPOINTS.tablet) {
        setScale(SCALE_VALUES.tablet)
      } else if (width <= BREAKPOINTS.desktop) {
        setScale(SCALE_VALUES.desktop)
      } else {
        setScale(SCALE_VALUES.large)
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)

    return () => {
      window.removeEventListener('resize', updateScale)
    }
  }, [])

  return scale
}

