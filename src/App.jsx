import { useEffect, useRef, useState } from 'react'

const logoPath = "M1.356 7.446v.64c0 .711-.541 1.286-1.209 1.286-.05 0-.098-.003-.147-.009v1.58h.82v1.588c0 .625.112 1.107.338 1.434.347.501.734.83 1.676.83.546 0 1.004-.126 1.304-.293v-1.868a1.266 1.266 0 0 1-.444.074c-.363 0-.512-.112-.647-.282-.087-.112-.13-.276-.13-.489v-.994h1.22V9.161h-1.22V7.446zm19.862 0v5.04c0 .627.093 1.149.319 1.478.347.5.816.827 1.75.83a1.76 1.76 0 0 0 .713-.173v-1.92c-.441.055-.594-.256-.594-.565v-4.69zm-6.552.519-.722 1.004a2.885 2.885 0 0 0-.883-.133c-.628 0-1.258.185-1.718.617-.449.419-.658 1.005-.658 1.605 0 .6.21 1.186.658 1.605.039.038.08.071.12.104l-.084.045c-.21.12-.402.273-.568.451-.284.303-.568.756-.568 1.36 0 0-.039 1.286 1.438 1.286h1.071c.247 0 .498.157.498.403 0 .086-.025.17-.072.242h2.048c.309-.351.475-.806.466-1.274-.014-.403-.133-.831-.435-1.113-.34-.316-.831-.46-1.288-.46h-2.038c-.2 0-.379-.151-.379-.338a.338.338 0 0 1 .252-.326s.034-.008.072-.02c.371.171.776.258 1.185.254.627 0 1.256-.185 1.717-.617.449-.419.658-1.005.658-1.605 0-.6-.21-1.186-.658-1.605a2.095 2.095 0 0 0-.433-.31c.432.1.879-.023 1.186-.553zm5.182 0-.722 1.004a2.883 2.883 0 0 0-.882-.133c-.628 0-1.257.185-1.717.617-.449.419-.658 1.005-.658 1.605 0 .6.21 1.186.658 1.605.131.122.278.228.436.313a2.621 2.621 0 0 0-.32.287c-.284.303-.568.756-.568 1.36 0 0-.039 1.286 1.438 1.286h1.07c.247 0 .498.157.498.403 0 .086-.024.17-.071.242h2.048c.309-.351.475-.806.466-1.274-.015-.403-.135-.831-.439-1.113-.34-.316-.831-.46-1.288-.46l-2.362-.017c-.15 0-.263-.094-.263-.232 0-.115.057-.283.2-.311.282.088.576.132.872.13.628 0 1.257-.185 1.718-.616.448-.42.658-1.006.658-1.606 0-.6-.21-1.185-.658-1.604a2.085 2.085 0 0 0-.435-.31c.433.1.879-.024 1.186-.554zm-12.45.886c-.771 0-1.542.247-2.107.823-.552.561-.808 1.346-.808 2.149 0 .803.257 1.587.807 2.149.566.576 1.337.823 2.107.823.77 0 1.541-.247 2.106-.823.55-.562.807-1.346.807-2.149 0-.803-.257-1.588-.807-2.15-.565-.575-1.335-.822-2.106-.822zm5.74 1.622a.566.566 0 1 1-.582.565.527.527 0 0 1 .143-.378h.001a.565.565 0 0 1 .438-.187zm5.194.001a.564.564 0 1 1-.581.564.526.526 0 0 1 .144-.378.564.564 0 0 1 .437-.186zm-10.872.593a.73.73 0 1 1-.75.732.678.678 0 0 1 .186-.49.73.73 0 0 1 .564-.242z"

function TogglLogo({ light = false }) {
  return (
    <div className={`brand-lockup ${light ? 'light' : ''}`} aria-label="Toggl">
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path d={logoPath} /></svg>
    </div>
  )
}

function MailIcon({ type }) {
  const paths = {
    inbox: <><path d="M4 5.5h16v13H4z"/><path d="m4 7 8 6 8-6"/></>,
    search: <><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5"/></>,
    back: <><path d="M19 12H5"/><path d="m10 7-5 5 5 5"/></>,
    star: <path d="m12 3 2.8 5.6L21 9.5l-4.5 4.4 1 6.1-5.5-2.9L6.5 20l1-6.1L3 9.5l6.2-.9z"/>,
    more: <><circle cx="6" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="18" cy="12" r="1" fill="currentColor"/></>
  }
  return <svg className="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[type]}</svg>
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.18 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>{children}</div>
}

