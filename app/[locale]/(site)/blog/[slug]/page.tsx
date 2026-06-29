import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getPostBySlug, getAllSlugs } from '@/lib/content';
import { localize } from '@/lib/types';
import { toEmbedUrl } from '@/lib/media';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleLd } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://builtwithseyhan.com';

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const title = localize(post.title, loc);
  const description = localize(post.excerpt, loc);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: { tr: `/tr/blog/${slug}`, en: `/en/blog/${slug}` },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const title = localize(post.title, locale);
  const body = localize(post.body, locale) || localize(post.excerpt, locale);
  const category = dict.categories[post.category] ?? post.category;

  return (
    <article className="px-5 pb-20 pt-32 sm:px-6 sm:pt-40">
      <JsonLd
        data={articleLd({
          title,
          description: localize(post.excerpt, locale),
          url: `${SITE_URL}/${locale}/blog/${slug}`,
          image: post.imageUrl,
          datePublished: post.createdAt,
        })}
      />
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/${locale}/blog`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-brand"
        >
          <ArrowLeft size={16} /> {dict.post.backToBlog}
        </Link>

        <span className="mb-3 inline-block rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-brand">
          {category}
        </span>
        <h1 className="mb-6 text-3xl font-black uppercase leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl">
          {title}
        </h1>

        {post.type === 'video' && post.videoUrl ? (
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-3xl bg-black">
            <iframe
              className="h-full w-full"
              src={toEmbedUrl(post.videoUrl)}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : post.imageUrl ? (
          <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800">
            <Image
              src={post.imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        {body && (
          <div className="prose-lg whitespace-pre-line text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {body}
          </div>
        )}

        {post.socialUrl && (
          <a
            href={post.socialUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-gray-900 underline-offset-4 hover:underline dark:text-brand"
          >
            <ExternalLink size={16} /> {dict.post.viewOriginal}
          </a>
        )}
      </div>
    </article>
  );
}
