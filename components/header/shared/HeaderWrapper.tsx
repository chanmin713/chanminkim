'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import DesktopHeader from '../desktop/DesktopHeader'
import MobileHeader from '../mobile/MobileHeader'

export default function HeaderWrapper() {
  // 768px 이상이면 데스크톱, 미만이면 모바일
  const isDesktop = useMediaQuery('(min-width: 768px)')

  // 초기 렌더링 시 깜빡임 방지: null일 때는 아무것도 렌더링하지 않음
  if (isDesktop === null) {
    return null
  }

  return isDesktop ? <DesktopHeader /> : <MobileHeader />
}

