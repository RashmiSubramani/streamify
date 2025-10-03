import CommentList from "./CommentList";

export default function Comment({ data }) {
  const { name, text, replies } = data;
  console.log("REPLY", replies);
  return (
    <div className="flex gap-2 bg-gray-900 m-2 p-4 rounded-lg w-full ">
      <img
        src="https://us.123rf.com/450wm/tifani1/tifani11801/tifani1180100029/93019841-user-icon-vector-illustration-isolated-on-black.jpg?ver=6"
        alt="user"
        className="h-14 rounded-full"
      />
      <div>
        <p className="font-bold">{name}</p>
        <p>{text}</p>
        <p>
          {replies?.length > 0 && (
            <div className="border border-l-white pl-5 ml-5">
              <CommentList data={replies} />
            </div>
          )}
        </p>
      </div>
    </div>
  );
}
