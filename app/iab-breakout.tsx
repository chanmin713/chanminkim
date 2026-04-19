'use client';

import { useEffect } from 'react';

export default function IabBreakout() {
  useEffect(() => {
    const ua = navigator.userAgent || '';
    const url = window.location.href;

    const isKakaoTalk = /KAKAOTALK/i.test(ua);
    const isLine = /Line\//i.test(ua);
    const isFacebook = /FBAN|FBAV/i.test(ua);
    const isInstagram = /Instagram/i.test(ua);
    const isNaver = /NAVER\(inapp|DaumApps/i.test(ua);
    const isTwitter = /Twitter/i.test(ua);
    const isBand = /BAND\//i.test(ua);
    const isEverytime = /everytime/i.test(ua);

    const isInApp = isKakaoTalk || isLine || isFacebook || isInstagram || isNaver || isTwitter || isBand || isEverytime;
    if (!isInApp) return;

    if (isKakaoTalk) {
      window.location.replace('kakaotalk://web/openExternal?url=' + encodeURIComponent(url));
      return;
    }

    const isAndroid = /Android/i.test(ua);

    if (isAndroid) {
      const strippedUrl = url.replace(/^https?:\/\//, '');
      const intentUrl = 'intent://' + strippedUrl + '#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end';
      window.location.replace(intentUrl);
      return;
    }

    // iOS in-app browsers: best-effort attempt to open in default browser
    window.open(url, '_blank');
  }, []);

  return null;
}
