#!/bin/bash

# xbar GitHub PR Status スクリプトのインストール

# 引数チェック
if [ $# -eq 0 ]; then
    echo "エラー: GitHub tokenが指定されていません"
    echo "使用方法: $0 <github_token>"
    exit 1
fi

GITHUB_TOKEN="$1"

# xbarのプラグインディレクトリのデフォルトパス
XBAR_PLUGIN_DIR="$HOME/Library/Application Support/xbar/plugins"

# スクリプトファイル名
SCRIPT_NAME="github.10m.ts"

# プラグインディレクトリの存在確認と作成
if [ ! -d "$XBAR_PLUGIN_DIR" ]; then
    echo "xbarのプラグインディレクトリが見つかりません: $XBAR_PLUGIN_DIR"
    echo "ディレクトリを作成しています..."
    mkdir -p "$XBAR_PLUGIN_DIR"
    if [ $? -eq 0 ]; then
        echo "✓ ディレクトリを作成しました: $XBAR_PLUGIN_DIR"
    else
        echo "エラー: ディレクトリの作成に失敗しました"
        exit 1
    fi
fi

# GitHubからスクリプトをダウンロード
echo "GitHub PR Statusスクリプトをダウンロード中..."
curl -L -o "$XBAR_PLUGIN_DIR/$SCRIPT_NAME" "https://raw.githubusercontent.com/haradakunihiko/xbar/main/src/github.10m.ts"

# ダウンロードの成功確認
if [ $? -eq 0 ]; then
    # 実行権限を付与
    chmod +x "$XBAR_PLUGIN_DIR/$SCRIPT_NAME"
    
    # vars.jsonファイルを作成
    VARS_FILE="$XBAR_PLUGIN_DIR/${SCRIPT_NAME}.vars.json"
    echo "{" > "$VARS_FILE"
    echo "    \"VAR_GITHUB_TOKEN\": \"$GITHUB_TOKEN\"" >> "$VARS_FILE"
    echo "}" >> "$VARS_FILE"
    
    echo "✓ インストール完了: $XBAR_PLUGIN_DIR/$SCRIPT_NAME"
    echo "✓ 設定ファイル作成: $VARS_FILE"
    echo ""
    echo "次のステップ:"
    echo "1. xbarを再起動する"
    echo "2. メニューバーに追加されたアイコンを確認"
else
    echo "エラー: スクリプトのダウンロードに失敗しました"
    exit 1
fi
