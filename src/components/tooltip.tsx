import React, { ReactNode } from "react";
import { FiInfo } from "react-icons/fi";

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: "top" | "right" | "bottom" | "left";
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = "top",
}) => {
  const positionClasses = {
    top: "bottom-full mb-2",
    right: "left-full ml-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
  };

  return (
    <div className="relative inline-block group">
      <div className="flex space-x-2 mb-2 items-center">
       <FiInfo className="cursor-pointer "/>
        {children}
      </div>
      <div
        role="tooltip"
        aria-hidden="true"
        className={`absolute ${positionClasses[position]} w-72  text-justify overflow-hidden left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
