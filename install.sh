#!/bin/bash

# xbar GitHub PR Status スクリプトのインストール

# xbarのプラグインディレクトリのデフォルトパス
XBAR_PLUGIN_DIR="$HOME/Library/Application Support/xbar/plugins"

# スクリプトファイル名
SCRIPT_NAME="github.10m.ts"

# プラグインディレクトリの存在確認
if [ ! -d "$XBAR_PLUGIN_DIR" ]; then
    echo "エラー: xbarのプラグインディレクトリが見つかりません: $XBAR_PLUGIN_DIR"
    echo "xbarがインストールされていることを確認してください。"
    exit 1
fi

# GitHubからスクリプトをダウンロード
echo "GitHub PR Statusスクリプトをダウンロード中..."
curl -L -o "$XBAR_PLUGIN_DIR/$SCRIPT_NAME" "https://raw.githubusercontent.com/haradakunihiko/xbar/main/src/github.10m.ts"

# ダウンロードの成功確認
if [ $? -eq 0 ]; then
    # 実行権限を付与
    chmod +x "$XBAR_PLUGIN_DIR/$SCRIPT_NAME"
    echo "✓ インストール完了: $XBAR_PLUGIN_DIR/$SCRIPT_NAME"
    echo ""
    echo "次のステップ:"
    echo "1. xbarを再起動する"
    echo "2. メニューバー追加された赤丸をクリック"
    echo "3. xbar > Open plugin... 選択して設定を開く"
    echo "4. Github tokenを設定する"
    echo "5. xbarを再起動する"
else
    echo "エラー: スクリプトのダウンロードに失敗しました"
    exit 1
fi
