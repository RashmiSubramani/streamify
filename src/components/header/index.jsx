import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../utils/appSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../../utils/constants";
import { FaSearch } from "react-icons/fa";
import { cacheResults } from "../../utils/searchSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/streamify.png";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchCache = useSelector((store) => store.search);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    //Make an api call after every key press. But if the difference between 2 keypress is < 200ms, then cancel/decline the previous api call and make a new api call.
    /**
     * if searchTerm = "iphone"
     * searchCache = {
     *  "iphone":[ "iphone 11", "iphone 14"]
     * }
     * It is present in cache, so set that else make api call
     */
    const timer = setTimeout(() => {
      if (searchCache[searchTerm]) {
        setSuggestions(searchCache[searchTerm]);
      } else {
        debounceSearch();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  //SCENARIO 1 :
  //If I press searchterm as "i" in search text, - onChange is called - state variable updates
  //    - it will render the component,
  //    - call useEffect,
  //    - start timer --> make api call AFTER 200ms
  //If I press searchTerm as "ip" in search text EVEN BEFORE 200ms,
  //    - reconcillation will happen
  //    - cleanup function of previous useEffect will run, (So even before 200ms, it just clears the timer up)
  //    - it will again re-render component,
  //    - call useeffect
  //    - start NEW timer --> make api call AFTER 200ms

  //SCENARIO 2:
  //If I press searchterm as "i" in search text,
  //    - it will render the component,
  //    - call useEffect,
  //    - start timer --> make api call AFTER 200ms
  //If I press searchTerm as "ip" in search text AFTER 200ms,
  //    - it will automatically make an API call

  async function debounceSearch() {
    if (!searchTerm.trim()) return;
    const data = await fetch(`${YOUTUBE_SEARCH_API}${searchTerm}`);
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(cacheResults({ [searchTerm]: json[1] }));
  }

  function onToggleMenu() {
    dispatch(toggleMenu());
  }

  return (
    <div className="grid grid-flow-col items-center p-2 m-2 shadow-red-500 shadow-lg ">
      <div className="flex items-center  col-span-1 gap-2">
        <img
          // src="https://animationvisarts.com/wp-content/uploads/2023/09/Color-YouTube-logo-1030x571.jpg"
          src={Logo}
          alt="logo"
          className="h-12 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="col-span-10 text-center  text-white">
        <div className="relative flex justify-center w-1/2 mx-auto">
          {/* Input */}
          <input
            id="search"
            name="name"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            className="flex-1 p-2 px-4 rounded-l-3xl border-2 border-gray-400 bg-black text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition box-border"
          />

          {/* Button */}
          <button
            className="p-2 px-4 rounded-r-3xl border-2 border-l-0 border-gray-400 bg-black text-white flex items-center justify-center focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition box-border"
            onClick={() => {
              if (searchTerm.trim() !== "") {
                navigate(`/results?search_query=${searchTerm}`);
              }
            }}
          >
            <FaSearch className="text-gray-300" />
          </button>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-black border border-gray-700 rounded-lg shadow-lg z-10 text-left">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 hover:bg-gray-800 p-2 cursor-pointer"
                  onMouseDown={() => {
                    setSearchTerm(item); // Set input to clicked suggestion
                    setShowSuggestions(false);
                    navigate(`/results?search_query=${item}`);
                  }}
                >
                  <FaSearch className="text-gray-400" />
                  <span>{item}</span>
                </li>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className=" col-span-1 ">
        <img
          src="https://us.123rf.com/450wm/tifani1/tifani11801/tifani1180100029/93019841-user-icon-vector-illustration-isolated-on-black.jpg?ver=6"
          alt="user"
          className="h-14 ml-auto"
        />
      </div>
    </div>
  );
}
