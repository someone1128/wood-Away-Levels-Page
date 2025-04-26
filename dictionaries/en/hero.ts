

export const hero = {
  badge: "Game Guides Collection",
  title: "View All Wood Away Level Guides",
  description:
    "Explore detailed walkthroughs, tips, and strategies for each block puzzle level. Enter a level number to jump directly to the corresponding guide.",
  stats: {
    guides: "+ Level Guides",
    videoTutorials: `500+ Video Tutorials`,
    quickSearch: "Quick Level Search",
  },
  search: {
    placeholder: `Enter level number (1-500)`,
    button: "Search Guide",
    error: {
      invalid: "Please enter a valid level number",
      notFound: "No guide found for this level",
    },
  },
  buttons: {
    browseAll: "Browse All Level Guides",
    downloadGame: "Download Wood Away",
  },
  downloadCard: {
    title: "Download Wood Away",
    description: "Begin a brain-teasing journey of block clearing!",
  },
  videoSection: {
    title: "Wood Away Strategy Videos",
    description:
      "Watch detailed Wood Away video tutorials to learn clearing techniques",
  },
} as const;

export default hero;
