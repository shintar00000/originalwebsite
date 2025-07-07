# 🐾 おしん - AI クリエイター プロフィールサイト

Next.js + TypeScript + Tailwind CSS で構築された、ブログ機能と問い合わせフォーム付きのプロフィールサイト

## 🚀 主要機能

### 💫 インタラクティブな体験
- **物理演算ローディング**: 300個のネコアイコンボールが重力・衝突・積み上げシミュレーション
- **動画ヒーローセクション**: 動的なバックグラウンド
- **タイピング演出**: OSHINコマンドライン風のタイピングアニメーション
- **実績カウンター**: スクロール時の数値アニメーション

### 📝 ブログシステム
- **記事一覧**: タグフィルター機能付きの美しいグリッドレイアウト
- **個別記事ページ**: Markdown対応、前後記事ナビゲーション
- **Xシェア機能**: ワンクリックでTwitter投稿
- **注目記事**: ホームページでの特集表示

### 📧 問い合わせフォーム
- **Cloudflare Turnstile**: ボット防止機能
- **Discord Webhook**: リッチEmbed形式でメッセージ送信
- **バリデーション**: フォーム入力チェックとエラーメッセージ
- **レスポンシブデザイン**: 全デバイス対応

## 🛠 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Content**: JSON-based blog system
- **Markdown**: React Markdown
- **Security**: Cloudflare Turnstile
- **Integration**: Discord Webhook API

## 🚀 セットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
`.env.local` ファイルを作成:
```env
NEXT_PUBLIC_CF_SITE_KEY=your_cloudflare_site_key
CF_SECRET_KEY=your_cloudflare_secret_key
WEBHOOK_URL=your_discord_webhook_url
```

### 3. 開発サーバーの起動
```bash
npm run dev
```

### 4. ビルド
```bash
npm run build
npm start
```

## 📁 プロジェクト構成

```
├── src/
│   ├── app/
│   │   ├── page.tsx           # ホームページ
│   │   ├── blog/
│   │   │   ├── page.tsx       # ブログ一覧
│   │   │   └── [slug]/        # 個別記事ページ
│   │   ├── contact/
│   │   │   └── page.tsx       # 問い合わせフォーム
│   │   └── api/
│   │       └── contact/       # API エンドポイント
│   ├── data/
│   │   └── blog-posts.json    # ブログ記事データ
│   ├── lib/
│   │   └── blog.ts            # ブログ用ユーティリティ
│   └── globals.css            # グローバルスタイル
├── public/
│   ├── image/                 # 画像アセット
│   └── physics_balls.js       # 物理演算スクリプト
└── .env.local                 # 環境変数
```

## 🎯 ページ構成

- **`/`** - ホームページ（プロフィール、実績、注目ブログ）
- **`/blog`** - ブログ一覧（タグフィルター付き）
- **`/blog/[slug]`** - 個別記事ページ
- **`/contact`** - 問い合わせフォーム

## 📝 ブログ記事の追加

`src/data/blog-posts.json` を編集して新しい記事を追加:

```json
{
  "id": "unique-id",
  "title": "記事タイトル",
  "slug": "url-slug",
  "excerpt": "記事の概要",
  "content": "Markdown形式のコンテンツ",
  "publishedAt": "2024-07-07T00:00:00Z",
  "tags": ["タグ1", "タグ2"],
  "featured": true,
  "image": "/image/thumbnail.jpg"
}
```

## 🚀 デプロイ

### Vercel（推奨）
1. [Vercel](https://vercel.com) でプロジェクトをインポート
2. 環境変数を設定
3. 自動デプロイ

### その他のプラットフォーム
- **Netlify**: ビルドコマンド `npm run build && npm run export`
- **GitHub Pages**: Static export設定後デプロイ

## 🎨 カスタマイズ

### カラーテーマ
`src/app/globals.css` でCSS変数を編集:
```css
:root {
  --accent-primary: #34d5ff;
  --accent-secondary: #7c4dff;
  --accent-highlight: #ff6b9d;
}
```

### 物理アニメーション
`public/physics_balls.js` でボール数や物理パラメータを調整

---

**ikeikeoshin.com** - *おしんが動けば、アイデアが加速する。* 🚀

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS