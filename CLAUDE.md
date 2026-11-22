# Radial Circle PDF Generator

## プロジェクト概要
指定した直径の円と角度毎の放射線を描画し、PDF出力するWebアプリケーション

## 技術スタック
- **フロントエンド**: React.js + TypeScript
- **描画**: Canvas API
- **PDF生成**: PDF-lib
- **ビルドツール**: Vite

## 実装済み機能
✅ React + TypeScript環境構築
✅ プロジェクト構造作成
✅ 基本コンポーネント（InputForm, CanvasPreview, PDFGenerator）
✅ 角度バリデーション（360の約数チェック）
✅ Canvas描画機能
✅ PDF生成機能
✅ ビルド設定（相対パス対応）
✅ 静的ファイルサーバーでの動作確認
✅ 延長ライン機能（放射線を円周外に突き出し）
✅ 直径単位をmmに変更
✅ デフォルト値設定（直径:50mm、角度:30度、延長:10mm）
✅ 角度入力方式の排他選択UI（手動入力 or 等分指定）
✅ 360の約数による等分選択（2〜45等分、17選択肢）
✅ 改善されたユーザーインターフェース（色分け、説明文付き）
✅ 「再作成」ボタンでの前回入力値保持機能
✅ モダンなUIデザイン（グラデーション背景、カード型レイアウト）
✅ レスポンシブデザイン対応
✅ PDF寸法の正確な換算（1mm = 72/25.4pt）
✅ 印刷サイズ警告（直径＋延長×2 が200mm超で警告、生成は続行可）
✅ プレビューの自動縮尺（図全体がキャンバスに収まる）
✅ ESLint設定（.eslintrc.cjs）

## 現在の状況
- **基本機能**: 完成
- **UI/UX**: モダンデザインに全面刷新完了
- **値保持機能**: 再作成時の入力値保持機能完成
- **認証機能**: 削除済み（シンプルなアプリとして動作）
- **ビルド**: 正常動作（584KB、gzip: 228KB、CSS: 4.16KB）
- **依存関係**: Vite 6.4 / typescript-eslint 8、npm audit 脆弱性0件（2026-11-22時点）
- **静的サーバー**: Python HTTPサーバーで動作確認済み
- **開発サーバー**: Vite 6 更新後は `npm run dev` で起動・応答を確認済み

## 解決済み問題
1. ✅ TypeScript型エラー（noUnusedLocals設定調整）
2. ✅ ビルド時の絶対パス問題（vite.config.tsでbase設定）
3. ✅ CORS問題（相対パス化で解決）
4. ✅ Google認証問題（機能削除により解決）
5. ✅ 開発サーバー接続問題（静的サーバーで代替）

## 動作確認済みコマンド
```bash
# ビルド（正常動作）
npm run build

# 型チェック（エラーなし）
npm run type-check

# Lint（警告0）
npm run lint

# 静的サーバー起動（推奨）
python3 -m http.server 8888 --directory dist &

# アクセス
http://localhost:8888
```

## プロジェクト構造
```
src/
├── components/
│   ├── InputForm.tsx      # 入力フォーム（直径・角度・延長ライン）
│   ├── CanvasPreview.tsx  # Canvas描画プレビュー
│   └── PDFGenerator.tsx   # PDF生成・ダウンロード
├── utils/
│   ├── validation.ts      # 角度バリデーション（360の約数）
│   ├── dimensions.ts      # mm→pt換算・印刷上限(200mm)判定
│   └── pdfGeneration.ts   # PDF生成ロジック
├── types/
│   └── index.ts           # 型定義（CircleData）
├── App.tsx               # メインアプリ（認証なし）
└── main.tsx              # エントリーポイント
```

## 設定ファイル
- `vite.config.ts`: base='./'で相対パス設定
- `tsconfig.json`: noUnusedLocals=false
- `package.json`: React, TypeScript, Vite, PDF-lib

## アプリケーションの使用方法
1. `http://localhost:8888` にアクセス
2. 円の直径（mm）を入力（デフォルト：50mm）
3. 角度入力方式を選択：
   - **手動入力**：角度を直接入力（360の約数のみ有効、デフォルト：30度）
   - **等分指定**：360度のn等分を選択（デフォルト：12等分=30度）
4. 延長ライン長さ（mm）を入力（0-20の整数、デフォルト：10mm）
   - 直径＋延長×2 が200mm（A4幅−左右余白5mm）を超えると警告を表示（生成・保存は可能）
5. 「生成」ボタンでプレビュー表示
6. 「PDF保存」ボタンでPDFダウンロード
7. 「再作成」ボタンで入力画面に戻る（前回の入力値を保持）

### 角度入力の詳細
- **手動入力**: 30, 45, 60, 90度など360の約数を直接入力
- **等分指定**: 2等分(180度)〜45等分(8度)の17選択肢から選択
- 等分指定では浮動小数点の精度問題を回避し、正確な角度を保証

## 現在の状態
- **基本機能**: 完全動作
- **UI/UX**: モダンデザイン完成
- **値保持機能**: 完全動作
- **ビルドシステム**: 安定
- **サーバー**: 静的ファイルサーバーで動作
- **認証**: 不要（削除済み）
- **デプロイ**: Cloudflare Pages（https://radial-circle-pdf.pages.dev/）。GitHub連携でmainへのpushが自動デプロイ。ビルド: `npm run build` → `dist`、NODE_VERSION=22（2026-11-22にVercelから移行）
- **レスポンシブ**: モバイル対応完了