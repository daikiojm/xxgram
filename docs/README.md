# xxgram

## xxgram is 何

インスタ映えしない写真を共有するサービス
(サービス名をインスタバエしないグラムとかにしてもいいかも)

石川gramとかに名前を変更することもできる

## スタック

### サーバーサイド

#### フレームワーク
* Express 4.15.2

#### ライブラリとか
* mongoose
* multer
* uuid
* jsonwebtoken

### フロント

#### フレームワーク
* React + Redux

#### ライブラリとか
* react-redux
* redux-saga
* rebass
* moment

※httpまわりはfetchつかった

### そのた

* concurrently

## 画面一覧
画面は1画面に絞る
というのも、instagramを見ると、feedから写真一覧の閲覧と、コメントが出来るようになっているため、
最低限の機能を実装しようとすると、それ以外はいらない

- Home
  - 投稿の一覧
  - いいね
  - コメント
- 投稿
  - 投稿する
- 設定
  - アプリ名の変更
  - サーバー保存は未実装
- ログイン
  - username, passwordによるログイン
- 登録
  - username, passwordによる登録


## API

### feed(一覧取得)
ユーザーごとに取得できるフィードを変更できる機能は実装しない

>api/feed (GET)

### photo
写真の投稿

>api/photo (POST)

### post
写真キャプションの投稿

>api/post (POST)

### like(いいね→インスタバエしないね)
いいねをする

いいね
>api/like/create (POST)

いいね取り消し
>api/like/delete (POST)

### comment(コメント)
post_idを指定してコメントを投稿する

>api/comment (POST)

### 制限事項
とりあえず実装では、ユーザーはただ一人「石川」でいい気がしてきた。
余裕があれば、ユーザー登録登録、管理機能を実装する形


## 検討事項
/post APIでどのように画像アップロードするか
→form dataに載せるか、写真とキャプション部分を別にポストするか

images以下にusernameフォルダを作成してそこにUUIDを付けた画像を保存する

reactを使いたかったので、jadeの代わりにexpressのviewエンジンをjsxに変える
express-react-viewsというのがあったので、いっかい入れてみたが、ルーティングとか考えるの面倒だったからやめた

jwtによるユーザー認証を実装す予定だけど、
未認証状態だと、ゲストユーザーとして使えるという仕様でもいいかも
→よって、AuthかPublicかのルーティングは不要になり
各コンポーネント内で、storeの状態を判定してGestか登録済みユーザー化を振り分ける

feedとcommentでactionの定義は分けるけど、storeは共通

## 微妙なところ

* user登録は出来るが、api側でtokenの検証は行っていない
* mongodbのスキーマが1つにまとまっている
* フロント側もそれによって、辛いことになっている
* アイマスDB使えなかった

## コレクション 

### User
ユーザー情報の登録を行う

### Posts
全部このコレクションに突っ込む(コメント、いいねも含めて)


## 参考リンクとか

### Tools
[swagger](https://swagger.io/)
→ 使おうと思ったけどつらいからやめた

[node.js/expressでユーザ認証with JWT](https://qiita.com/AkihiroTakamura/items/ac4f1d3ec32effdd63d2)

[](https://qiita.com/leafia78/items/73cc7160d002a4989416)

[](https://qiita.com/nabeliwo/items/ac4b77324a9989e8e6bb#_reference-6d68b05525b15699dd4c)

[](https://qiita.com/doruji/items/4dbc96554d8ed77aed02)

[](https://qiita.com/suin/items/b7275ff3eb3486380c7e)
→今回はやらなかったけど、Reactで認証コンポーネントをやろうと思った際にはこのパターンが使えそう

ライブラリとか
https://github.com/expressjs/multer
http://jxnblk.com/rebass/props
→propsを見ると背景色の変更ほうほうとか詳しく載ってる

アイコンセット
https://gorangajic.github.io/react-icons/fa.html

## やったこと

プロジェクト作成
express --view=jade --git xxgram
cd xxgram
npm i
create-react-app client

開発サーバー同時起動するため
npm i concurrently --save-dev
npm i --save-dev nodemon

Express側で必要なパッケージのインストール
```
npm install mongoose@4.10.8 --save
npm install jsonwebtoken --save
npm install multer --save
npm install uuid --save
npm install mime-types --save
```

Express側とフロント側の連携設定

参考記事
https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/

フロント側で必要パッケージのインストール

npm install react-router-dom --save
npm i --save axios ←いったんfetchで代用してみる
npm i --save redux
npm i --save react-redux
npm install --save redux-saga

## メモ

同じディレクトリにあるレスポンスサンプルは更新してない...
