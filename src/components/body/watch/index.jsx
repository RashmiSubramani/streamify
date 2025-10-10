import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import { closeMenu } from "../../../utils/appSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import YouTubeCommentsContainer from "./comments/CommentsContainer";
import LiveChat from "./liveChat";
import { GOOGLE_API_KEY } from "../../../utils/constants";

export default function Watch() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for video information and related content
  const [videoData, setVideoData] = useState({
    videoDetails: null,
    channelDetails: null,
    liveChatId: null,
    isLive: false,
    likeCount: 0,
    viewCount: 0,
  });

  const [videos, setVideos] = useState([]); // Related videos for infinite scroll
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const loaderRef = useRef(null); // Reference for infinite scroll trigger

  /**
   * Fetches main video data including details, statistics, and channel info
   */
  const fetchVideoData = useCallback(async () => {
    try {
      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,liveStreamingDetails&id=${videoId}&key=${GOOGLE_API_KEY}`
      );
      const json = await res.json();

      if (json.items?.length > 0) {
        const video = json.items[0];
        const liveDetails = video.liveStreamingDetails;
        const isLive = video.snippet.liveBroadcastContent === "live";
        const channelDetails = await fetchChannelInfo(video.snippet.channelId);

        setVideoData({
          videoDetails: video.snippet,
          channelDetails,
          liveChatId: liveDetails ? liveDetails.activeLiveChatId : null,
          isLive,
          likeCount: video.statistics.likeCount,
          viewCount: video.statistics.viewCount,
        });
      } else {
        resetVideoData();
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
      resetVideoData();
    }
  }, [videoId]);

  // Fetch channel info
  async function fetchChannelInfo(channelId) {
    try {
      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${GOOGLE_API_KEY}`
      );
      const json = await res.json();
      return json.items?.[0] || null;
    } catch (error) {
      console.error("Error fetching channel info:", error);
      return null;
    }
  }

  // Reset video data
  function resetVideoData() {
    setVideoData({
      videoDetails: null,
      channelDetails: null,
      liveChatId: null,
      isLive: false,
      likeCount: 0,
      viewCount: 0,
    });
  }

  /**
   * Fetches related videos for infinite scroll
   * @param {string} pageToken - Pagination token for next page
   */
  const fetchMoreVideos = useCallback(async (pageToken = null) => {
    if (loading) return;

    try {
      setLoading(true);

      // Use trending videos for related content
      let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=12&regionCode=US&key=${GOOGLE_API_KEY}`;
      if (pageToken) {
        url += `&pageToken=${pageToken}`;
      }

      const res = await fetch(url);
      const json = await res.json();

      if (json.items) {
        // Filter out current video and duplicates
        const newVideos = json.items.filter(item => 
          item.id !== videoId && !videos.some(existingVideo => existingVideo.id === item.id)
        );
        
        setVideos(prev => [...prev, ...newVideos]);
        setNextPageToken(json.nextPageToken || null);
      } else if (json.error) {
        console.error('API Error:', json.error);
      }
    } catch (error) {
      console.error("Error fetching related videos:", error);
    } finally {
      setLoading(false);
    }
  }, [videoId, videos, loading]);

  // Load video data when video ID changes
  useEffect(() => {
    dispatch(closeMenu());
    fetchVideoData();
    setVideos([]);
    setNextPageToken(null);
  }, [videoId, dispatch, fetchVideoData]);

  // Load initial related videos after main video data is ready
  useEffect(() => {
    if (videoData.videoDetails && videos.length === 0 && !loading) {
      fetchMoreVideos();
    }
  }, [videoData.videoDetails, videos.length, loading, fetchMoreVideos]);

  // Set up infinite scroll for related videos
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && nextPageToken && !loading) {
          fetchMoreVideos(nextPageToken);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [nextPageToken, loading, fetchMoreVideos]);

  // Render description with links
  function renderDescription(description) {
    if (!description) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = description.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {part}
          </a>
        );
      }
      return part.split("\n").map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ));
    });
  }

  const {
    videoDetails,
    channelDetails,
    liveChatId,
    isLive,
    likeCount,
    viewCount,
  } = videoData;

  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      {/* Video Player */}
      <div className="flex justify-center w-full bg-black">
        <div className="w-full max-w-[1200px] aspect-video rounded-xl overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={videoDetails?.title || "YouTube video player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto p-6">
        {videoDetails && channelDetails && (
          <div>
            <h1 className="font-bold text-xl mb-3">{videoDetails.title}</h1>

            {/* Channel info */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center mb-3">
                <img
                  src={channelDetails.snippet.thumbnails.default.url}
                  alt="channel icon"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{channelDetails.snippet.title}</p>
                  <p className="text-gray-400 text-sm">
                    {Number(
                      channelDetails.statistics.subscriberCount
                    ).toLocaleString()}{" "}
                    subscribers
                  </p>
                </div>
              </div>

              {/* Like */}
              <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg hover:bg-gray-700 cursor-pointer mt-4 w-fit">
                <FaThumbsUp className="text-white" />
                <span className="font-medium">
                  {likeCount ? Number(likeCount).toLocaleString() : "0"}
                </span>
              </div>
            </div>

            <div className=" bg-gray-800 p-4 rounded-lg my-2">
              <p className="text-gray-400 text-sm ">
                {viewCount
                  ? `${Number(viewCount).toLocaleString()} views`
                  : "0 views"}{" "}
                • {new Date(videoDetails.publishedAt).toLocaleDateString()}
              </p>

              {/* Description */}
              <div className="text-gray-200">
                <div
                  className={`${
                    showFullDescription ? "" : "line-clamp-4"
                  } leading-relaxed`}
                >
                  {renderDescription(videoDetails.description)}
                </div>
                <button
                  className="text-blue-400 mt-1 hover:underline"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Show Less" : "Show More"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Comments / Live Chat */}
        {isLive && liveChatId ? (
          <LiveChat liveChatId={liveChatId} />
        ) : (
          <YouTubeCommentsContainer />
        )}

        {/* Related Videos Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Related Videos ({videos.length})
          </h2>
          
          {/* Related Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, index) => {
              const videoIdValue = video.id?.videoId || video.id;
              
              return (
                <div 
                  key={`${videoIdValue}-${index}`}
                  className="cursor-pointer hover:scale-105 transition-transform duration-200 bg-gray-900 p-3 rounded-lg"
                  onClick={() => navigate(`/watch?v=${videoIdValue}`)}
                >
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-full rounded-lg"
                  />
                  <p className="font-semibold mt-2 line-clamp-2">{video.snippet.title}</p>
                  <p className="text-gray-400 text-sm">
                    {video.snippet.channelTitle}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Related Videos Loading Indicator */}
        {videos.length > 0 && (
          <div ref={loaderRef} className="text-center py-8 text-gray-400">
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                <span>Loading more videos...</span>
              </div>
            ) : nextPageToken ? (
              <div>Scroll down for more videos</div>
            ) : (
              <div className="text-gray-500">
                End of related videos ({videos.length} loaded)
              </div>
            )}
          </div>
        )}

        {/* Empty state for related videos */}
        {videos.length === 0 && !loading && videoData.videoDetails && (
          <div className="text-center py-8 text-gray-400">
            <p>No related videos available</p>
          </div>
        )}
      </div>
    </div>
  );
}