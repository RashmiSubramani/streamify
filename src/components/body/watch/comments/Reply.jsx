const DEFAULT_USER_ICON =
  "https://us.123rf.com/450wm/tifani1/tifani11801/tifani1180100029/93019841-user-icon-vector-illustration-isolated-on-black.jpg?ver=6";

export default function YouTubeReply({ data }) {
  const { snippet } = data;
  const { authorDisplayName, authorProfileImageUrl, textDisplay } = snippet;

  return (
    <div className="flex gap-2 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 p-3 rounded-xl w-full">
      <img
        src={authorProfileImageUrl || DEFAULT_USER_ICON}
        alt="user"
        className="h-8 w-8 rounded-full object-cover"
      />
      <div className="flex-1">
        <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
          {authorDisplayName}
        </p>
        <p
          className="text-gray-600 dark:text-gray-400 text-sm mt-1"
          dangerouslySetInnerHTML={{ __html: textDisplay }}
        />
      </div>
    </div>
  );
}
