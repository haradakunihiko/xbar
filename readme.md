[xbar](https://xbarapp.com/)のplugin


## install

### mac

1. denoをインストール
2. `src` 以下のファイルを `Library/Application Support/xbar/plugins` 以下にコピー
3. `package.json`, `package-lock.json` を `Library/Application Support/xbar` 以下にコピー
4. `Library/Application Support/xbar` で `npm install` を行う


#### 参考
- https://github.com/denoland/deno
- https://deno.land/x/xbar@v2.1.0


## plugin

### github

githubのissueを表示します。

- 自分の作成したPR
- 自分にレビューアサインされたPR
- 自分にアサインされたPR

#### 設定

xbar > Open plugins... を開く

<img width="734" alt="スクリーンショット 2022-07-05 20 52 57" src="https://user-images.githubusercontent.com/4531125/177322388-dab90841-0472-4fc9-8715-b9db5ffb2624.png">

Github tokenを設定する

<img width="856" alt="スクリーンショット 2022-07-05 20 53 12" src="https://user-images.githubusercontent.com/4531125/177322401-0d1793c8-e287-4c60-a038-1de09c4f7abd.png">

再読み込みを行う
