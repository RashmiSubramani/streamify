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
    <div className="flex flex-wrap text-white">
      {videos
        .filter((video) => video.id.kind === "youtube#video")
        .map((video) => (
          <Link to={`/watch?v=${video.id.videoId}`} key={video.id.videoId}>
            <VideoCard info={video} />
          </Link>
        ))}
    </div>
  );
}
