# 🚀 Netlify Drop デプロイ手順

## 即座にライブサイト作成！

### STEP 1: Netlify Drop アクセス
1. **[https://app.netlify.com/drop](https://app.netlify.com/drop)** をブラウザで開く

### STEP 2: ファイルをドラッグ&ドロップ
以下のファイル・フォルダを **すべて選択** してドラッグ&ドロップ：

📁 **フォルダ構成：**
```
deploy-ready/
├── index.html          ✅ メインHTML（物理ボール300個）
├── style.css           ✅ サイバーパンクCSS
├── physics_balls.js    ✅ 物理エンジン
├── vercel.json        ✅ 設定ファイル
├── README.md          ✅ プロジェクト説明
└── image/             ✅ 画像フォルダ全体
    ├── icon.jpg       → ネコアイコン（ボール用）
    ├── movie.mp4      → ヒーロー動画（31MB）
    ├── Discord.jpg    → SNSアイコン
    ├── Instagram.jpg  → SNSアイコン
    ├── YouTube.png    → SNSアイコン
    └── その他SNS 6個   → X, TikTok, note等
```

### STEP 3: デプロイ完了
- 約1-2分でライブURLが生成されます
- 例: `https://amazing-cat-123456.netlify.app`

### STEP 4: 期待される結果
✅ **ローディング**: 300個ネコボールの物理アニメーション  
✅ **ヒーロー**: 動画再生（GitHub Releases経由）  
✅ **タイピング**: 「おしんが動けば、アイデアが加速する。」  
✅ **実績**: 50万円・18年・100% カウンター  
✅ **SNS**: 全アイコンリンク動作  

## トラブルシューティング
- **動画が表示されない**: GitHub Releasesに `movie.mp4` をアップロード後に再試行
- **アニメーションが重い**: デスクトップブラウザで確認
- **モバイル表示**: HTTPSで自動配信されるため問題なし

---
**準備完了！Netlify Dropにドラッグ&ドロップしてください！** 🎉