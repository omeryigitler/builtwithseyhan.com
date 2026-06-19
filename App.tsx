import React, { useState } from 'react';

const App: React.FC = () => {
  const [creditHover, setCreditHover] = useState(false);

  return (
    <main className="coming-page" aria-label="Built With Seyhan coming soon page">
      <section className="coming-card">
        <img
          className="bws-logo"
          src="/Screenshot_2026-06-19_173558-removebg-preview.png?v=7"
          alt="Built With Seyhan BWS logo"
          draggable="false"
        />

        <h1 className="brand-title">
          <span>BUILT</span>
          <strong>WITH</strong>
          <span>SEYHAN</span>
        </h1>

        <div className="service-line">
          <i />
          <p>Fitness <span aria-hidden="true">•</span> Health <span aria-hidden="true">•</span> LifeStyle</p>
          <i />
        </div>

        <div className="mark-line" aria-hidden="true">
          <span />
        </div>

        <h2
          className="coming-title"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(16px, 4vw, 80px)',
            whiteSpace: 'nowrap',
            textIndent: 0,
            fontSize: 'clamp(25px, 8vw, 105px)',
            letterSpacing: 'clamp(0.07em, 1.6vw, 0.32em)',
            lineHeight: 1,
          }}
        >
          <span>COMING</span>
          <span>SOON</span>
        </h2>

        <div className="light-line" aria-hidden="true" />

        <footer className="credit-line">
          <span className="dot" />
          <i />
          <p>
            Designed &amp; Developed by{' '}
            <a
              href="https://omeryigitler.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit omeryigitler.com"
              onMouseEnter={() => setCreditHover(true)}
              onMouseLeave={() => setCreditHover(false)}
              style={{
                color: creditHover ? '#f1d890' : '#cdaa5a',
                fontWeight: 800,
                textDecoration: 'none',
                textShadow: creditHover ? '0 0 10px rgba(205, 170, 90, 0.42)' : 'none',
                transition: 'color 180ms ease, text-shadow 180ms ease',
              }}
            >
              Ömer YİĞİTLER
            </a>
          </p>
          <i />
          <span className="dot" />
        </footer>
      </section>
    </main>
  );
};

export default App;
