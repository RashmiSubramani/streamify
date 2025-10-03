import { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../../../../utils/constants";
import { VideoCard } from "./VideoCard";
import { Link } from "react-router-dom";

export function VideoContainer() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getVideos();
  }, []);

  async function getVideos() {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    console.log(json);
    setVideos(json.items);
  }

  return (
    <div className="flex flex-wrap text-white">
      {videos.map((video) => (
        <Link to={`/watch?v=${video.id}`} key={video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
}
