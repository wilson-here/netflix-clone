import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

import useMovie from "@/hooks/useMovie";

const Watch = () => {
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);
  useEffect(() => {
    const navBar = navRef.current;
    setTimeout(() => {
      navBar?.classList.add("opacity-0");
    }, 5000);
  }, []);
  return (
    <div className="h-screen w-screen bg-black">
      <nav
        ref={navRef}
        className="fixed w-full p-4 z-10 flex flex-row items-center gap-4 lg:gap-8 bg-black bg-opacity-70 hover:opacity-100 transition duration-1000"
      >
        <div
          onClick={() => {
            router.push("/");
          }}
          className="cursor-pointer hover:bg-neutral-300/50 rounded-full p-2 transition duration-300"
        >
          <AiOutlineArrowLeft className="text-white text-xl lg:text-4xl" />
        </div>

        <p className="text-white text-xl md:text-2xl font-bold ">
          <span className="font-light mr-2">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video autoPlay controls className="h-full w-full" src={data?.videoUrl} />
    </div>
  );
};

export default Watch;
