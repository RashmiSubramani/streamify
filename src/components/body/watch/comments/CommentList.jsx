import Comment from "./Comment";
import Reply from "./Reply";

export default function YouTubeCommentList({ data, isReply }) {
  if (!data?.length) {
    return (
      <div className="text-gray-500 dark:text-gray-400 italic mt-2">
        {isReply ? "No replies yet." : "No comments yet."}
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${isReply ? "ml-12 mt-2 space-y-3" : "space-y-4"}`}>
      {data.map((comment) =>
        isReply ? (
          <Reply key={comment.id} data={comment} />
        ) : (
          <Comment key={comment.id} data={comment} />
        )
      )}
    </div>
  );
}
