
# plugin

## github

githubのissueを表示します。

- 自分の作成したPR
- 自分にレビューアサインされたPR
- 自分にアサインされたPR

### install

- ファイルをコピー

```
cp ./src/github.10m.js* ~/Library/Application Support/xbar/plugins
cp ./package.json ~/Library/Application Support/xbar
cp ./package-lock.json ~/Library/Application Support/xbar
```

必要に応じて、 `github.10m.js` の `#!/usr/local/bin/node` を適宜環境に合わせて変更する。

- libraryインストール

```
cd ~/Library/Application Support/xbar
npm install
```

### 設定

メニューバーより、 xbar > Open plugins... を開く

<img width="734" alt="スクリーンショット 2022-07-05 20 52 57" src="https://user-images.githubusercontent.com/4531125/177322388-dab90841-0472-4fc9-8715-b9db5ffb2624.png">

Github tokenを設定する

<img width="856" alt="スクリーンショット 2022-07-05 20 53 12" src="https://user-images.githubusercontent.com/4531125/177322401-0d1793c8-e287-4c60-a038-1de09c4f7abd.png">

※ 直接　`github.10m.js.vars.json` を更新してもよい

再読み込みを行う


# 開発メモ
tsバージョンはDenoを利用しているため、 https://deno.land/x/xbar@v2.1.0 を参考にdenoをインストールすると実行できる。
