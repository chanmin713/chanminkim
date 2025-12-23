'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

export default function HeaderWrapper() {
  // 768px 이상이면 데스크톱, 미만이면 모바일
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return isDesktop ? <DesktopHeader /> : <MobileHeader />
}

