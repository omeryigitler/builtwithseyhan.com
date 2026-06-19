import React from 'react';

const App: React.FC = () => {
  return (
    <main className="coming-page" aria-label="Built With Seyhan coming soon page">
      <div className="page-vignette" aria-hidden="true" />
      <div className="page-grid" aria-hidden="true" />
      <div className="gold-aura" aria-hidden="true" />

      <section className="hero-card">
        <img className="bws-logo" src="/bws.png" alt="Built With Seyhan BWS logo" />

        <h1 className="brand-title" aria-label="Built With Seyhan">
          <span>BUILT</span>
          <span className="brand-gold">WITH</span>
          <span>SEYHAN</span>
        </h1>

        <div className="service-row" aria-label="Personal Training and Coaching">
          <span className="service-line" />
          <p>PERSONAL TRAINING &amp; COACHING</p>
          <span className="service-line" />
        </div>

        <div className="center-mark" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>

        <h2 className="coming-title">COMING SOON</h2>
        <div className="light-streak" aria-hidden="true" />

        <footer className="designer-credit">
          <span className="credit-dot" />
          <span className="credit-line" />
          <p>
            Designed &amp; Developed by <strong>Ömer YİĞİTLER</strong>
          </p>
          <span className="credit-line" />
          <span className="credit-dot" />
        </footer>
      </section>
    </main>
  );
};

export default App;
