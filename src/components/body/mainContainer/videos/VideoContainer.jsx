import { useEffect, useState, useCallback, useRef } from "react";
import {
  YOUTUBE_VIDEOS_API,
  YOUTUBE_LIVE_VIDEOS_API,
  GOOGLE_API_KEY,
} from "../../../../utils/constants";
import { VideoCard } from "./VideoCard";
import { Link } from "react-router-dom";

export function VideoContainer({ selectedCategory }) {
  // State for video data and pagination
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // Refs for infinite scroll implementation
  const loaderRef = useRef(null); // Reference to the loading indicator element
  const isLoadingRef = useRef(false); // Prevents duplicate API calls

  /**
   * Fetches videos from YouTube API based on selected category
   * @param {boolean} reset - Whether to reset the video list or append to it
   * @param {string} pageToken - Token for pagination (next page)
   */
  const getVideos = useCallback(async (reset = false, pageToken = null) => {
    // Prevent multiple simultaneous API calls
    if (isLoadingRef.current) return;
    
    try {
      isLoadingRef.current = true;
      setLoading(true);

      // Determine API URL based on category
      let apiUrl = YOUTUBE_VIDEOS_API; // Default to trending videos
      const maxResults = 25;

      if (selectedCategory === "Live") {
        apiUrl = YOUTUBE_LIVE_VIDEOS_API;
      } else if (selectedCategory !== "All") {
        // Search for videos by category
        apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(selectedCategory)}&key=${GOOGLE_API_KEY}`;
      }

      // Add pagination token for next page
      if (pageToken && selectedCategory !== "All") {
        apiUrl += `&pageToken=${pageToken}`;
      } else if (pageToken && selectedCategory === "All") {
        // Special handling for trending videos pagination
        apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=${maxResults}&regionCode=IN&key=${GOOGLE_API_KEY}&pageToken=${pageToken}`;
      }

      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.error) {
        console.error('API Error:', data.error);
        setHasMore(false);
        return;
      }

      if (data.items && data.items.length > 0) {
        // Standardize video data structure for different API endpoints
        const newItems = data.items.map((item) => ({
          id: item.id?.videoId || item.id,
          snippet: item.snippet,
          statistics: item.statistics || null,
        }));

        if (reset) {
          // Replace existing videos (when category changes)
          setVideos(newItems);
        } else {
          // Append new videos for infinite scroll, filter duplicates
          setVideos(prev => {
            const existingIds = new Set(prev.map(v => v.id));
            const filteredNew = newItems.filter(item => !existingIds.has(item.id));
            return [...prev, ...filteredNew];
          });
        }

        // Update pagination state
        setNextPageToken(data.nextPageToken || null);
        setHasMore(!!data.nextPageToken);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setHasMore(false);
    } finally {
      isLoadingRef.current = false;
      setLoading(false);
    }
  }, [selectedCategory]);

  // Reset and load videos when category changes
  useEffect(() => {
    setVideos([]);
    setNextPageToken(null);
    setHasMore(true);
    getVideos(true); // Reset = true for new category
  }, [selectedCategory, getVideos]);

  // Function to load more videos for infinite scroll
  const loadMoreVideos = useCallback(() => {
    if (nextPageToken && hasMore && !loading) {
      getVideos(false, nextPageToken); // Append videos with pagination token
    }
  }, [nextPageToken, hasMore, loading, getVideos]);

  // Set up IntersectionObserver for infinite scroll
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    // Create observer to detect when user scrolls near bottom
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Trigger load more when loader is visible and conditions are met
        if (entry.isIntersecting && hasMore && !loading && nextPageToken) {
          loadMoreVideos();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of loader is visible
        rootMargin: '50px' // Start loading 50px before loader is visible
      }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [hasMore, loading, nextPageToken, loadMoreVideos]);

  return (
    <div className="w-full">
      {/* Video Grid - Responsive layout with auto-fill columns */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 p-4 bg-black text-white w-full">
        {videos.map((video, index) => (
          <Link to={`/watch?v=${video.id}`} key={`${video.id}-${index}`}>
            <VideoCard info={video} />
          </Link>
        ))}
      </div>

      {/* Loading indicator and infinite scroll trigger */}
      {videos.length > 0 && (
        <div ref={loaderRef} className="text-center py-8 text-gray-400">
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
              <span>Loading more videos...</span>
            </div>
          ) : hasMore && nextPageToken ? (
            <div>Scroll down for more videos</div>
          ) : (
            <div className="text-gray-500">
              End of results ({videos.length} videos loaded)
            </div>
          )}
        </div>
      )}

      {/* Empty state when no videos are loaded */}
      {videos.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-400">
          <p>No videos available for {selectedCategory}</p>
          <button
            onClick={() => getVideos(true)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
