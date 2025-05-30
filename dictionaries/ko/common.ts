export const common = {
  buttons: {
    submit: "제출",
    cancel: "취소",
    confirm: "확인",
    back: "뒤로",
    next: "다음",
    save: "저장",
    delete: "삭제",
    edit: "편집",
    view: "보기",
    download: "다운로드",
    close: "닫기",
  },
  messages: {
    loading: "로딩 중...",
    success: "작업이 성공했습니다",
    error: "오류가 발생했습니다",
    confirm: "실행하시겠습니까?",
    required: "이 항목은 필수입니다",
    invalidInput: "잘못된 입력입니다",
  },
  navigation: {
    home: "홈",
    about: "소개",
    contact: "문의하기",
    features: "기능",
    pricing: "요금제",
    guides: "가이드",
    settings: "설정",
  },
  activePlayers: "활성 플레이어",
  countries: "서비스 국가",
  coffeeRecipes: "커피 레시피",
  userRating: "사용자 평가",
  localeSuggest: {
    switchToTitle: "{langName}(으)로 전환하시겠습니까?",
    currentLangDesc: "현재 언어는 {langName}입니다.",
    dismissPermanent: "다시 표시 안 함",
    switchToAlt: "{langName}(으)로 전환",
    switchToButton: "전환",
  },
} as const;

export default common;
