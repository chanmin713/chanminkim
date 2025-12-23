/**
 * 네비게이션 링크 설정
 * 이 파일에서 모든 네비게이션 링크를 쉽게 수정할 수 있습니다.
 */

export interface NavLink {
  label: string
  href: string
  openInNewTab?: boolean // 새 탭에서 열지 여부
}

export const navigationLinks: NavLink[] = [
  {
    label: 'About',
    href: '/about',
    openInNewTab: false,
  },
  {
    label: 'Projects',
    href: '/projects',
    openInNewTab: false,
  },
  {
    label: 'Blog',
    href: '/blog',
    openInNewTab: false,
  },
  {
    label: 'Contact',
    href: '/contact',
    openInNewTab: false,
  },
]

