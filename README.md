# Radial Circle PDF Generator

指定した直径の円と角度毎の放射線を描画し、PDF出力するWebアプリケーション

## 🌐 Demo

[Live Demo](https://radial-circle-pdf.pages.dev/) 🚀

## ✨ 機能

- 円の直径（mm）と角度を指定
- **2つの角度入力方式**
  - 手動入力：角度を直接指定（360の約数のみ）
  - 等分指定：360度のn等分を選択（2〜45等分）
- 延長ライン機能（放射線を円周外に突き出し）
- 印刷サイズ警告（直径＋延長×2 が200mmを超えると警告）
- Canvas描画プレビュー（図全体が収まるよう自動縮尺）
- PDF生成・ダウンロード
- 角度バリデーション（360の約数のみ）
- デフォルト値設定（直径:50mm、角度:30度、延長:10mm）
- **再作成時の入力値保持機能** 🆕
- **モダンUIデザイン**（グラデーション背景、カード型レイアウト） 🆕
- **アニメーション付きボタンとホバーエフェクト** 🆕
- レスポンシブデザイン（モバイル対応強化）

## 🛠 技術スタック

| 分類 | 技術 | バージョン | 用途・補足 |
|---|---|---|---|
| UI | [React](https://react.dev/) | 18.3 | 画面の構築。状態管理は `useState` のみで、外部ライブラリは使っていません |
| 言語 | [TypeScript](https://www.typescriptlang.org/) | 5.8 | `strict` モードで型チェック |
| ビルド | [Vite](https://vite.dev/) + `@vitejs/plugin-react` | 6.4 / 4.7 | 開発サーバーと本番ビルド。`base: './'` で相対パス出力 |
| 描画 | Canvas API | ブラウザ標準 | プレビューの描画。図全体がキャンバスに収まるよう自動で縮尺を調整 |
| PDF生成 | [pdf-lib](https://pdf-lib.js.org/) | 1.17 | A4縦（595×842pt）のPDFを生成。1mm = 72/25.4pt で換算し、実寸で出力 |
| スタイル | 素のCSS | - | `src/index.css` のみ。CSSフレームワークは使っていません |
| 静的解析 | ESLint + typescript-eslint | 8.57 / 8.x | `npm run lint`（警告0件を維持） |
| ホスティング | [Cloudflare Pages](https://pages.cloudflare.com/) | - | GitHub連携で、`main` へのpushごとに自動でビルド・デプロイ |

### 構成の特徴

- **完全にブラウザ内で完結**：サーバー、API、データベース、ログインはありません。入力した値や生成したPDFが外部に送信されることはありません
- **実行時の依存は最小限**：本番バンドルに含まれるのは React と pdf-lib だけです
- **静的ファイルとして配信**：`npm run build` で出力される `dist/` を置くだけで、どの静的ホスティングでも動きます

### 動作環境

- **Node.js**：22系を推奨（Cloudflare Pages のビルドも `NODE_VERSION=22` で実行）
- **ブラウザ**：Canvas API と ES2020 に対応したモダンブラウザ（Chrome / Edge / Safari / Firefox の最新版）

## 🚀 ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動（http://localhost:5173）
npm run dev

# 型チェック
npm run type-check

# Lint
npm run lint

# 本番ビルド（dist/ に出力）
npm run build

# ビルド結果の確認
npm run preview
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
│   ├── dimensions.ts      # mm→pt換算・印刷上限判定
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
   - 直径＋延長×2 が200mmを超えると警告を表示（生成・保存は可能）
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