export function Button({ name, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 m-1 rounded-lg whitespace-nowrap transition-colors duration-200 ${
        isActive
          ? "bg-white text-black"
          : "bg-gray-800 text-white hover:bg-gray-700"
      }`}
    >
      {name}
    </button>
  );
}
