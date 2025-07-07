#!/bin/bash

# おしん プロフィールサイト - Gitデプロイスクリプト
echo "🚀 おしん AIクリエイター プロフィールサイト - Gitデプロイ"
echo "300個物理ボールアニメーション付き"
echo ""

# リポジトリ情報
REPO_NAME="oshin-website"
USER_NAME="usershintaro"

echo "📋 デプロイ対象ファイル:"
ls -la | grep -E '\.(html|css|js|json|jpg|png|md)$' | awk '{print "  ✅ " $9 " (" $5 " bytes)"}'
echo ""

echo "🎯 推奨デプロイ方法:"
echo ""
echo "方法1: GitHub Web Upload"
echo "  1. https://github.com/new でリポジトリ作成"
echo "  2. Repository name: ${REPO_NAME}"
echo "  3. Public に設定"
echo "  4. このフォルダの全ファイルをアップロード"
echo "  5. Settings → Pages → Deploy from branch"
echo ""
echo "方法2: Netlify Drop"
echo "  1. https://app.netlify.com/drop にアクセス"
echo "  2. このフォルダをドラッグ&ドロップ"
echo "  3. 即座にライブURL取得"
echo ""
echo "方法3: Vercel Import"
echo "  1. https://vercel.com にアクセス"
echo "  2. Import Project"
echo "  3. フォルダアップロード"
echo ""

# Git情報
echo "🔧 現在のGit設定:"
echo "  Remote: $(git remote get-url origin 2>/dev/null || echo 'Not set')"
echo "  Branch: $(git branch --show-current)"
echo "  Commits: $(git rev-list --count HEAD)"
echo ""

echo "✅ デプロイ準備完了！"
echo "📦 パッケージサイズ: $(du -sh . | cut -f1)"
echo ""
echo "🎉 期待される結果:"
echo "  - 300個物理ボールアニメーション"
echo "  - サイバーパンクUI デザイン"  
echo "  - タイピング演出"
echo "  - 実績カウンター (50万円, 18年, 100%)"
echo "  - レスポンシブ対応"