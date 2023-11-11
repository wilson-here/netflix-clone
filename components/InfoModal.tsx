import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModalCustom from "@/hooks/useInfoModalCustom";
import useMovie from "@/hooks/useMovie";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);

  const { movieId } = useInfoModalCustom();
  const { data } = useMovie(movieId as string);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative mx-auto max-w-[350px] xl:max-w-[500px] w-[90%] rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative aspect-video">
            <video
              autoPlay
              muted
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
              className="w-full brightness-[60%] object-cover h-full"
            />
            <div
              className="cursor-pointer absolute top-3 right-3 lg:top-5 lg:right-5 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center z-10"
              onClick={() => {
                handleClose();
              }}
            >
              <AiOutlineClose className="text-white " size={20} />
            </div>
            <div className="absolute inset-4 lg:inset-6 flex flex-col justify-between">
              <p className="text-white text-lg lg:text-3xl font-bold w-[85%]">
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>
          <div className="p-4 lg:p-8">
            <p className="text-green-400 font-semibold text-sm lg:text-lg">
              New
            </p>
            <p className="text-white text-sm lg:text-lg">{data?.duration}</p>
            <p className="text-white text-sm lg:text-lg px-2 py-1 border-white border inline-block my-2">
              {data?.genre}
            </p>
            <p className="text-white text-sm lg:text-lg">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
