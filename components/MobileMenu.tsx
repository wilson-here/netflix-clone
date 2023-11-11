import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}
const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="bg-black text-sm lg:text-base w-40 lg:w-56 absolute top-12 lg:top-8 left-0 py-3 lg:py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline text-xs lg:text-base">
          Home
        </div>
        <div className="px-3 text-center text-white hover:underline text-xs lg:text-base">
          Series
        </div>
        <div className="px-3 text-center text-white hover:underline text-xs lg:text-base">
          Films
        </div>
        <div className="px-3 text-center text-white hover:underline text-xs lg:text-base">
          New & Popular
        </div>
        <div className="px-3 text-center text-white hover:underline text-xs lg:text-base">
          My List
        </div>
        <div className="px-3 text-center text-white hover:underline text-xs lg:text-base">
          Browse by languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
