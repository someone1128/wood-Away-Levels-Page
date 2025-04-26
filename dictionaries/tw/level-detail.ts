

export const levelDetail = {
  breadcrumb: {
    levelList: "關卡列表",
  },
  notFound: {
    title: "關卡未找到",
    description: "抱歉，您要查找的關卡不存在",
    backToList: "返回關卡列表",
  },
  levelNumber: "關卡",
  levelRange: {
    prefix: "第",
    suffix: "天",
  },
  meta: {
    title: `Wood Away 第 {{level}} 關 - 遊戲指南與攻略 - Wood Away {{level}} & 影片提示`,
    description: `Wood Away {{level}}, Wood Away 第 {{level}} 關完整指南，提供詳細的解謎技巧、方塊移動策略和影片攻略。幫助您輕鬆消除所有方塊，成功通關。`,
    siteName: "Wood Away 官方攻略站",
    invalidId: {
      title: "無效的關卡編號",
      description: `請輸入有效的關卡編號（1-500）`,
    },
    notFound: {
      title: "關卡不存在",
      description: "您訪問的關卡不存在，請選擇其他關卡",
    },
    langNotFound: {
      title: "語言包未找到",
      description: "當前語言的翻譯內容未找到，請切換其他語言",
    },
  },
} as const;

export default levelDetail;
