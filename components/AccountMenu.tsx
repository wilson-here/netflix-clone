import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser();
  if (!visible) return null;
  return (
    <div
      className="bg-black right-0 pt-3
    text-xs lg:text-base w-40 lg:w-52 absolute top-12 lg:top-16 right-4 lg:pt-7 flex-col border-2 border-gray-800 flex"
    >
      <div className="flex flex-col gap-1">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            className="w-8 rounded-md"
            src="/images/default-blue.png"
            alt=""
          />
          <p className="text-white group-hover/item:underline">{data?.name}</p>
        </div>
        <hr className="bg-gray-600 border-0 h-px mt-3 lg:mt-5" />
        <div
          onClick={() => signOut()}
          className="px-3 py-3 text-center text-white  hover:underline"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
