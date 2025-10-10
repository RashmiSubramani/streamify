import { useState } from "react";
import { ButtonList } from "./buttons/ButtonList";
import { VideoContainer } from "./videos/VideoContainer";

export function MainContainer() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div>
      <ButtonList onCategorySelect={setSelectedCategory} />
      <VideoContainer selectedCategory={selectedCategory} />
    </div>
  );
}
