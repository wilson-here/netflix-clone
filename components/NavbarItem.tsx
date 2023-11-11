import React from "react";

interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition flex items-center justify-center p-2 lg:p-4">
      {label}
    </div>
  );
};

export default NavbarItem;
