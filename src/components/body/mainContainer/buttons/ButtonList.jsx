// import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = [
  "All",
  "Gaming",
  "Songs",
  "Live",
  "Soccer",
  "Cricket",
  "Cooking",
  "Valentines",
  "Comedy",
  "News",
  "Tech",
  "Travel",
  "Cricket",
];

export function ButtonList() {
  return (
    <div className="flex">
      {categories.map((button, index) => (
        <Button key={index} name={button} />
      ))}
    </div>
  );
}
