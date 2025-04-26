"use client";
import YouTube from "react-youtube";
const getYouTubeVideoId = (url: string) => {
  const regExp =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1];
};
const YouTubeComponent = ({ url }: { url: string }) => {
  const videoId = getYouTubeVideoId(url);
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <div className="relative w-full">
      <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <YouTube
          videoId={videoId}
          opts={opts}
          className="absolute inset-0 h-full w-full"
          iframeClassName="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default YouTubeComponent;