function OverrunVisual() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const [value, setValue] = useState(40)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true)
        observer.disconnect()
      }
    }, { threshold: 0.55 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!active) return
    let start
    const duration = 900
    const tick = (time) => {
      if (!start) start = time
      const p = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(40 + 17 * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active])
  return (
    <div ref={ref} className={`overrun-visual ${active ? 'active' : ''}`}>
      <div className="overrun-head"><span>Project estimate</span><span className="status-dot">Fixed fee</span></div>
      <div className="hours-row">
        <div className="hours-cell"><span className="hours-label">Estimated</span><strong>40h</strong></div>
        <div className="connector"><span className="connector-line"/><span className="connector-arrow">→</span></div>
        <div className="hours-cell actual"><span className="hours-label">Actual</span><strong>{value}h</strong></div>
      </div>
      <div className="bar-track" aria-hidden="true"><span className="bar-plan"/><span className="bar-over"/></div>
      <div className="delta-row"><span>Original scope</span><strong>+17h</strong></div>
    </div>
  )
}

function TimesheetVisual() {
  return (
    <div className="timesheet-visual">
      <div className="sheet-top"><span>Project timesheet</span><span>Friday</span></div>
      <div className="sheet-row"><span>Estimated</span><strong>40h</strong></div>
      <div className="sheet-row"><span>Actual</span><strong>57h</strong></div>
      <div className="sheet-row implication"><span>What changed?</span><span className="hidden-value">hidden in plain sight</span></div>
      <div className="sheet-mask" aria-hidden="true"/>
    </div>
  )
}

function Newsletter({ onBack, onDemo }) {
  return (
    <main className="reader-shell">
      <header className="client-header reader-header">
        <div className="client-brand"><div className="client-mark">L</div><span>Letterbox</span></div>
        <div className="search-box"><MailIcon type="search"/><span>Search mail</span><kbd>/</kbd></div>
        <div className="avatar">J</div>
      </header>
      <div className="reader-toolbar">
        <button className="icon-button" onClick={onBack} aria-label="Back to inbox"><MailIcon type="back"/></button>
        <div className="toolbar-divider"/>
        <span className="toolbar-caption">Inbox / Babs from Toggl</span>
        <div className="toolbar-actions"><button className="icon-button" aria-label="Star"><MailIcon type="star"/></button><button className="icon-button" aria-label="More"><MailIcon type="more"/></button></div>
      </div>
      <section className="message-stage">
        <article className="email-card">
          <header className="message-meta">
            <div className="subject-line"><h1>You’re tracking hours. What are they telling you?</h1><span>Sep 28</span></div>
            <div className="sender-row">
              <div className="sender-avatar"><TogglLogo light /></div>
              <div><strong>Babs from Toggl</strong><span>to Justin</span></div>
              <button className="reply-chip">Reply</button>
            </div>
          </header>

          <div className="newsletter">
            <div className="email-brand"><TogglLogo/></div>
            <p className="greeting">Hello Justin,</p>

            <Reveal className="hook-section">
              <p className="eyebrow">Here’s something you’ve probably experienced:</p>
              <p className="hook-copy">Deadline is not an issue. You hit the deadline, send the invoice, and still wonder:</p>
              <div className="question-block">
                <span className="question-scribble" aria-hidden="true"/>
                <strong>where did all the profit go?</strong>
              </div>
              <p className="hook-answer">The answer is often sitting in the hours.</p>
            </Reveal>

            <Reveal className="problem-section">
              <div className="section-copy">
                <p>A timesheet can tell you how much time a project took. It is much harder to see what that time did to the project.</p>
                <p>Maybe the estimate was too low. Maybe the scope grew. Maybe the work simply took longer than expected. By the time you see the extra hours, the project may already be over.</p>
              </div>
              <TimesheetVisual />
            </Reveal>

            <Reveal className="shift-section">
              <span className="shift-dot"/>
              <p>The useful part of tracking time is understanding what the hours tell you about the project.</p>
            </Reveal>

            <Reveal className="example-section">
              <OverrunVisual />
              <p>Those extra 17 hours may not look like much on a timesheet. On a fixed-fee project, they can change what the work actually costs to deliver.</p>
              <p className="pay-attention">That is the part worth paying attention to.</p>
            </Reveal>

            <Reveal className="bridge-section">
              <p>Toggl lets you set the estimate before the work starts, track actual hours as the project moves along, and see the difference between the two.</p>
              <div className="flow" aria-label="Estimate, Track, Compare">
                <span>Estimate</span><i>↓</i><span>Track</span><i>↓</i><span>Compare</span>
              </div>
            </Reveal>

            <Reveal className="cta-section">
              <button className="primary-cta" onClick={onDemo}>See how it works <span>→</span></button>
            </Reveal>

            <footer className="email-footer">
              <div className="footer-rule"/>
              <TogglLogo/>
              <p>Portfolio concept. Not an official Toggl email.</p>
            </footer>
          </div>
        </article>
      </section>
    </main>
  )
}

