

export const levelDetail = {
  breadcrumb: {
    levelList: "레벨 목록",
  },
  notFound: {
    title: "레벨을 찾을 수 없습니다",
    description: "죄송합니다. 찾으시는 레벨이 존재하지 않습니다",
    backToList: "레벨 목록으로 돌아가기",
  },
  levelNumber: "레벨",
  levelRange: {
    prefix: "Day",
    suffix: "",
  },
  meta: {
    title: `Wood Away 레벨 {{level}} - 게임 공략 및 가이드 - Wood Away {{level}} & 비디오 팁`,
    description: `Wood Away {{level}}, Wood Away 레벨 {{level}} 완전 공략 가이드, 상세한 퍼즐 해결 팁, 블록 이동 전략, 비디오 가이드 제공. 모든 블록을 쉽게 제거하고 성공적으로 클리어하도록 도와드립니다.`,
    siteName: "Wood Away 공식 공략 사이트",
    invalidId: {
      title: "잘못된 레벨 번호",
      description: `유효한 레벨 번호를 입력해 주세요 (1-500)`,
    },
    notFound: {
      title: "레벨이 존재하지 않습니다",
      description:
        "접근하려는 레벨이 존재하지 않습니다. 다른 레벨을 선택해 주세요",
    },
    langNotFound: {
      title: "언어 팩을 찾을 수 없습니다",
      description:
        "현재 언어의 번역 내용을 찾을 수 없습니다. 다른 언어로 전환해 주세요",
    },
  },
} as const;

export default levelDetail;
