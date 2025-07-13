# Radial Circle PDF Generator

指定した直径の円と角度毎の放射線を描画し、PDF出力するWebアプリケーション

## 🌐 Demo

[Live Demo](https://radial-circle-pdf.vercel.app/) 🚀

## ✨ 機能

- 円の直径（mm）と角度を指定
- **2つの角度入力方式**
  - 手動入力：角度を直接指定（360の約数のみ）
  - 等分指定：360度のn等分を選択（2〜45等分）
- 延長ライン機能（放射線を円周外に突き出し）
- リアルタイムCanvas描画プレビュー
- PDF生成・ダウンロード
- 角度バリデーション（360の約数のみ）
- デフォルト値設定（直径:50mm、角度:30度、延長:10mm）
- **再作成時の入力値保持機能** 🆕
- **モダンUIデザイン**（グラデーション背景、カード型レイアウト） 🆕
- **アニメーション付きボタンとホバーエフェクト** 🆕
- レスポンシブデザイン（モバイル対応強化）

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
│   ├── InputForm.tsx      # 入力フォーム（直径・角度・延長ライン）
│   ├── CanvasPreview.tsx  # Canvas描画（延長ライン対応）
│   └── PDFGenerator.tsx   # PDF生成（延長ライン対応）
├── utils/
│   ├── validation.ts      # 角度バリデーション
│   └── pdfGeneration.ts   # PDF生成ロジック
└── types/
    └── index.ts           # 型定義（CircleData）
```

## 🎯 使用方法

1. 円の直径（mm）を入力（デフォルト：50mm）
2. 角度入力方式を選択：
   - **手動入力**：角度を直接入力（360の約数のみ有効、デフォルト：30度）
   - **等分指定**：360度のn等分を選択（デフォルト：12等分=30度）
3. 延長ライン長さ（mm）を入力（0-20の整数、デフォルト：10mm）
4. 「生成」ボタンでプレビュー表示
5. 「PDF保存」ボタンでPDFダウンロード
6. 「再作成」ボタンで入力画面に戻る（**前回の値を保持**） 🆕

### 角度入力の詳細
- **手動入力**: 30, 45, 60, 90度など360の約数を直接入力
- **等分指定**: 2等分(180度)〜45等分(8度)の17選択肢から選択
- 等分指定では浮動小数点の精度問題を回避し、正確な角度を保証

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照

---

Made with ❤️ by [hiroshitakeda](https://github.com/hiroshitakeda)