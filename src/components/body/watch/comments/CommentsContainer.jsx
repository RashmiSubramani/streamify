import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_COMMENTS_API } from "../../../../utils/constants";
import CommentList from "./CommentList";

export default function YouTubeCommentsContainer() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (videoId) getComments();
  }, [videoId]);

  async function getComments() {
    try {
      const data = await fetch(`${YOUTUBE_COMMENTS_API}&videoId=${videoId}`);
      const json = await data.json();
      setComments(json.items || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  return (
    <div className="text-gray-900 dark:text-white mt-4 px-4">
      <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        Comments ({comments?.length || 0})
      </h2>
      <CommentList data={comments} />
    </div>
  );
}
