import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";
import useInfoModalCustom from "@/hooks/useInfoModalCustom";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();
  const { closeModal } = useInfoModalCustom();
  return (
    <button
      onClick={() => {
        router.push(`/watch/${movieId}`);
        closeModal();
      }}
      className="bg-white rounded-md py-1 pl-2 pr-3 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition"
    >
      <BsFillPlayFill size={25} />
      Play
    </button>
  );
};

export default PlayButton;
