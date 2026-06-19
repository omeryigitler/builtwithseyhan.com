import React from 'react';

const App: React.FC = () => {
  return (
    <main className="coming-page" aria-label="Built With Seyhan coming soon page">
      <section className="coming-card">
        <img
          className="bws-logo"
          src="/Screenshot_2026-06-19_173558-removebg-preview.png?v=6"
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
          <p>PERSONAL TRAINING &amp; COACHING</p>
          <i />
        </div>

        <div className="mark-line" aria-hidden="true">
          <span />
        </div>

        <h2 className="coming-title">
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
