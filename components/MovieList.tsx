import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  return (
    <div className="px-4 md:px-12 mt-5 md:mt-10 space-y-8">
      <div>
        <p className="text-white text-base md:text-xl lg:text-2xl font-semibold mb-2 lg:mb-4">
          {title}
        </p>
        {isEmpty(data) ? (
          <p className="flex items-center justify-center h-20 xl:h-36 text-neutral-700 font-medium text-center text-sm md: text-base lg:text-lg">
            You haven&apos;t add any movie to your favorites yet
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {data.map((movie) => (
              <MovieCard key={movie.id} data={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
