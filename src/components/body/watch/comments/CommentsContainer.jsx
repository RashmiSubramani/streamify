import CommentList from "./CommentList";

export default function CommentsContainer() {
  const commentsData = [
    {
      name: "Rashmi",
      text: "Lorem ipsum",
      replies: [],
    },
    {
      name: "Aasha",
      text: "Lorem ipsum",
      replies: [
        { name: "Pradeep", text: "Hey there", replies: [] },
        { name: "Aarav", text: "hello there", replies: [] },
      ],
    },
    {
      name: "Michael",
      text: "Lorem ipsum",
      replies: [
        {
          name: "Nova",
          text: "I am Nova",
          replies: [{ name: "Elora", text: "hello there", replies: [] }],
        },
      ],
    },
  ];
  return (
    <div className="text-white m-5 p-2">
      <h1>Comments</h1>
      <CommentList data={commentsData} />
    </div>
  );
}
