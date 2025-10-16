# 🎬 Streamify - Modern YouTube Clone

> A feature-rich YouTube clone built with React, Redux Toolkit, and YouTube Data API v3, offering a seamless video streaming experience with modern UI/UX design.

![Streamify Banner](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)

## ✨ Features

### 🎥 **Core Video Experience**

- **Video Streaming**: Full YouTube video player with autoplay support
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Category Filtering**: Browse videos by categories with dynamic button list
- **Infinite Scroll**: Seamless loading of more content as you scroll

### 🔍 **Advanced Search**

- **Smart Search**: Real-time search with debounced API calls (200ms delay)
- **Search Suggestions**: Intelligent autocomplete with caching mechanism
- **Search Results**: Dedicated page for search results with pagination
- **Search Cache**: Object-based caching for O(1) lookup performance

### 🎨 **Modern UI/UX**

- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Smooth Animations**: Hover effects and transitions throughout
- **Clean Interface**: YouTube-inspired design with modern touches

### 💬 **Interactive Features**

- **Comments System**: Full comment threads with nested replies
- **Live Chat**: Real-time chat for live streams with auto-refresh
- **Like System**: Video engagement with like counts display
- **User Profiles**: Channel information and subscriber counts

### 🚀 **Performance Optimizations**

- **Code Splitting**: Optimized bundle sizes with React Router
- **Lazy Loading**: Components loaded on demand
- **Memoization**: Cached API responses for repeated requests
- **Debounced Search**: Prevents excessive API calls

## 🛠️ Tech Stack

| Technology              | Purpose             | Version |
| ----------------------- | ------------------- | ------- |
| **React**               | Frontend Framework  | ^19.1.1 |
| **Redux Toolkit**       | State Management    | ^2.9.0  |
| **React Router**        | Client-side Routing | ^7.9.3  |
| **Tailwind CSS**        | Styling Framework   | ^3.3.3  |
| **React Icons**         | Icon Library        | ^5.5.0  |
| **FontAwesome**         | Additional Icons    | ^7.0.1  |
| **YouTube Data API v3** | Video Data Source   | Latest  |

## 🏗️ Project Architecture

```
streamify/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── header/        # Navigation and search
│   │   └── body/          # Main content areas
│   │       ├── sidebar/   # Navigation sidebar
│   │       ├── mainContainer/ # Home page content
│   │       └── watch/     # Video player page
│   ├── contexts/          # React Context providers
│   │   └── ThemeContext.jsx # Theme management
│   ├── utils/             # Utilities and Redux store
│   │   ├── store.js       # Redux store configuration
│   │   ├── appSlice.js    # App state management
│   │   ├── searchSlice.js # Search functionality
│   │   ├── chatSlice.js   # Live chat state
│   │   └── constants.js   # API endpoints and keys
│   └── images/            # Local image assets
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- YouTube Data API v3 key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/streamify.git
   cd streamify
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API Key**

   - Get your YouTube Data API v3 key from [Google Cloud Console](https://console.cloud.google.com/)
   - Update `src/utils/constants.js` with your API key:

   ```javascript
   export const GOOGLE_API_KEY = "your_api_key_here";
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Start exploring Streamify!

## 🎯 Key Components

### 🎬 Video Player (`/watch`)

- Full-screen YouTube embed player with autoplay
- Video metadata display (title, views, likes, description)
- Related videos with infinite scroll functionality
- Live chat integration for live streams
- Comment system with threaded replies

### 🏠 Home Page (`/`)

- Category-based video filtering with button list
- Trending and popular videos from YouTube API
- Responsive video grid layout
- Smooth infinite scroll loading

### 🔍 Search Results (`/results`)

- Real-time search functionality with debouncing
- Search suggestions with intelligent caching
- Paginated results display
- Fast O(1) cache lookup performance

### 🎨 Theme System

- Automatic dark/light mode detection
- Manual theme toggle with smooth transitions
- Persistent theme preference storage
- System preference integration

## 🔧 Available Scripts

| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `npm start`     | Start development server on localhost:3000 |
| `npm run build` | Build optimized production bundle          |
| `npm test`      | Run test suite in interactive mode         |
| `npm run eject` | Eject from Create React App (irreversible) |

## 🌟 Advanced Features

### 📊 State Management

- **Redux Toolkit** for efficient state management
- **Modular slices** for different app features:
  - `appSlice`: UI state (sidebar, menu toggle)
  - `searchSlice`: Search cache and results with O(1) lookup
  - `chatSlice`: Live chat messages and real-time updates

### 🎭 Context API Integration

- **ThemeContext**: Global theme management
- **Local Storage Integration**: Persistent user preferences
- **System Preference Detection**: Auto dark/light mode

### 🔄 API Integration

- **YouTube Data API v3** for all video data
- **Error handling** for API failures and rate limits
- **Debounced requests** to prevent excessive API calls
- **Smart caching** for improved performance

## 🎨 Performance Optimizations

### 🚀 Search Performance

```javascript
// Cache Implementation: O(1) lookup time
const searchCache = {
  react: ["react tutorial", "react hooks", "react 2024"],
  javascript: ["javascript basics", "js projects", "node.js"],
};
// Array search: O(n) → Object search: O(1)
```

### ⚡ Debounced Search

- 200ms delay prevents excessive API calls
- Cancels previous requests when user types quickly
- Utilizes cached results for repeated searches

### 🔄 Infinite Scroll

- Intersection Observer API for efficient scroll detection
- Lazy loading of components and content
- Optimized video grid rendering

### 📋 Development Setup

```bash
# Install dependencies
npm install

# Install Redux Toolkit and React Redux
npm i @reduxjs/toolkit react-redux

# Install React Router
npm i react-router-dom

# Start development server
npm start
```

---

</div>
