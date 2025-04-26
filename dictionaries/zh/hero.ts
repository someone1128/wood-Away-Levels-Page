

export const hero = {
  badge: "游戏攻略大全",
  title: "查看 Wood Away 所有关卡攻略",
  description:
    "探索每个房间关卡的详细通关教程、技巧和策略，输入关卡编号可直接跳转到对应攻略。",
  stats: {
    guides: "+ 关卡攻略",
    videoTutorials: `500+ 视频教程`,
    quickSearch: "快速关卡搜索",
  },
  search: {
    placeholder: `输入关卡编号 (1-500)`,
    button: "搜索攻略",
    error: {
      invalid: "请输入有效的关卡编号",
      notFound: "未找到该关卡的攻略",
    },
  },
  buttons: {
    browseAll: "浏览所有关卡攻略",
    downloadGame: "下载 Wood Away",
  },
  downloadCard: {
    title: "下载 Wood Away",
    description: "开启一段烧脑益智的方块消除之旅！",
  },
  videoSection: {
    title: "Wood Away 攻略视频",
    description: "观看详细的 Wood Away 视频教程，学习通关技巧",
  },
} as const;

export default hero;
