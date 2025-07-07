'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedPosts, formatDate } from '@/lib/blog';

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  
  useEffect(() => {
    // Load physics balls script
    const script = document.createElement('script');
    script.src = '/physics_balls.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <div className="loading-screen" id="loadingScreen">
        <div className="loading-cats" id="loadingCats"></div>
        <div className="hidden-progress">
          <div className="progress-bar" id="progressBar"></div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content" id="mainContent">
        {/* Custom Cursor */}
        <div className="custom-cursor" id="customCursor"></div>
    
        {/* Particle Background */}
        <div className="particle-bg">
          <canvas id="particleCanvas"></canvas>
        </div>

        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="container">
            <div className="hero-content">
              {/* Cat Image */}
              <div className="hero-image">
                <div className="floating-shapes">
                  <div className="shape"></div>
                  <div className="shape"></div>
                  <div className="shape"></div>
                </div>
                <div className="hologram-rings">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                  <div className="ring ring-3"></div>
                </div>
                <div className="star-grid"></div>
                <div className="cyber-grid"></div>
                <div className="hero-bg-cat"></div>
                <div className="cat-container">
                  <Image src="/image/icon.jpg" alt="Oshin Cat" className="ninja-cat" id="ninjaCat" width={200} height={200} />
                  <div className="cat-eyes" id="catEyes">
                    <div className="cat-eye" id="leftEye"></div>
                    <div className="cat-eye" id="rightEye"></div>
                  </div>
                  <div className="cat-glow"></div>
                </div>
              </div>
              
              {/* Hero Text */}
              <div className="hero-text">
                <div className="console-text" id="consoleText">
                  <span id="typewriter"></span>
                  <span className="cursor">|</span>
                </div>
                <h1 className="hero-title" id="heroTitle">
                  <span className="gradient-text">おしんが動けば、アイデアが加速する。</span>
                </h1>
                <p className="hero-subtitle" id="heroSubtitle">
                  40歳・5児パパのAIクリエイター
                </p>
                <div className="hero-profile" id="heroProfile">
                  <p className="hero-name">おしん（Oshin）・消防士18年 → AI・経営コンサル独立</p>
                </div>
                <div className="hero-cta" id="heroCta">
                  <Link href="/contact" className="discord-btn">
                    <span className="btn-text">お問い合わせ</span>
                    <div className="btn-gradient"></div>
                  </Link>
                </div>
                <div className="scroll-indicator" id="scrollIndicator">
                  <a href="#profile" className="scroll-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Section */}
        <section id="profile" className="profile-section">
          <div className="container">
            <div className="section-content">
              <h2 className="section-title">プロフィール</h2>
              <div className="profile-grid">
                <div className="profile-story">
                  <div className="story-card">
                    <div className="card-header">
                      <div className="fire-icon">🔥</div>
                      <h3>消防士として18年</h3>
                    </div>
                    <p>副隊長として地域の安全を守り、PTA会長や防災リーダーとして地域を支えてきました。</p>
                    <div className="profile-details">
                      <p><strong>趣味:</strong> 筋トレ、トレーディングカードゲーム</p>
                      <p><strong>特技:</strong> 料理（シェフ並みの腕前）</p>
                    </div>
                  </div>
                  <div className="arrow-down">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                  </div>
                  <div className="story-card">
                    <div className="card-header">
                      <div className="ai-icon">🤖</div>
                      <h3>2024年、AIクリエイターへ</h3>
                    </div>
                    <p>生成AIの可能性に魅力を感じ、独立を決意。新しい技術で社会に貢献する道を選びました。</p>
                  </div>
                </div>
                
                <div className="achievements">
                  <h3 className="achievement-title">実績</h3>
                  <div className="achievement-grid">
                    <div className="achievement-item">
                      <div className="achievement-number" data-target="50">0</div>
                      <div className="achievement-label">最高月商（万円）</div>
                      <div className="achievement-desc">生成AIポスター販売</div>
                    </div>
                    <div className="achievement-item">
                      <div className="achievement-number" data-target="18">0</div>
                      <div className="achievement-label">消防士経験（年）</div>
                      <div className="achievement-desc">副隊長まで昇進</div>
                    </div>
                    <div className="achievement-item">
                      <div className="achievement-number" data-target="100">0</div>
                      <div className="achievement-label">支援実績（%）</div>
                      <div className="achievement-desc">AI導入・Web開発</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="portfolio-section">
          <div className="container">
            <div className="section-content">
              <h2 className="section-title">最新ブログ</h2>
              
              {featuredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {featuredPosts.slice(0, 3).map(post => (
                    <article key={post.id} className="group">
                      <Link href={`/blog/${post.slug}`}>
                        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-cyan-500/20 shadow-2xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:transform hover:scale-105">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {post.featured && (
                              <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                                注目
                              </div>
                            )}
                          </div>
                          
                          <div className="p-6">
                            <div className="flex flex-wrap gap-1 mb-3">
                              {post.tags.slice(0, 2).map(tag => (
                                <span
                                  key={tag}
                                  className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            
                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <time className="text-gray-400 text-xs">
                                {formatDate(post.publishedAt)}
                              </time>
                              <span className="text-cyan-400 text-sm font-medium group-hover:text-cyan-300">
                                読む →
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">ブログ記事を準備中です...</p>
                </div>
              )}
              
              <div className="text-center">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  全てのブログを見る
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="container">
            <div className="section-content">
              <h2 className="section-title">お話ししましょう</h2>
              
              <div className="contact-main">
                <div className="discord-card">
                  <div className="discord-logo">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                    </svg>
                  </div>
                  <h3>お問い合わせフォーム</h3>
                  <p>プロジェクトのご相談、AIの導入支援、<br/>お気軽にお声がけください。</p>
                  <Link href="/contact" className="discord-primary-btn">
                    <span>フォームへ</span>
                    <div className="btn-glow"></div>
                  </Link>
                </div>
              </div>

              <div className="social-links">
                <h3>SNS</h3>
                <div className="social-grid">
                  <a href="https://www.youtube.com/@ikeikeoshin" className="social-item" data-platform="youtube" target="_blank" rel="noopener noreferrer">
                    <Image src="/image/YouTube.png" alt="YouTube" className="social-icon" width={32} height={32} />
                    <span>YouTube</span>
                  </a>
                  <a href="https://x.com/ikeikeoshin" className="social-item" data-platform="twitter" target="_blank" rel="noopener noreferrer">
                    <Image src="/image/X.jpg" alt="X" className="social-icon" width={32} height={32} />
                    <span>X</span>
                  </a>
                  <a href="https://www.instagram.com/ikeikeoshin/" className="social-item" data-platform="instagram" target="_blank" rel="noopener noreferrer">
                    <Image src="/image/Instagram.jpg" alt="Instagram" className="social-icon" width={32} height={32} />
                    <span>Instagram</span>
                  </a>
                  <a href="https://www.tiktok.com/@ikeikeoshin" className="social-item" data-platform="tiktok" target="_blank" rel="noopener noreferrer">
                    <Image src="/image/TikTok.jpg" alt="TikTok" className="social-icon" width={32} height={32} />
                    <span>TikTok</span>
                  </a>
                  <a href="https://financie.jp/users/ikeikeoshin" className="social-item" data-platform="financie" target="_blank" rel="noopener noreferrer">
                    <Image src="/image/FiNANCiE.png" alt="FiNANCiE" className="social-icon" width={32} height={32} />
                    <span>FiNANCiE</span>
                  </a>
                  <a href="https://note.com/ikeikeoshin" className="social-item" data-platform="note" target="_blank" rel="noopener noreferrer">
                    <Image src="/image/note.jpg" alt="note" className="social-icon" width={32} height={32} />
                    <span>note</span>
                  </a>
                  <a href="https://suno.com/@ikeikeoshin" className="social-item" data-platform="suno" target="_blank" rel="noopener noreferrer">
                    <Image src="/image/Suno.jpg" alt="Suno" className="social-icon" width={32} height={32} />
                    <span>Suno</span>
                  </a>
                  <a href="https://github.com/ikeikeoshin" className="social-item" data-platform="github" target="_blank" rel="noopener noreferrer">
                    <Image src="/image/Github.png" alt="GitHub" className="social-icon" width={32} height={32} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 ikeikeoshin.com</p>
          </div>
        </footer>

      </div>
    </>
  );
}