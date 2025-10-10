import { formatCount, formatTime } from "../../../../utils/formatCount";
import { useNavigate } from "react-router-dom";

export function VideoCard({ info }) {
  const { channelTitle, title, publishedAt, thumbnails } = info?.snippet;
  const viewCount = info?.statistics?.viewCount;
  const navigate = useNavigate();

  const handleVideoClick = () => {
    // Handle different video ID formats
    const videoId = info.id?.videoId || info.id;
    if (videoId) {
      navigate(`/watch?v=${videoId}`);
    }
  };

  return (
    <div 
      className="p-2 w-full shadow-lg shadow-red-500/50 flex flex-col gap-1 rounded-lg h-full cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={handleVideoClick}
    >
      <img
        src={thumbnails.medium.url}
        alt={"thumbnail"}
        className="rounded-xl w-full"
      />
      <div className="font-bold">{title}</div>
      <div className="text-sm text-gray-400">{channelTitle}</div>
      <div className="flex gap-2 text-sm text-gray-400">
        {viewCount && <span>{formatCount(viewCount)}</span>}
        <span>{formatTime(publishedAt)}</span>
      </div>
    </div>
  );
}
