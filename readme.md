# GitHub Issues Xbar Plugin

これは、GitHub の Issue や Pull Request をメニューバーに表示するための [Xbar](https://xbarapp.com/) プラグインです。

以下の情報を表示できます。

*   あなたが作成した Pull Request
*   あなたにレビューが割り当てられた Pull Request
*   あなたにアサインされた Issue および Pull Request

## 特徴

*   メニューバーから素早く GitHub のタスクを確認できます。
*   Deno で書かれており、設定も簡単です。

## 前提条件

*   [Deno](https://deno.land/) がインストールされていること。

## インストール

1.  このリポジトリをクローンするか、`github.10m.ts` ファイルをダウンロードします。
2.  `github.10m.ts` ファイルを Xbar のプラグインディレクトリに配置します。以下のいずれかの方法で行います。
    *   **シンボリックリンクを作成する (推奨):**
        ターミナルで以下のコマンドを実行します。`<path_to_plugin_directory>` は、`github.10m.ts` がある `src` ディレクトリの実際のパスに置き換えてください。
        ```bash
        ln -s <path_to_plugin_directory>/src/github.10m.ts ~/Library/Application\ Support/xbar/plugins/github.10m.ts
        ```
    *   **ファイルを直接コピーする:**
        `github.10m.ts` ファイルを `~/Library/Application Support/xbar/plugins/` ディレクトリにコピーします。

## 設定

1.  メニューバーの Xbar アイコンをクリックし、「Open plugins...」を選択します。

    <img width="734" alt="スクリーンショット 2022-07-05 20 52 57" src="https://user-images.githubusercontent.com/4531125/177322388-dab90841-0472-4fc9-8715-b9db5ffb2624.png">

2.  表示されたプラグイン一覧の中から `github.10m.ts` を見つけ、設定を行います。
    *   **GitHub Token の設定:** プラグインが GitHub API にアクセスするために必要な個人アクセストークンを設定します。トークンは [GitHub の設定ページ](https://github.com/settings/tokens) から作成できます。必要なスコープは `repo` (プライベートリポジトリを含む場合) または `public_repo` (パブリックリポジトリのみの場合) です。

    <img width="856" alt="スクリーンショット 2022-07-05 20 53 12" src="https://user-images.githubusercontent.com/4531125/177322401-0d1793c8-e287-4c60-a038-1de09c4f7abd.png">

3.  設定後、Xbar メニューから「Refresh all plugins」を選択するか、個別のプラグインメニューから「Refresh」を選択してプラグインを再読み込みします。

## 貢献

バグ報告や機能リクエストは、Issue または Pull Request でお願いします。
