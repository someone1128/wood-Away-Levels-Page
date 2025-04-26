

export const hero = {
  badge: "ゲーム攻略大全",
  title: "Wood Away 攻略ガイド | 全レベル一覧",
  description:
    "Wood Away の各レベルの詳細な攻略法、コツ、戦略を探索しましょう。レベル番号を入力すると、対応するガイドに直接ジャンプできます。",
  stats: {
    guides: "+ レベル攻略",
    videoTutorials: `500+ ビデオチュートリアル`,
    quickSearch: "クイックレベル検索",
  },
  search: {
    placeholder: `レベル番号を入力 (1-500)`,
    button: "攻略を検索",
    error: {
      invalid: "有効なレベル番号を入力してください",
      notFound: "このレベルの攻略が見つかりません",
    },
  },
  buttons: {
    browseAll: "すべてのレベル攻略を閲覧",
    downloadGame: "Wood Away をダウンロード",
  },
  downloadCard: {
    title: "Wood Away をダウンロード",
    description: "頭脳を刺激するブロック除去の旅を始めましょう！",
  },
  videoSection: {
    title: "Wood Away 攻略ビデオ",
    description:
      "詳細な Wood Away ビデオチュートリアルを見て、クリアテクニックを学びましょう",
  },
} as const;

export default hero;
