import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../../utils/chatSlice";
import { GOOGLE_API_KEY } from "../../../../utils/constants";

export default function LiveChat({ liveChatId }) {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    if (!liveChatId) return;

    const interval = setInterval(() => {
      getLiveChat();
    }, 2000);

    return () => clearInterval(interval);
  }, [liveChatId]);

  async function getLiveChat() {
    try {
      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet,authorDetails&key=${GOOGLE_API_KEY}`
      );
      const json = await res.json();

      if (json.items?.length) {
        dispatch(addMessage(json.items));
      }
    } catch (err) {
      console.error("Error fetching live chat:", err);
    }
  }

  const visibleMessages = chatMessages.slice(-30); // optionally keep fewer in DOM

  return (
    <div className="flex flex-col h-full text-gray-200">
      <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
        Live Chat
      </h2>

      {/* Chat Window */}
      <div className="w-full h-[600px] ml-2 p-3 border border-gray-700 bg-[#1e1e1e] rounded-xl overflow-y-scroll flex flex-col shadow-lg scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <div className="flex flex-col space-y-2">
          {visibleMessages.map((c, i) => (
            <ChatMessage
              key={i}
              name={c.authorDetails?.displayName}
              message={c.snippet?.displayMessage}
              profileImageUrl={c.authorDetails?.profileImageUrl}
            />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <form
        className="flex items-center w-full p-3 ml-2 mt-3 bg-[#121212] border border-gray-700 rounded-xl shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          if (!liveMessage.trim()) return;

          dispatch(
            addMessage({
              authorDetails: { displayName: "Rashmi" },
              snippet: { displayMessage: liveMessage },
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          className="flex-grow bg-[#2a2a2a] text-gray-100 placeholder-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          type="text"
          placeholder="Type your message..."
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button
          type="submit"
          className="ml-3 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          Send
        </button>
      </form>
    </div>
  );
}
