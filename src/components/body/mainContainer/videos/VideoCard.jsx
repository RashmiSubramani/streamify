import { formatCount, formatTime } from "../../../../utils/formatCount";

export function VideoCard({ info }) {
  const { channelTitle, title, publishedAt, thumbnails } = info.snippet;
  const { commentCount, favoriteCount, likeCount, viewCount } = info.statistics;
  return (
    <div className="p-2 m-4 w-72  shadow-lg shadow-red-500/50 flex flex-col gap-1 rounded-lg">
      <img
        src={thumbnails.medium.url}
        alt={"thumbnail"}
        className="rounded-xl"
      />
      <div className="font-bold">{title}</div>
      <div className="text-sm text-gray-400">{channelTitle}</div>
      <div className="flex gap-2 text-sm text-gray-400">
        <span>{formatCount(viewCount)}</span>
        <span>{formatTime(publishedAt)}</span>
      </div>
    </div>
  );
}