function Inbox({ onOpen }) {
  return (
    <main className="inbox-shell">
      <header className="client-header">
        <div className="client-brand"><div className="client-mark">L</div><span>Letterbox</span></div>
        <div className="search-box"><MailIcon type="search"/><span>Search mail</span><kbd>/</kbd></div>
        <div className="avatar">J</div>
      </header>
      <div className="mail-layout">
        <aside className="mail-sidebar">
          <button className="compose-button">+ Compose</button>
          <nav>
            <button className="active"><MailIcon type="inbox"/><span>Inbox</span><b>1</b></button>
            <button><MailIcon type="star"/><span>Starred</span></button>
          </nav>
          <div className="sidebar-note"><span>Workspace</span><strong>Personal</strong><small>justin@letterbox.test</small></div>
        </aside>
        <section className="inbox-panel">
          <div className="inbox-title"><div><p>Mail</p><h1>Inbox</h1></div><span>1 unread</span></div>
          <div className="mail-filters"><button className="selected">Primary</button><button>Updates</button><button>Saved</button></div>
          <div className="message-list">
            <button className="message-row primary-message unread" onClick={onOpen}>
              <span className="unread-dot"/>
              <div className="sender-col"><strong>Babs from Toggl</strong><span>to Justin</span></div>
              <div className="subject-col"><strong>You’re tracking hours. What are they telling you?</strong><span>Tracked hours are useful. Understanding what they mean for a project is more valuable.</span></div>
              <time>11:42 AM</time>
            </button>
            <div className="message-row muted-message">
              <span className="read-dot"/>
              <div className="sender-col"><strong>Letterbox</strong><span>Welcome</span></div>
              <div className="subject-col"><strong>Your weekly reading list</strong><span>Three notes you saved for later.</span></div>
              <time>Yesterday</time>
            </div>
            <div className="message-row muted-message">
              <span className="read-dot"/>
              <div className="sender-col"><strong>Studio Notes</strong><span>Issue 18</span></div>
              <div className="subject-col"><strong>Designing for the quiet moments</strong><span>A short field note on restraint.</span></div>
              <time>Sep 25</time>
            </div>
          </div>
          <div className="inbox-empty"><span>End of inbox</span></div>
        </section>
      </div>
    </main>
  )
}

function Demo({ onBack }) {
  return (
    <main className="demo-page">
      <div className="demo-topbar"><button onClick={onBack}><MailIcon type="back"/>Back to email</button><span>Portfolio concept · Product demonstration</span></div>
      <section className="demo-card">
        <div className="demo-brand"><TogglLogo light/></div>
        <span className="demo-kicker">Email 2 / product demonstration</span>
        <h1>From hours tracked<br/>to project clarity.</h1>
        <p>This route is intentionally a polished placeholder. It continues the same estimate → actual → difference story and leaves a clear destination for a future interactive Toggl product demonstration.</p>
        <div className="demo-flow">
          <div><span>01</span><strong>Set the estimate</strong><small>40h planned</small></div>
          <i>→</i>
          <div><span>02</span><strong>Track the work</strong><small>57h actual</small></div>
          <i>→</i>
          <div className="demo-highlight"><span>03</span><strong>See the difference</strong><small>+17h over</small></div>
        </div>
        <div className="demo-placeholder"><div className="placeholder-lines"><span/><span/><span/></div><strong>Interactive product demo will live here.</strong></div>
      </section>
    </main>
  )
}

export default function App() {
  const initial = window.location.pathname === '/demo' ? 'demo' : 'inbox'
  const [view, setView] = useState(initial)
  const navigate = (next, path) => {
    setView(next)
    window.history.pushState({}, '', path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  useEffect(() => {
    const handler = () => setView(window.location.pathname === '/demo' ? 'demo' : 'inbox')
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])
  if (view === 'demo') return <Demo onBack={() => navigate('reader', '/')} />
  if (view === 'reader') return <Newsletter onBack={() => navigate('inbox', '/')} onDemo={() => navigate('demo', '/demo')} />
  return <Inbox onOpen={() => setView('reader')} />
}
