# Radial Circle PDF Generator

指定した直径の円と角度毎の放射線を描画し、PDF出力するWebアプリケーション

## 🌐 Demo

[Live Demo](https://radial-circle-pdf.vercel.app/) 🚀

## ✨ 機能

- 円の直径と角度を指定
- リアルタイムCanvas描画プレビュー
- PDF生成・ダウンロード
- 角度バリデーション（360の約数のみ）
- レスポンシブデザイン

## 🛠 技術スタック

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **Drawing**: Canvas API
- **PDF**: PDF-lib
- **Deployment**: Vercel

## 🚀 ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動（代替手段）
python3 -m http.server 8888 --directory dist &

# ビルド
npm run build

# 型チェック
npm run type-check
```

## 📁 プロジェクト構造

```
src/
├── components/
│   ├── InputForm.tsx      # 入力フォーム
│   ├── CanvasPreview.tsx  # Canvas描画
│   └── PDFGenerator.tsx   # PDF生成
├── utils/
│   ├── validation.ts      # 角度バリデーション
│   └── pdfGeneration.ts   # PDF生成ロジック
└── types/
    └── index.ts           # 型定義
```

## 🎯 使用方法

1. 円の直径（cm）を入力
2. 角度（度）を入力（360の約数のみ有効）
3. 「生成」ボタンでプレビュー表示
4. 「保存」ボタンでPDFダウンロード

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照

## 🤝 コントリビューション

Issue や Pull Request を歓迎します！

---

Made with ❤️ by [hiroshitakeda](https://github.com/hiroshitakeda)