/**
 * 클립보드에 텍스트를 복사하는 유틸리티 함수
 * @param text 복사할 텍스트
 * @returns 성공 여부를 나타내는 Promise<boolean>
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // 최신 Clipboard API 사용
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('클립보드 복사 실패:', err)
    
    // 폴백: 구형 브라우저 지원
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      textArea.style.pointerEvents = 'none'
      document.body.appendChild(textArea)
      textArea.select()
      textArea.setSelectionRange(0, 99999) // 모바일 지원
      
      const success = document.execCommand('copy')
      textArea.remove()
      
      return success
    } catch (fallbackErr) {
      console.error('폴백 복사 실패:', fallbackErr)
      return false
    }
  }
}

