import React from 'react';

const App: React.FC = () => {
  return (
    <main className="bws-coming-soon" aria-label="Built With Seyhan coming soon page">
      <style>{`
        :root {
          --bws-black: #050505;
          --bws-soft-black: #11100e;
          --bws-gold: #c88a28;
          --bws-gold-light: #f4d080;
          --bws-silver: #e8e3dc;
          --bws-muted: #8f8981;
        }

        html,
        body,
        #root {
          min-height: 100%;
          margin: 0;
          background: var(--bws-black);
        }

        body {
          overflow-x: hidden;
        }

        .bws-coming-soon {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(24px, 4vw, 72px);
          color: var(--bws-silver);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at 50% 56%, rgba(212, 150, 48, 0.14) 0, rgba(212, 150, 48, 0.05) 18%, transparent 42%),
            radial-gradient(circle at 50% 36%, rgba(255, 255, 255, 0.08) 0, rgba(255, 255, 255, 0.025) 24%, transparent 58%),
            radial-gradient(circle at 50% 120%, rgba(210, 138, 34, 0.16), transparent 44%),
            linear-gradient(135deg, #000 0%, #11100e 48%, #020202 100%);
        }

        .bws-coming-soon::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.42;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px);
          background-size: 5px 5px;
          mix-blend-mode: screen;
        }

        .bws-coming-soon::after {
          content: "";
          position: absolute;
          inset: -12%;
          pointer-events: none;
          background: radial-gradient(circle, transparent 28%, rgba(0,0,0,0.42) 66%, rgba(0,0,0,0.92) 100%);
        }

        .bws-shell {
          position: relative;
          z-index: 1;
          width: min(100%, 1040px);
          min-height: min(760px, calc(100vh - 48px));
          display: grid;
          grid-template-rows: 1fr auto 1fr;
          align-items: center;
          text-align: center;
        }

        .bws-center {
          align-self: end;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: translateY(18px);
        }

        .bws-logo-wrap {
          width: min(360px, 70vw);
          margin-bottom: clamp(18px, 2.4vw, 32px);
          filter: drop-shadow(0 22px 18px rgba(0, 0, 0, 0.58));
        }

        .bws-logo {
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .bws-mark-text {
          font-family: "Bebas Neue", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          font-size: 126px;
          font-weight: 900;
          letter-spacing: -8px;
          fill: url(#bwsGold);
          stroke: rgba(255, 228, 158, 0.58);
          stroke-width: 1.2;
          paint-order: stroke fill;
        }

        .bws-mark-cut {
          stroke: rgba(57, 31, 5, 0.72);
          stroke-width: 6;
          stroke-linecap: square;
        }

        .bws-brand {
          margin: 0;
          color: #dedbd7;
          font-size: clamp(27px, 3.05vw, 44px);
          font-weight: 800;
          letter-spacing: clamp(10px, 1.25vw, 20px);
          line-height: 1;
          text-transform: uppercase;
          text-shadow: 0 4px 18px rgba(0, 0, 0, 0.7), 0 1px 0 rgba(255,255,255,0.28);
        }

        .bws-brand span {
          color: var(--bws-gold-light);
          background: linear-gradient(180deg, #fff0bc 0%, #d9982d 38%, #8e5518 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: none;
        }

        .bws-subtitle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          width: min(560px, 82vw);
          margin-top: 18px;
          color: #e8b65b;
          font-size: clamp(12px, 1.25vw, 17px);
          font-weight: 500;
          letter-spacing: clamp(5px, 0.55vw, 9px);
          text-transform: uppercase;
        }

        .bws-subtitle::before,
        .bws-subtitle::after {
          content: "";
          height: 1px;
          flex: 1;
          max-width: 84px;
          background: linear-gradient(90deg, transparent, rgba(226, 157, 55, 0.9));
        }

        .bws-subtitle::after {
          background: linear-gradient(90deg, rgba(226, 157, 55, 0.9), transparent);
        }

        .bws-coming-text {
          position: relative;
          margin: clamp(68px, 8.6vw, 100px) 0 0;
          color: #e6e2dd;
          font-size: clamp(42px, 6.1vw, 78px);
          font-weight: 300;
          letter-spacing: clamp(18px, 2.8vw, 40px);
          line-height: 1;
          text-transform: uppercase;
          text-shadow: 0 7px 0 rgba(0,0,0,0.35), 0 0 32px rgba(255,255,255,0.1);
        }

        .bws-light-line {
          width: min(390px, 56vw);
          height: 2px;
          margin-top: 32px;
          background: linear-gradient(90deg, transparent, rgba(151, 96, 26, 0.3), #fff0b9, rgba(151, 96, 26, 0.3), transparent);
          box-shadow: 0 0 24px rgba(255, 190, 75, 0.74), 0 0 3px rgba(255, 255, 255, 0.98);
        }

        .bws-footer {
          align-self: end;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 24px;
          width: min(100%, 960px);
          margin: 0 auto clamp(8px, 3vw, 38px);
          color: var(--bws-muted);
          font-size: clamp(12px, 1.1vw, 16px);
          letter-spacing: 2.8px;
        }

        .bws-footer::before,
        .bws-footer::after {
          content: "";
          height: 1px;
          background: linear-gradient(90deg, rgba(218, 148, 43, 0.82), transparent);
        }

        .bws-footer::after {
          background: linear-gradient(90deg, transparent, rgba(218, 148, 43, 0.82));
        }

        .bws-footer-copy {
          position: relative;
          white-space: nowrap;
        }

        .bws-footer-copy::before,
        .bws-footer-copy::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #d6973a;
          box-shadow: 0 0 12px rgba(232, 173, 79, 0.76);
        }

        .bws-footer-copy::before {
          left: -38px;
        }

        .bws-footer-copy::after {
          right: -38px;
        }

        .bws-footer a {
          color: #f0b95e;
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 3px;
          transition: letter-spacing 220ms ease, color 220ms ease;
        }

        .bws-footer a:hover {
          color: #ffd889;
          letter-spacing: 4px;
        }

        @media (max-width: 720px) {
          .bws-shell {
            min-height: calc(100vh - 48px);
          }

          .bws-center {
            transform: translateY(8px);
          }

          .bws-brand {
            letter-spacing: 7px;
          }

          .bws-subtitle {
            gap: 11px;
            letter-spacing: 3.6px;
          }

          .bws-coming-text {
            letter-spacing: 13px;
          }

          .bws-footer {
            display: block;
            line-height: 1.9;
            letter-spacing: 1.8px;
          }

          .bws-footer::before,
          .bws-footer::after,
          .bws-footer-copy::before,
          .bws-footer-copy::after {
            display: none;
          }
        }
      `}</style>

      <section className="bws-shell">
        <div />

        <div className="bws-center">
          <div className="bws-logo-wrap" aria-hidden="true">
            <svg className="bws-logo" viewBox="0 0 520 210" role="img">
              <defs>
                <linearGradient id="bwsGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff0b7" />
                  <stop offset="36%" stopColor="#d89731" />
                  <stop offset="68%" stopColor="#7b4716" />
                  <stop offset="100%" stopColor="#f4c66d" />
                </linearGradient>
                <filter id="bwsDepth" x="-20%" y="-20%" width="140%" height="150%">
                  <feDropShadow dx="0" dy="8" stdDeviation="4" floodColor="#000" floodOpacity="0.78" />
                  <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#f2bd5a" floodOpacity="0.5" />
                </filter>
              </defs>
              <g filter="url(#bwsDepth)">
                <text className="bws-mark-text" x="50%" y="138" textAnchor="middle">BWS</text>
                <path className="bws-mark-cut" d="M174 58 L106 104 H171 L104 158" fill="none" opacity="0.55" />
                <path className="bws-mark-cut" d="M346 58 L414 104 H349 L416 158" fill="none" opacity="0.55" />
                <path d="M246 32 V173" stroke="url(#bwsGold)" strokeWidth="13" strokeLinecap="square" />
                <path d="M274 32 V173" stroke="url(#bwsGold)" strokeWidth="13" strokeLinecap="square" />
              </g>
            </svg>
          </div>

          <h1 className="bws-brand">
            BUILT <span>WITH</span> SEYHAN
          </h1>

          <div className="bws-subtitle">{'PERSONAL TRAINING & COACHING'}</div>

          <div className="bws-coming-text">COMING SOON</div>
          <div className="bws-light-line" aria-hidden="true" />
        </div>

        <footer className="bws-footer">
          <span />
          <div className="bws-footer-copy">
            Designed &amp; Developed by{' '}
            <a href="https://omeryigitler.com" target="_blank" rel="noreferrer">
              Ömer YİĞİTLER
            </a>
          </div>
          <span />
        </footer>
      </section>
    </main>
  );
};

export default App;
