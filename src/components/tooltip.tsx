import React, { ReactNode, useState, useEffect, useRef } from "react";
import { FiInfo } from "react-icons/fi";

interface TooltipProps {
  children: ReactNode;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Handle mouse hover to show/hide the tooltip
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  useEffect(() => {
    if (buttonRef.current && isHovered) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      console.log(buttonRect)
      const top = 0; 
      const left = 20; 

      setTooltipPosition({ top, left });
    }
  }, [isHovered]);

  return (
    <div       className="flex items-center mb-2 space-x-2">
       <div className="relative inline-block">
      {/* Tooltip trigger */}
      <button
        ref={buttonRef}
        aria-label="More info"
        className="p-0 m-0 flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FiInfo />
      </button>
      {/* Tooltip */}
      {isHovered && (
        <div
          role="tooltip"
          aria-hidden={!isHovered}
          className="absolute z-40 w-72 text-justify overflow-hidden bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-100 transition-opacity duration-300"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          {text}
        </div>
      )}
    </div>
        {children}
    </div>
   
  );
};

export default Tooltip;

