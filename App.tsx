import React, { useState } from 'react';

const App: React.FC = () => {
  const [creditHover, setCreditHover] = useState(false);

  return (
    <main className="coming-page" aria-label="Built With Seyhan coming soon page">
      <section className="coming-card">
        <img
          className="bws-logo"
          src="/Screenshot_2026-06-19_173558-removebg-preview.png?v=5"
          alt="Built With Seyhan BWS logo"
          draggable="false"
          style={{ width: 'clamp(210px, 25vw, 370px)' }}
        />

        <h1 className="brand-title">
          <span>BUILT</span>
          <strong>WITH</strong>
          <span>SEYHAN</span>
        </h1>

        <div className="service-line">
          <i />
          <p>PERSONAL TRAINING &amp; COACHING</p>
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
            gap: 'clamp(30px, 5vw, 88px)',
            whiteSpace: 'nowrap',
            textIndent: 0,
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
            <strong
              onMouseEnter={() => setCreditHover(true)}
              onMouseLeave={() => setCreditHover(false)}
              style={{
                color: creditHover ? '#f1d890' : '#cdaa5a',
                textShadow: creditHover ? '0 0 10px rgba(205, 170, 90, 0.42)' : 'none',
                transition: 'color 180ms ease, text-shadow 180ms ease',
              }}
            >
              Ömer YİĞİTLER
            </strong>
          </p>
          <i />
          <span className="dot" />
        </footer>
      </section>
    </main>
  );
};

export default App;
