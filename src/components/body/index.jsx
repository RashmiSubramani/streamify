import { useSelector, useDispatch } from "react-redux";
import { SideBar } from "./sidebar/index";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toggleMenu } from "../../utils/appSlice";

export function Body() {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();
  const location = useLocation();

  // Detect if it's the watch page
  const isWatchPage = location.pathname.startsWith("/watch");

  // Reopen sidebar when navigating away from watch page
  useEffect(() => {
    if (!isWatchPage && !isMenuOpen) {
      dispatch(toggleMenu());
    }
  }, [isWatchPage, isMenuOpen, dispatch]);

  return (
    <div
      className={`h-screen ${
        isWatchPage
          ? "grid grid-cols-1" // full width for watch page
          : isMenuOpen
          ? "grid grid-cols-[280px_1fr]"
          : "grid grid-cols-1"
      }`}
    >
      {/* Render sidebar only if not watch page and sidebar is open */}
      {!isWatchPage && isMenuOpen && <SideBar />}

      {/* Main content */}
      <main className="w-full h-full overflow-y-auto my-4">
        <Outlet />
      </main>
    </div>
  );
}
