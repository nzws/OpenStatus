# OpenStatus

> A Open-Source, Simple, JAMstack Service Status Page.

![image](https://i.imgur.com/ALrZ9eu.png)

> Live demo: https://status-live.knzk.me/

# Features

- Simple Status Page
- Show twitter embed (optional)
- Send status to discord (optional)

# Concept

- Very simple
- JAMstack, Serverless
- Unnecessary management
- Server monitoring only
  - Tell more information to users via Twitter etc.

# Required

- Static Website Hosting - Providing Web UI
  > ex: **Netlify** (recommended), Zeit Now, GitHub Pages, Firebase hosting etc
- [Cloud Firestore](https://firebase.google.com/docs/firestore) - Store the monitoring data
- [Google Apps Script](https://script.google.com) - Running the monitoring system

# Setup

todo: translate to English

## 1. Setup Cloud Firestore

- Go to [Firebase Console](https://console.firebase.google.com/).
- Create the new project.
- コンソールに移動後、 `開発 > Database` をクリックして、Firestore の管理画面に移動します。
- `データベースの作成` をクリックして、 `ロックモードで開始` を選択し、完了をクリックします。
- `ルール` タブに移動し、権限を下記のように変更します:

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read;
      allow write: if request.auth != null;
    }
  }
}
```

- 設定したら `公開` をクリックして反映させます。

## 2. 各種キーを取得

- Firebase Console 左上の設定ボタンから `プロジェクトの設定` に移動します。
- `全般` タブから次の情報をメモします:
  - **プロジェクト ID**
  - **ウェブ API キー**
- `サービス アカウント` タブに移動し、Firebase Admin SDK の `新しい秘密鍵の生成` をクリックして、json ファイルをダウンロードします。

## 3. Setup GAS

- [G Suite Developer Hub](https://script.google.com) にアクセスして、 `新規スクリプト` をクリックします。
- 新規スクリプトのページで `リソース > ライブラリ` を開き、ライブラリを追加の欄に `1VUSl4b1r1eoNcRWotZM3e87ygkxvXltOgyDZhixqncz9lQ3MjfT1iKFw` を追加してください。
  > ライブラリ: https://github.com/grahamearley/FirestoreGoogleAppsScript
- `FirestoreApp` のバージョン `22` を選び、保存してください。
- スクリプトのページに戻り、 `GAS/index.js` をそのままコピペしてください。
- `ファイル > プロジェクトのプロパティ > スクリプトのプロパティ` に下記を入れて保存してください。

| プロパティ                   | 値                                                |
| ---------------------------- | ------------------------------------------------- |
| `firebase_json`              | **Firebase Admin SDK の json をコピペ**           |
| `monitoring_list`            | 後述の json                                       |
| `discord_webhook` (Optional) | Discord 通知を有効にする場合、Discord Webhook URL |

`monitoring_list` には下記のように、名前と URL を指定したリストを作成してください。

```json
{
  "Web": {
    "url": "https://example.com/"
  },
  "Media": {
    "url": "https://files.example.com/"
  }
}
```

- `編集 > 現在のプロジェクトのトリガー` に移動し、下記のトリガーを追加してください。
  - 実行する関数: `load`
  - 実行するデプロイ: `Head`
  - イベントのソース: `時間主導型`
  - 時間ベースのトリガーのタイプ: `分ベースのタイマー`
  - 時間の間隔: `1分おき` または `5分おき`

# 4. Setup website (ex: netlify)

- [Fork it](https://github.com/yuzulabo/OpenStatus/fork).
- [Netlify](https://app.netlify.com/)に移動し、 `New site from Git` でフォークしたリポジトリを選択してください。
- ビルドの設定をしてください。
  - Build command: `yarn build`
  - Publish directory: `dist`
  - Advanced build settings

| Key                     | Value                                    |
| ----------------------- | ---------------------------------------- |
| `SITE_TITLE`            | site title                               |
| `TWITTER_ID` (optional) | twitter id                               |
| `FIREBASE_API_KEY`      | Firebase Console 上の**ウェブ API キー** |
| `FIREBASE_PROJECT_ID`   | 〃 **プロジェクト ID**                   |

![image](https://i.imgur.com/z29KJd9.png)

上記を設定して、ビルドすれば完了です！
