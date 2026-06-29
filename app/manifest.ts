import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Built With Seyhan',
    short_name: 'BWS',
    description:
      'Fitness, health and lifestyle — training, recipes and a workout tracker in one place.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0b0f17',
    theme_color: '#0b0f17',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
