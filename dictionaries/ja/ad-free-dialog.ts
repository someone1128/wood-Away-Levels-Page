export const adFreeDialog = {
  title: "広告を削除",
  description: {
    signedOut:
      "ログインして広告を削除できます。ログイン後、月額4.99ドルで広告なしの体験をお楽しみいただけます。注：Wood Awayは第三者のプラットフォームで、DeepSeekとは提携していません。",
    signedIn:
      "月額4.99ドルで広告なしの体験をお楽しみください。いつでもキャンセル可能で、購読期間中は広告なしのサービスを継続してご利用いただけます。注：Wood Awayは第三者のプラットフォームで、DeepSeekとは提携していません。",
  },
  buttons: {
    maybeLater: "後で",
    subscribe: "今すぐ購読",
    processing: "処理中...",
    signIn: "ログイン",
  },
} as const;
