import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'Qwen Base SKYST Hackathon | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage title="Qwen Base SKYST Hackathon by FLock.io">
      <p>Finalist (2025.11)</p>
      <p>Planned BaseQ, an AI conversational survey platform, and led frontend implementation to reach the final round.</p>
      <p>Designed end-to-end survey flow from prompt-based generation to response, on-chain rewards, and AI insight analysis.</p>
    </DetailPage>
  )
}
