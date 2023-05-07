import { useState } from "react";
import { Movie } from "../../interface/Interface";
import { Spin } from "antd";
import { Tabs } from "../../components/Tabs";
import { MovieCard } from "./MovieCard";
import useGet from "../../api/useGet";

export const Movies = () => {
  const [isMovieShowing, setIsMovieShowing] = useState<boolean>(true);
  const { data, isFetching } = useGet("movie");
  const nowDay = new Date("2022-12-20");
  nowDay.setHours(0, 0, 0, 0);

  return (
    <div className="bg-white dark:bg-transparent text-black dark:text-white">
      <Tabs
        selectedTab={isMovieShowing}
        setSelectedTab={setIsMovieShowing}
        tab1="PHIM ĐANG CHIẾU"
        tab2="PHIM SẮP CHIẾU"
      />

      {data && (
        <div className="flex justify-center pb-5">
          {isFetching ? (
            <div className="flex justify-center min-h-screen">
              <Spin size="large" tip="Loading..." />
            </div>
          ) : (
            <div className="grid 2xl:grid-cols-6 lg:grid-cols-5 min-[840px]:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-x-8 gap-x-6 gap-y-5">
              {data?.map((movie: Movie) => {
                if (
                  (new Date(movie.releaseDate) <= nowDay && isMovieShowing) ||
                  (new Date(movie.releaseDate) > nowDay && !isMovieShowing)
                )
                  return (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      isShowing={isMovieShowing}
                    />
                  );
                return <></>;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
