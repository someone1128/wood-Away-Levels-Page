export const common = {
  buttons: {
    submit: "送信",
    cancel: "キャンセル",
    confirm: "確認",
    back: "戻る",
    next: "次へ",
    save: "保存",
    delete: "削除",
    edit: "編集",
    view: "表示",
    download: "ダウンロード",
    close: "閉じる",
  },
  messages: {
    loading: "読み込み中...",
    success: "操作が成功しました",
    error: "エラーが発生しました",
    confirm: "実行してもよろしいですか？",
    required: "この項目は必須です",
    invalidInput: "入力が無効です",
  },
  navigation: {
    home: "ホーム",
    about: "概要",
    contact: "お問い合わせ",
    features: "機能",
    guides: "ガイド",
    settings: "設定",
  },
  activePlayers: "アクティブプレイヤー",
  countries: "対応国",
  userRating: "ユーザー評価",
  localeSuggest: {
    switchToTitle: "{langName}に切り替えますか？",
    currentLangDesc: "現在の言語は{langName}です。",
    dismissPermanent: "今後表示しない",
    switchToAlt: "{langName}に切り替える",
    switchToButton: "切り替え",
  },
} as const;

export default common;
