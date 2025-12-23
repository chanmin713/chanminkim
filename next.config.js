/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export', // 개발 모드에서는 주석 처리 (배포 시에만 사용)
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig

