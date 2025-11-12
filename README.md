# Chanmin Kim Portfolio

Next.js로 구축된 미니멀하고 모던한 포트폴리오 웹사이트입니다.

## 기술 스택

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **CSS Modules**

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
.
├── app/
│   ├── layout.tsx      # 루트 레이아웃
│   ├── page.tsx        # 메인 페이지
│   ├── globals.css     # 전역 스타일
│   └── page.module.css # 페이지 스타일
├── public/             # 정적 파일 (비디오, 이미지 등)
└── package.json
```

## 비디오 배경 추가 (선택사항)

`public/background.mp4` 파일을 추가하면 비디오 배경이 표시됩니다.
비디오가 없어도 그라데이션 배경이 자동으로 표시됩니다.

## 커스터마이징

- `app/page.tsx`: 콘텐츠 및 링크 수정
- `app/page.module.css`: 스타일 및 색상 변경
- `app/layout.tsx`: 메타데이터 수정

## 배포

Vercel에 배포하는 것이 가장 간단합니다:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

또는 다른 플랫폼에 배포할 수 있습니다:

```bash
npm run build
```

## 브라우저 지원

모던 브라우저 (Chrome, Firefox, Safari, Edge)
