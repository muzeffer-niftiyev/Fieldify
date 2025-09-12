"use client";
import { useState } from "react";
import { TextToggleProps } from "../_types/fields";

const TextToggle = ({ children }: TextToggleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = isExpanded
    ? children
    : children.split(" ").slice(0, 35).join(" ") + "...";

  return (
    <span>
      {text}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-primary-700 px-3 underline"
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
};

export default TextToggle;
