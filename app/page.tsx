import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className="page-shell">
        <h1>Chanmin Kim</h1>
        <p className="bio-text">A pharmacy student and builder wandering in search of something only I can do</p>
        <p className="contact-row">
          Contact me: <a href="mailto:chanmin713@snu.ac.kr" target="_blank" rel="noopener noreferrer">Email</a>,{"  "}
          <a href="https://www.linkedin.com/in/chanmin-kim/" target="_blank" rel="noopener noreferrer">LinkedIn</a>,{"  "}
          <a href="https://github.com/chanmin713" target="_blank" rel="noopener noreferrer">GitHub</a>,{"  "}
          <a href="https://x.com/chanminkimkr" target="_blank" rel="noopener noreferrer">x.com</a>
        </p>

        <h2>Now</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Majoring in Pharmacy at SNU since 2024</span>
          </p>

          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>
              Building a community for bio experts <span className="nowrap">— <a href="https://invite.kakao.com/tc/mHtffGqP0y" target="_blank" rel="noopener noreferrer">[Bio Lounge]</a></span>
            </span>
          </p>

          <p className="bullet-spacer" aria-hidden="true">{"\n"}</p>

          <p className="bullet-item"><span className="bullet-mark">•</span><span>{"And exploring new ideas for future projects and startups......"}</span></p>
        </div>

        <h2>Experience</h2>
        <div className="bullet-section">
          <p className="bullet-item"><span className="bullet-mark">•</span><span><Link href="/experience/bio-lounge">Bio Lounge</Link> — Founder <span className="nowrap">(2026.01 – )</span></span></p>
          <p className="bullet-item"><span className="bullet-mark">•</span><span><Link href="/experience/esoop">Esoop Company</Link> — Business Development Intern <span className="nowrap">(2026.01 – 2026.02)</span></span></p>
          <p className="bullet-item"><span className="bullet-mark">•</span><span><Link href="/experience/gustovenue">GustoVenue</Link> — Co-founder <span className="nowrap">(2025.11 – 2025.12)</span></span></p>
          <p className="bullet-item"><span className="bullet-mark">•</span><span><Link href="/experience/pluto">Pluto</Link> — Co-founder &amp; CPO <span className="nowrap">(2025.09 – 2025.12)</span></span></p>
          <p className="bullet-item"><span className="bullet-mark">•</span><span><Link href="/experience/csm17">CSM17</Link> — Backend Developer <span className="nowrap">(2025.07 – 2025.08)</span></span></p>
        </div>

        <h2>Education</h2>
        <div className="bullet-section">
          <p className="bullet-item"><span className="bullet-mark">•</span><span>Seoul National University, College of Pharmacy — B.S. in Pharmacy <span className="nowrap">(2024.03 – )</span></span></p>
        </div>

        <h2>Organizations</h2>
        <div className="bullet-section">
          <p className="bullet-item"><span className="bullet-mark">•</span><span>Medilux (Healthcare Startup Club) — Medical role <span className="nowrap">(2026.03 – )</span></span></p>
          <p className="bullet-item"><span className="bullet-mark">•</span><span>SNU Boxing Club (FOS) — Member <span className="nowrap">(2024.03 – )</span>, Leadership Team <span className="nowrap">(2025.03 – 2025.12)</span></span></p>
          <p className="bullet-item"><span className="bullet-mark">•</span><span>SNUAI — Vice President <span className="nowrap">(2025.01 – 2025.12)</span></span></p>
        </div>

        <h2>Awards</h2>
        <div className="bullet-section">
          <p className="bullet-item"><span className="bullet-mark">•</span><span><Link href="/awards/qwen-base-skyst-finalist">Qwen Base SKYST Hackathon by FLock.io</Link> — Finalist <span className="nowrap">(2025.11)</span></span></p>
          <p className="bullet-item"><span className="bullet-mark">•</span><span>19th Gwanak-gu Boxing Association President's Cup — 3rd Place <span className="nowrap">(2025.09)</span></span></p>
          <p className="bullet-item"><span className="bullet-mark">•</span><span>24th National University Boxing Club Championship — 1st Place <span className="nowrap">(2025.08)</span></span></p>
          <p className="bullet-item"><span className="bullet-mark">•</span><span><Link href="/awards/kaps-startup-competition">KNAPS Startup Project Competition</Link> — 2nd Place <span className="nowrap">(2025.07)</span></span></p>
          <p className="bullet-item"><span className="bullet-mark">•</span><span>23rd National University Boxing Club Championship — 3rd Place <span className="nowrap">(2024.08)</span></span></p>
          <p className="bullet-item"><span className="bullet-mark">•</span><span>Gyeonggi Provincial Council Chairperson’s Commendation <span className="nowrap">(2023.12)</span></span></p>
        </div>
      </div>
    </main>
  )
}
