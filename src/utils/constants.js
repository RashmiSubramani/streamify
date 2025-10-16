export const GOOGLE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const YOUTUBE_SEARCH_API = `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=`;
export const YOUTUBE_COMMENTS_API = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${GOOGLE_API_KEY}`;
export const YOUTUBE_REPLIES_API = `https://youtube.googleapis.com/youtube/v3/comments?part=snippet&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_VIDEO_CATEGORIES_API = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_VIDEOS_API = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=25&regionCode=IN&key=${GOOGLE_API_KEY}`;
export const YOUTUBE_LIVE_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&maxResults=50&key=${GOOGLE_API_KEY}`;
export const YOUTUBE_ALL_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&q=All&key=${GOOGLE_API_KEY}`;
export const YOUTUBE_LIVE_VIDEOS_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&regionCode=IN&maxResults=50&q=music&key=${GOOGLE_API_KEY}`;
