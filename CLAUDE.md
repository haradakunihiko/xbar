# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

GitHubのIssue・Pull RequestをmacOSメニューバーに表示するXbarプラグイン。Deno版とNode.js版の2つの実装が存在する。

## 開発コマンド

### 依存関係のインストール（Node.js版のみ）
```bash
npm install
```

### プラグインの実行確認

**Deno版:**
```bash
deno run --allow-net=api.github.com --allow-env src/github.10m.ts
```

**Node.js版:**
```bash
node src/github.10m.js
```

### Xbarプラグインとしてのインストール
```bash
# シンボリックリンクを作成（推奨）
ln -s $(pwd)/src/github.10m.ts ~/Library/Application\ Support/xbar/plugins/github.10m.ts
```

## アーキテクチャ

### ディレクトリ構造
- `src/github.10m.ts` - Deno版実装（TypeScript）
- `src/github.10m.js` - Node.js版実装（JavaScript）
- `src/github.10m.js.vars.json` - 設定ファイル（GitHub token等）

### 主要な機能フロー
1. GitHub APIから以下の情報を取得:
   - 自分が作成したPull Request
   - レビューが割り当てられたPull Request
   - アサインされたIssue/Pull Request
2. リポジトリごとにグループ化
3. マイルストーンごとにサブグループ化
4. Xbarメニュー形式で出力

### 環境変数
- `VAR_GITHUB_TOKEN` - GitHub Personal Access Token（必須）
  - 必要なスコープ: `repo`（プライベートリポジトリ）または`public_repo`（パブリックリポジトリのみ）

### 技術的な注意点
- Xbarプラグインは10分ごとに自動実行される（ファイル名の`.10m`部分で指定）
- Deno版はシェバンに特殊なパス解決を使用（`-S -P/${HOME}/.deno/bin:/opt/homebrew/bin`）
- PRステータス表示機能はGitHub GraphQL APIを併用（ハイブリッドアプローチ）
  - Search API: PR・Issue一覧取得
  - GraphQL API: PRのCI/CDステータス取得
- ステータスアイコン:
  - ✅ SUCCESS: 緑のチェック（CI成功）
  - ❌ FAILURE: 赤のX（CI失敗）
  - ⏳ PENDING: 黄色の時計（CI実行中）
  - ⚠️ ERROR: 灰色の警告（CIエラー）