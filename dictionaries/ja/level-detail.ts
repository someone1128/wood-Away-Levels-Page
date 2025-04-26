

export const levelDetail = {
  breadcrumb: {
    levelList: "レベル一覧",
  },
  notFound: {
    title: "レベルが見つかりません",
    description: "申し訳ありませんが、お探しのレベルは存在しません",
    backToList: "レベル一覧に戻る",
  },
  levelNumber: "レベル",
  levelRange: {
    prefix: "第",
    suffix: "日目",
  },
  meta: {
    title: `Wood Away レベル {{level}} 攻略ガイド`,
    description: `Wood Away レベル {{level}} の完全攻略ガイドです。クリア方法、ブロック移動戦略、そして Wood Away レベル {{level}} のヒントを提供します。このパズルを解き明かしましょう！Your guide for Wood Away!`,
    siteName: "Wood Away 公式攻略サイト",
    invalidId: {
      title: "無効なレベル番号",
      description: `有効なレベル番号を入力してください（1-500）`,
    },
    notFound: {
      title: "レベルが存在しません",
      description:
        "アクセスしようとしたレベルは存在しません。他のレベルを選択してください",
    },
    langNotFound: {
      title: "言語パックが見つかりません",
      description:
        "現在の言語の翻訳コンテンツが見つかりません。他の言語に切り替えてください",
    },
  },
} as const;

export default levelDetail;
