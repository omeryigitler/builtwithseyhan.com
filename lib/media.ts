/** Helpers to normalise video URLs into embeddable URLs + thumbnails. */

function youtubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? m[1] : null;
}

function vimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

/** Convert any supported video URL to an embeddable iframe src. */
export function toEmbedUrl(url: string): string {
  const yt = youtubeId(url);
  if (yt) return `https://www.youtube.com/embed/${yt}?rel=0`;
  const vm = vimeoId(url);
  if (vm) return `https://player.vimeo.com/video/${vm}`;
  return url;
}

/** Best-effort thumbnail for a video URL (used when no custom image is set). */
export function videoThumb(url: string): string | null {
  const yt = youtubeId(url);
  if (yt) return `https://img.youtube.com/vi/${yt}/hqdefault.jpg`;
  return null;
}

export function isEmbeddableVideo(url: string): boolean {
  return Boolean(youtubeId(url) || vimeoId(url));
}
