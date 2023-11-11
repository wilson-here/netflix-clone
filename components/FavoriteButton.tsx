import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.delete("/api/favorite", {
        data: { movieId }, // movieId được truyền vào request body (req.body) qua prop data của axios, vì mặc định DELETE method không có request body
      });
    } else {
      // movieId được truyền vào request body (req.body) không cần qua prop data, vì mặc định POST method có request body
      response = await axios.post("/api/favorite", { movieId });
    }
    const updatedFavoriteIds = response?.data?.favoriteIds;

    // update local state, THEN refetch data from current backend api
    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    mutateFavorites();
  }, [isFavorite, mutateFavorites, currentUser, mutate, movieId]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-8 lg:h-8 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white text-base lg:text-xl" />
    </div>
  );
};

export default FavoriteButton;
