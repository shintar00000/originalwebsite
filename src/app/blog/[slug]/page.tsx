'use client';

import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/blog';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Share on X function
const shareOnX = (title: string, url: string) => {
  const text = encodeURIComponent(`${title}\n\n`);
  const shareUrl = encodeURIComponent(url);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}&via=ikeikeoshin`;
  window.open(twitterUrl, '_blank', 'width=600,height=400');
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('/image/icon.jpg')] bg-cover bg-center opacity-5"></div>
      <div className="fixed inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            ブログ一覧に戻る
          </Link>
        </div>

        {/* Article */}
        <article className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-cyan-500/20 shadow-2xl overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Featured Badge */}
            {post.featured && (
              <div className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                注目記事
              </div>
            )}
          </div>
          
          {/* Article Content */}
          <div className="p-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {post.title}
            </h1>
            
            {/* Meta */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700">
              <time className="text-gray-400">
                {formatDate(post.publishedAt)}
              </time>
              
              {/* Share Button */}
              <button
                onClick={() => shareOnX(post.title, currentUrl)}
                className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Xでシェア
              </button>
            </div>
            
            {/* Content */}
            <div className="prose prose-invert prose-cyan max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold text-white mb-3 mt-6">{children}</h3>,
                  p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="text-gray-300 mb-4 pl-6 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="text-gray-300 mb-4 pl-6 space-y-2 list-decimal">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  code: ({ children, className }) => {
                    const isBlock = className?.includes('language-');
                    if (isBlock) {
                      return (
                        <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto mb-4">
                          <code className="text-cyan-300 text-sm">{children}</code>
                        </pre>
                      );
                    }
                    return <code className="bg-gray-800 text-cyan-300 px-2 py-1 rounded text-sm">{children}</code>;
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-gray-300 my-6">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previous Post */}
          {prevPost && (
            <Link href={`/blog/${prevPost.slug}`} className="group">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-cyan-500/40 transition-all">
                <div className="text-cyan-400 text-sm mb-2">← 前の記事</div>
                <h3 className="text-white font-semibold group-hover:text-cyan-300 transition-colors">
                  {prevPost.title}
                </h3>
              </div>
            </Link>
          )}
          
          {/* Next Post */}
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`} className="group">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-cyan-500/40 transition-all text-right">
                <div className="text-cyan-400 text-sm mb-2">次の記事 →</div>
                <h3 className="text-white font-semibold group-hover:text-cyan-300 transition-colors">
                  {nextPost.title}
                </h3>
              </div>
            </Link>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-cyan-500/20 shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              記事について質問がありますか？
            </h3>
            <p className="text-gray-300 mb-6">
              AIプロジェクトのご相談やご質問は、お気軽にお問い合わせください
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.456L3 21l1.456-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}