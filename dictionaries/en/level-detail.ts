

export const levelDetail = {
  breadcrumb: {
    levelList: "Level List",
  },
  notFound: {
    title: "Level Not Found",
    description: "Sorry, the level you are looking for does not exist",
    backToList: "Back to Level List",
  },
  levelNumber: "Level",
  levelRange: {
    prefix: "Day",
    suffix: "",
  },
  meta: {
    title: `Wood Away Level {{level}} - Game Guide and Walkthrough - Wood Away Level {{level}} & Video Tips`,
    description: `Wood Away Level {{level}}, Complete guide for Wood Away Level {{level}}, providing detailed puzzle-solving tips, block movement strategies, and video walkthroughs. Help you easily clear all blocks and successfully pass the level.`,
    siteName: "Wood Away Official Guide",
    invalidId: {
      title: "Invalid Level Number",
      description: `Please enter a valid level number (1-500)`,
    },
    notFound: {
      title: "Level Does Not Exist",
      description:
        "The level you are trying to access does not exist, please select another level",
    },
    langNotFound: {
      title: "Language Pack Not Found",
      description:
        "Translation content for current language not found, please switch to another language",
    },
  },
} as const;

export default levelDetail;
