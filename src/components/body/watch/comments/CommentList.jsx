import Comment from "./Comment";

export default function CommentList({ data }) {
  console.log("HEY", data);
  return (
    <div>
      {data.map((comment, index) => {
        return <Comment key={index} data={comment} />;
      })}
    </div>
  );
}
