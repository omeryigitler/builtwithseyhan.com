import React from 'react';

const logos = [
  <svg key="1" height="45" viewBox="0 0 100 50" fill="currentColor"><path d="M10,25 Q10,5 30,5 Q50,5 50,25 Q50,45 30,45 Q10,45 10,25 Z M55,5 L70,45 L85,5 L100,45" stroke="currentColor" strokeWidth="4" fill="none" /><text x="30" y="32" fontFamily="Arial" fontWeight="bold" fontSize="16" textAnchor="middle" stroke="none" fill="currentColor">ON</text></svg>,
  <svg key="2" height="40" viewBox="0 0 150 40" fill="currentColor"><path d="M20,10 L30,5 L30,15 L40,15 L20,35 L20,20 L5,20 Z" /><text x="50" y="28" fontFamily="Arial" fontWeight="900" fontSize="24" fontStyle="italic" letterSpacing="-1">GATORADE</text></svg>,
  <svg key="3" height="24" viewBox="0 0 140 24" fill="currentColor"><text x="0" y="20" fontFamily="Arial" fontWeight="800" fontSize="20" letterSpacing="0.5">MYPROTEIN</text></svg>,
  <svg key="4" height="40" viewBox="0 0 180 40" fill="currentColor"><rect x="0" y="5" width="8" height="30" /><rect x="12" y="5" width="8" height="30" /><rect x="24" y="5" width="8" height="30" /><text x="40" y="28" fontFamily="Arial" fontWeight="bold" fontSize="20">MUSCLE</text><text x="125" y="28" fontFamily="Arial" fontSize="20">PHARM</text></svg>,
  <svg key="5" height="30" viewBox="0 0 80 30" fill="currentColor"><text x="0" y="25" fontFamily="Arial" fontWeight="900" fontSize="28">GNC</text></svg>,
];

export const LogoMarquee: React.FC = () => (
  <div className="relative overflow-hidden px-4 md:px-6">
    <div className="no-scrollbar flex snap-x touch-pan-x items-center gap-4 overflow-x-auto overscroll-x-contain px-2 py-2 text-gray-400 transition-colors duration-300 dark:text-gray-600 lg:hidden">
      {logos.map((logo, i) => (
        <div key={i} className="flex h-12 min-w-[128px] shrink-0 snap-center items-center justify-center grayscale opacity-75 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:text-gray-900 dark:hover:text-white [&>svg]:max-h-full [&>svg]:max-w-full">
          {logo}
        </div>
      ))}
    </div>
    <div className="hidden overflow-hidden lg:block">
      <div className="flex w-max text-gray-400 transition-colors duration-300 dark:text-gray-600 lg:animate-logo-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center gap-16 pr-16">
            {logos.map((logo, i) => (
              <div key={`${group}-${i}`} className="flex h-12 min-w-[120px] shrink-0 items-center justify-center grayscale opacity-75 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:text-gray-900 dark:hover:text-white [&>svg]:max-h-full [&>svg]:max-w-full">
                {logo}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div className="pointer-events-none absolute top-0 left-0 hidden w-24 h-full bg-gradient-to-r from-gray-50 dark:from-gray-950 to-transparent z-10 transition-colors duration-300 lg:block" />
    <div className="pointer-events-none absolute top-0 right-0 hidden w-24 h-full bg-gradient-to-l from-gray-50 dark:from-gray-950 to-transparent z-10 transition-colors duration-300 lg:block" />
  </div>
);
