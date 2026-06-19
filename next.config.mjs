/** @type {import('next').NextConfig} */
const supabaseHost = (() => {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return url ? new URL(url).hostname : undefined;
  } catch {
    return undefined;
  }
})();

const nextConfig = {
  reactStrictMode: true,
  // Lint is run separately (npm run lint) so it never blocks builds mid-migration.
  // Type-checking stays ON.
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      // Supabase Storage (public bucket) — host resolved from env at build time.
      ...(supabaseHost
        ? [{ protocol: 'https', hostname: supabaseHost }]
        : [{ protocol: 'https', hostname: '*.supabase.co' }]),
      // YouTube / Vimeo thumbnails for video cards.
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.vimeocdn.com' },
    ],
  },
};

export default nextConfig;
