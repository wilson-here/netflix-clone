import React from "react";
import { useRouter } from "next/router";
import { BsFillPlayFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import FavoriteButton from "./FavoriteButton";
import useInfoModalCustom from "@/hooks/useInfoModalCustom";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal, closeModal } = useInfoModalCustom();
  return (
    <div className="group bg-zinc-900 col-span relative aspect-video">
      <img
        onClick={() => {
          openModal(data?.id);
        }}
        src={data?.thumbnailUrl}
        alt="Thumbnail"
        loading="lazy"
        className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md group-hover:opacity-90 md:group-hover:opacity-0 delay-300 w-full h-full"
      />
      <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible md:visible delay-300 w-full scale-0 md:group-hover:scale-110 md:group-hover:-translate-y-[10%]  md:group-hover:opacity-100">
        <img
          onClick={() => {
            openModal(data?.id);
          }}
          src={data?.thumbnailUrl}
          alt="Thumbnail"
          loading="lazy"
          className="  cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full aspect-video"
        />

        <div
          className={`z-10 bg-zinc-800 lg:p-4 w-full shadow-md rounded-b-md transition-all duration-300 overflow-hidden p-3`}
        >
          <div className="flex flex-row items-stretch gap-2">
            <div
              onClick={() => {
                router.push(`/watch/${data?.id}`);
                closeModal();
              }}
              className="cursor-pointer w-6 h-6 lg:w-8 lg:h-8 bg-white rounded-full flex items-center justify-center transition hover:bg-neutral-300"
            >
              <BsFillPlayFill className="text-xl lg:text-2xl" />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-8 lg:h-8 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
              <BiChevronDown
                onClick={() => {
                  openModal(data?.id);
                }}
                size={30}
                className="text-white group-hover/item:text-neutral-300"
              />
            </div>
          </div>
          <p className="text-white text-sm lg:text-xl font-semibold mt-2 lg:mt-4">
            {data?.title}
          </p>
          <p className="text-green-400 text-xs lg:text-base font-semibold mt-2 lg:mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-1 lg:mt-2 gap-2 items-center">
            <p className="text-white text-xs lg:text-base">{data?.duration}</p>
          </div>
          <div className="flex flex-row mt-2 lg:mt-2 gap-2 items-center">
            <p className="text-white text-xs lg:text-base px-2 py-1 border-white border inline-block">
              {data?.genre}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
