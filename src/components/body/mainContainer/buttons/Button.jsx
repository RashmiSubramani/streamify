export function Button({ name, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 m-1 rounded-lg whitespace-nowrap transition-colors duration-200 ${
        isActive
          ? "bg-white dark:bg-gray-900 text-black dark:text-white"
          : "dark:bg-gray-800 bg-gray-200 dark:text-white text-gray-900 dark:hover:bg-gray-700 hover:bg-gray-300"
      }`}
    >
      {name}
    </button>
  );
}
