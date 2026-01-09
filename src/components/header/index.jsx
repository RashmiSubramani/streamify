import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaSearch, FaSun, FaMoon, FaTimes } from "react-icons/fa";
import { cacheResults } from "../../utils/searchSlice";
import { useNavigate } from "react-router-dom";
import LightLogo from "../../images/lightLogo.png";
import DarkLogo from "../../images/darkLogo.png";
import { useTheme } from "../../contexts/ThemeContext";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchCache = useSelector((store) => store.search);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { isDark, toggleTheme } = useTheme();

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
    // Temporarily disabled due to CORS issues
    // const data = await fetch(`${YOUTUBE_SEARCH_API}${searchTerm}`);
    // const json = await data.json();
    // setSuggestions(json[1]);
    // dispatch(cacheResults({ [searchTerm]: json[1] }));

    // Mock suggestions to avoid CORS error
    const mockSuggestions = [
      `${searchTerm} tutorial`,
      `${searchTerm} music`,
      `${searchTerm} review`,
      `${searchTerm} 2024`,
    ];
    setSuggestions(mockSuggestions);
    dispatch(cacheResults({ [searchTerm]: mockSuggestions }));
  }

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/results?search_query=${searchTerm}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="grid grid-flow-col items-center p-2 m-2 shadow-red-500 shadow-lg bg-black dark:bg-white transition-colors duration-200">
      <div className="flex items-center  col-span-1 gap-2">
        <img
          src={isDark ? LightLogo : DarkLogo}
          alt="Streamify logo"
          className="h-12 cursor-pointer transition-opacity duration-200"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="col-span-10 text-center text-white dark:text-gray-900">
        <div className="relative flex justify-center w-1/2 mx-auto">
          {/* Input */}
          <div className="relative flex-1">
            <input
              id="search"
              name="name"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => {
                setShowSuggestions(true);
                setIsInputFocused(true);
              }}
              onBlur={() => {
                setShowSuggestions(false);
                setIsInputFocused(false);
              }}
              className={`w-full p-2 px-4 pr-10 rounded-l-3xl border bg-black dark:bg-gray-100 text-white dark:text-gray-900 focus:outline-none transition-colors duration-200 ${
                isInputFocused
                  ? 'border-red-400 dark:border-red-400'
                  : 'border-gray-400 dark:border-gray-300'
              }`}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 dark:hover:text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Button */}
          <button
            className={`p-2 px-4 rounded-r-3xl border border-l-0 bg-black dark:bg-gray-100 text-white dark:text-gray-900 flex items-center justify-center focus:outline-none transition-colors duration-200 hover:bg-gray-900 dark:hover:bg-gray-200 ${
              isInputFocused
                ? 'border-red-400 dark:border-red-400'
                : 'border-gray-400 dark:border-gray-300'
            }`}
            onClick={handleSearch}
          >
            <FaSearch className="text-gray-300" />
          </button>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-black dark:bg-white border border-gray-700 dark:border-gray-300 rounded-lg shadow-lg z-10 text-left">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 p-2 cursor-pointer text-white dark:text-gray-900"
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
      <div className="col-span-1 flex items-center gap-3 justify-end">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? (
            <FaSun className="text-yellow-400 text-xl" />
          ) : (
            <FaMoon className="text-gray-300 text-xl" />
          )}
        </button>

        {/* User Avatar */}
        <img
          src="https://us.123rf.com/450wm/tifani1/tifani11801/tifani1180100029/93019841-user-icon-vector-illustration-isolated-on-black.jpg?ver=6"
          alt="user"
          className="h-12 w-12 rounded-full"
        />
      </div>
    </div>
  );
}
