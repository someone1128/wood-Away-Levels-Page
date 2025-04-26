

export const hero = {
  badge: "遊戲攻略大全",
  title: "查看 Wood Away 所有關卡攻略",
  description:
    "探索每個方塊關卡的詳細通關教程、技巧和策略，輸入關卡編號可直接跳轉到對應攻略。",
  stats: {
    guides: "+ 關卡攻略",
    videoTutorials: `500+ 影片教學`,
    quickSearch: "快速關卡搜尋",
  },
  search: {
    placeholder: `輸入關卡編號 (1-500)`,
    button: "搜尋攻略",
    error: {
      invalid: "請輸入有效的關卡編號",
      notFound: "未找到該關卡的攻略",
    },
  },
  buttons: {
    browseAll: "瀏覽所有關卡攻略",
    downloadGame: "下載 Wood Away",
  },
  downloadCard: {
    title: "下載 Wood Away",
    description: "開啟一段燒腦益智的方塊消除之旅！",
  },
  videoSection: {
    title: "Wood Away 攻略影片",
    description: "觀看詳細的 Wood Away 影片教學，學習通關技巧",
  },
} as const;

export default hero;
