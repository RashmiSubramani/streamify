import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GOOGLE_API_KEY } from "../../../../utils/constants";
import { VideoCard } from "./VideoCard";
import { Link } from "react-router-dom";

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const searchQuery = searchParams.get("search_query");

  useEffect(() => {
    getVideosBySearchTerm();
  }, [searchQuery]);

  async function getVideosBySearchTerm() {
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchQuery}&key=${GOOGLE_API_KEY}`
    );
    const json = await data.json();
    setVideos(json.items);
  }

  return (
    <div className="w-full">
      {/* Search Results Grid - Responsive layout matching VideoContainer */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 p-4 bg-white dark:bg-black text-gray-900 dark:text-white w-full transition-colors duration-200">
        {videos
          ?.filter((video) => video.id.kind === "youtube#video")
          .map((video) => (
            <Link to={`/watch?v=${video.id.videoId}`} key={video.id.videoId}>
              <VideoCard info={video} />
            </Link>
          ))}
      </div>

      {/* Empty state when no videos found */}
      {(!videos || videos.length === 0) && (
        <div className="text-center py-8 text-gray-400 dark:text-gray-600">
          <p>No videos found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
