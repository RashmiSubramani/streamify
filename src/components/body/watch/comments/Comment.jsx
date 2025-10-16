import { useState } from "react";
import { YOUTUBE_REPLIES_API } from "../../../../utils/constants";
import CommentList from "./CommentList";

const DEFAULT_USER_ICON =
  "https://us.123rf.com/450wm/tifani1/tifani11801/tifani1180100029/93019841-user-icon-vector-illustration-isolated-on-black.jpg?ver=6";

export default function Comment({ data }) {
  const { snippet } = data;
  const { topLevelComment } = snippet;
  const { id } = topLevelComment;
  const { snippet: commentSnippet } = topLevelComment;
  const { authorDisplayName, authorProfileImageUrl, textDisplay, likeCount } =
    commentSnippet;

  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);

  async function getReplies() {
    if (showReplies) {
      setShowReplies(false);
      return;
    }
    try {
      const data = await fetch(`${YOUTUBE_REPLIES_API}&parentId=${id}`);
      const json = await data.json();
      setReplies(json.items || []);
      setShowReplies(true);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  }

  return (
    <div className="flex gap-3 bg-gray-100 dark:bg-[#0f0f0f] border border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700 transition-all duration-200 m-2 p-4 rounded-2xl w-full shadow-md shadow-gray-300/20 dark:shadow-black/20">
      <img
        src={authorProfileImageUrl || DEFAULT_USER_ICON}
        alt="user"
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <p className="font-semibold text-gray-800 dark:text-gray-100">{authorDisplayName}</p>
        <p
          className="text-gray-600 dark:text-gray-300 leading-relaxed mt-1"
          dangerouslySetInnerHTML={{ __html: textDisplay }}
        />
        <div className="mt-2 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          {likeCount > 0 && <span>👍 {likeCount}</span>}
          {snippet.totalReplyCount > 0 && (
            <button
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              onClick={getReplies}
            >
              {showReplies
                ? "Hide replies"
                : `View replies (${snippet.totalReplyCount})`}
            </button>
          )}
        </div>

        {showReplies && (
          <div className="mt-3 border-l-2 border-gray-400 dark:border-gray-700 pl-4">
            <CommentList data={replies} isReply />
          </div>
        )}
      </div>
    </div>
  );
}
