import { useSelector } from "react-redux";

import {
  FaHome,
  FaPlay,
  FaYoutube,
  FaHistory,
  FaList,
  FaUser,
  FaClock,
  FaThumbsUp,
  FaMusic,
  FaFootballBall,
  FaFilm,
  FaBroadcastTower,
  FaGamepad,
  FaNewspaper,
  FaBook,
  FaTshirt,
  FaCrown,
  FaVideo,
  FaHeadphones,
  FaChild,
  FaCog,
  FaRegFlag,
  FaQuestionCircle,
  FaCommentDots,
} from "react-icons/fa";

export const SIDEBAR_SECTIONS = [
  {
    title: null,
    items: [
      { name: "Home", icon: <FaHome /> },
      { name: "Shorts", icon: <FaPlay /> },
      { name: "Subscriptions", icon: <FaYoutube /> },
    ],
  },
  {
    title: "You",
    items: [
      { name: "History", icon: <FaHistory /> },
      { name: "Playlists", icon: <FaList /> },
      { name: "Your videos", icon: <FaVideo /> },
      { name: "Watch later", icon: <FaClock /> },
      { name: "Liked videos", icon: <FaThumbsUp /> },
    ],
  },
  {
    title: "Subscriptions",
    items: [
      { name: "Akshay Saini", icon: <FaUser /> },
      { name: "RoadSide Coder", icon: <FaUser /> },
      { name: "CNN News", icon: <FaNewspaper /> },
      { name: "Mr.Beast", icon: <FaUser /> },
    ],
  },
  {
    title: "Explore",
    items: [
      { name: "Music", icon: <FaMusic /> },
      { name: "Sports", icon: <FaFootballBall /> },
      { name: "Movies", icon: <FaFilm /> },
      { name: "Live", icon: <FaBroadcastTower /> },
      { name: "Gaming", icon: <FaGamepad /> },
      { name: "News", icon: <FaNewspaper /> },
      { name: "Courses", icon: <FaBook /> },
      { name: "Fashion", icon: <FaTshirt /> },
    ],
  },
  {
    title: "More from YouTube",
    items: [
      { name: "YouTube Premium", icon: <FaCrown /> },
      { name: "YouTube Studio", icon: <FaVideo /> },
      { name: "YouTube Music", icon: <FaHeadphones /> },
      { name: "YouTube Kids", icon: <FaChild /> },
    ],
  },
  {
    title: null,
    items: [
      { name: "Settings", icon: <FaCog /> },
      { name: "Report history", icon: <FaRegFlag /> },
      { name: "Help", icon: <FaQuestionCircle /> },
      { name: "Send feedback", icon: <FaCommentDots /> },
    ],
  },
];
export function SideBar() {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  if (!isMenuOpen) return null;

  return (
    <div className="text-white  h-screen overflow-y-auto sticky top-0 shadow-lg">
      {SIDEBAR_SECTIONS.map((section, idx) => (
        <div key={idx} className="px-4 py-3">
          {section.title && (
            <h2 className="font-bold mb-2 text-sm">{section.title}</h2>
          )}
          {/* <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li
                key={i}
                className="cursor-pointer px-2 py-1 rounded hover:bg-gray-800  transition-colors"
              >
                {item}
              </li>
            ))}
          </ul> */}
          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 cursor-pointer px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                {/* Render icon */}
                <span className="text-lg">{item.icon}</span>
                {/* Render text */}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
