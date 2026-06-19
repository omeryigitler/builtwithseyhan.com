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
          min-height: 100svh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(20px, 3.6vw, 64px);
          color: var(--bws-silver);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at 50% 53%, rgba(211, 141, 35, 0.18) 0, rgba(211, 141, 35, 0.07) 24%, transparent 47%),
            radial-gradient(circle at 50% 38%, rgba(255, 255, 255, 0.06) 0, rgba(255, 255, 255, 0.02) 27%, transparent 58%),
            radial-gradient(circle at 50% 118%, rgba(210, 138, 34, 0.13), transparent 43%),
            linear-gradient(135deg, #000 0%, #11100e 48%, #020202 100%);
        }

        .bws-coming-soon::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.38;
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
          background: radial-gradient(circle, transparent 30%, rgba(0,0,0,0.45) 68%, rgba(0,0,0,0.94) 100%);
        }

        .bws-shell {
          position: relative;
          z-index: 1;
          width: min(100%, 1080px);
          min-height: min(800px, calc(100vh - 40px));
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
          transform: translateY(10px);
        }

        .bws-logo-wrap {
          width: min(430px, 70vw);
          margin-bottom: clamp(18px, 2.2vw, 30px);
          filter: drop-shadow(0 24px 18px rgba(0, 0, 0, 0.66));
        }

        .bws-logo {
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .bws-mark-text {
          font-family: "Bebas Neue", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          font-size: 142px;
          font-weight: 900;
          letter-spacing: -7px;
          fill: url(#bwsGold);
          stroke: rgba(255, 230, 165, 0.62);
          stroke-width: 1;
          paint-order: stroke fill;
        }

        .bws-mark-edge {
          fill: none;
          stroke: url(#bwsGold);
          stroke-width: 9;
          stroke-linejoin: miter;
          stroke-linecap: square;
          opacity: 0.92;
          filter: drop-shadow(0 8px 9px rgba(0,0,0,0.78));
        }

        .bws-mark-dark-cut {
          fill: none;
          stroke: rgba(42, 24, 7, 0.74);
          stroke-width: 4;
          stroke-linejoin: miter;
          stroke-linecap: square;
          opacity: 0.8;
        }

        .bws-brand {
          margin: 0;
          color: #dedbd7;
          font-size: clamp(28px, 3.15vw, 46px);
          font-weight: 800;
          letter-spacing: clamp(9px, 1.22vw, 20px);
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
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
          width: min(720px, 90vw);
          margin-top: 18px;
          color: #e8b65b;
          font-size: clamp(11px, 1vw, 15px);
          font-weight: 500;
          letter-spacing: clamp(4px, 0.48vw, 7px);
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .bws-subtitle::before,
        .bws-subtitle::after {
          content: "";
          height: 1px;
          flex: 1;
          max-width: 80px;
          background: linear-gradient(90deg, transparent, rgba(226, 157, 55, 0.95));
        }

        .bws-subtitle::after {
          background: linear-gradient(90deg, rgba(226, 157, 55, 0.95), transparent);
        }

        .bws-coming-text {
          position: relative;
          margin: clamp(70px, 8vw, 96px) 0 0;
          color: #e6e2dd;
          font-size: clamp(42px, 6vw, 78px);
          font-weight: 300;
          letter-spacing: clamp(18px, 2.8vw, 40px);
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
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

        @media (max-width: 840px) {
          .bws-brand {
            white-space: normal;
            letter-spacing: 7px;
          }

          .bws-subtitle {
            width: min(620px, 92vw);
            letter-spacing: 3.3px;
            font-size: 11px;
          }
        }

        @media (max-width: 720px) {
          .bws-shell {
            min-height: calc(100vh - 48px);
          }

          .bws-center {
            transform: translateY(8px);
          }

          .bws-logo-wrap {
            width: min(330px, 78vw);
          }

          .bws-subtitle {
            gap: 11px;
            white-space: normal;
            line-height: 1.45;
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
            <svg className="bws-logo" viewBox="0 0 440 220" role="img">
              <defs>
                <linearGradient id="bwsGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff0b7" />
                  <stop offset="34%" stopColor="#d89731" />
                  <stop offset="66%" stopColor="#7b4716" />
                  <stop offset="100%" stopColor="#f4c66d" />
                </linearGradient>
                <filter id="bwsDepth" x="-25%" y="-25%" width="150%" height="160%">
                  <feDropShadow dx="0" dy="9" stdDeviation="4" floodColor="#000" floodOpacity="0.72" />
                  <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="#f2bd5a" floodOpacity="0.52" />
                </filter>
              </defs>
              <g filter="url(#bwsDepth)">
                <path className="bws-mark-edge" d="M108 78 L48 124 H96 L48 165" />
                <path className="bws-mark-edge" d="M332 78 L392 124 H344 L392 165" />
                <path className="bws-mark-dark-cut" d="M111 102 L75 128 H111 L74 154" />
                <path className="bws-mark-dark-cut" d="M329 102 L365 128 H329 L366 154" />
                <text className="bws-mark-text" x="220" y="151" textAnchor="middle" textLength="252" lengthAdjust="spacingAndGlyphs">BWS</text>
                <path d="M195 54 V172" stroke="url(#bwsGold)" strokeWidth="11" strokeLinecap="square" />
                <path d="M245 54 V172" stroke="url(#bwsGold)" strokeWidth="11" strokeLinecap="square" />
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
