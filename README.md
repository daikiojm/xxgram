# xxgram

![xxgram](https://github.com/daikiojm/xxgram/blob/master/xxgram.png)

## xxgram is 何

インスタ映えしない写真を共有するサービス
(名前を変更できる機能があるので何グラムにもなりうる)

## スタック

### サーバーサイド

#### フレームワーク
* Express 4.15.2

#### DB
* mongodb

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
* react-icons

※ httpまわりはfetchAPIを使用した

### そのた

* concurrently

## 画面一覧

- ホーム(/) 
  - 投稿の一覧
  - いいね
  - コメント
- 投稿(/post)
  - 投稿する
- 設定(/config)
  - アプリ名の変更
    - サーバー側への保存は未実装
- ログイン(/login)
  - username, passwordによるログイン
- 登録(/signup)
  - username, passwordによる登録


## API

### feed(一覧取得)
ユーザーごとに取得できるフィードを変更できる機能とかはない

>api/feed (GET)

### photo
写真の投稿

>api/photo (POST)

### post
写真キャプションの投稿

>api/post (POST)

### like(いいね→インスタバエしないね)
いいね関連

いいね
>api/like/create (POST)

いいね取り消し
>api/like/delete (POST)

### comment(コメント)
post_idを指定してコメントを投稿する

>api/comment (POST)

## スキーマ 
mongooseで定義しているmongodbのスキーマは以下の通り

### User
ユーザー情報の登録を行う

### Posts
全部このコレクションに突っ込む(コメント、いいねも含めて)


## 参考リンクとか

* [node.js/expressでユーザ認証with JWT](https://qiita.com/AkihiroTakamura/items/ac4f1d3ec32effdd63d2)

* [How to get "create-react-app" to work with your API](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)

* [サルでも分かるExpressでのjsonAPIサーバーの作り方](https://qiita.com/leafia78/items/73cc7160d002a4989416)

* [JSON Web Tokenを使ってReactとReduxのSPAでログイン認証をする](https://qiita.com/nabeliwo/items/ac4b77324a9989e8e6bb#_reference-6d68b05525b15699dd4c)

* [react-router v4 のログイン処理](https://qiita.com/doruji/items/4dbc96554d8ed77aed02)

* [React Routerで認証を制御する方法](https://qiita.com/suin/items/b7275ff3eb3486380c7e)

## 起動方法

### mongodb

```
$ mongodb="sudo mongod --dbpath /var/lib/mongodb --logpath /var/log/mongodb.log"
```

※ 予めmongodbがインストールされていること

### xxxgram本体

```
$ npm start
```
