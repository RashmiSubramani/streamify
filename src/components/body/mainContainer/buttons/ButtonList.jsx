import { useEffect, useState } from "react";
import { Button } from "./Button";
import { YOUTUBE_VIDEO_CATEGORIES_API } from "../../../../utils/constants";

export function ButtonList({ onCategorySelect }) {
  const [categories, setCategories] = useState(["All", "Live"]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const res = await fetch(YOUTUBE_VIDEO_CATEGORIES_API);
      const data = await res.json();

      const categoryNames = data.items
        .map((item) => item.snippet.title)
        .filter((name) => name !== "All" && name !== "Live");

      setCategories((prev) => [...prev, ...categoryNames]);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }

  return (
    <div className="flex overflow-x-auto scrollbar-hide space-x-2 p-2 bg-black">
      {categories.map((name, index) => (
        <Button
          key={index}
          name={name}
          onClick={() => onCategorySelect(name)}
        />
      ))}
    </div>
  );
}
