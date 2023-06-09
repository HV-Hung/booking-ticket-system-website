import React, { useState } from "react";
import { Movie } from "../interface/Interface";
import { useNavigate } from "react-router-dom";
import { ClockIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState<boolean>(false);

  return (
    <div className="min-[400px]:h-[350px] h-[300px] flex flex-col items-center dark:bg-slate-800 text-black dark:text-white">
      <div className="relative">
        <img
          src={movie.image}
          onMouseEnter={() => setMovieInfo(true)}
          onMouseLeave={() => setMovieInfo(false)}
          className="min-[400px]:h-[300px] h-[250px] w-full rounded"
        />
        {true && (
          <div
            className={`w-full absolute bottom-0 rounded-b bg-gray-800 bg-opacity-80 transition-all duration-250
          ${movieInfo ? "h-32" : "h-0"}`}
            onMouseEnter={() => setMovieInfo(true)}
            onMouseLeave={() => setMovieInfo(false)}
          >
            <div
              className={`px-5 py-2 text-white
                        ${movieInfo ? "h-32" : "h-0"}`}
            >
              <div className="space-y-1">
                <div className="flex items-center">
                  <ClockIcon className="mr-2 h-6 w-6 inline-block" />
                  <p>{movie.duration} phút</p>
                </div>
                <div className="flex items-center">
                  <CalendarDaysIcon className="mr-2 h-6 w-6 inline-block" />
                  <p>
                    {new Date(movie.releaseDate).toLocaleDateString("en-UK")}
                  </p>
                </div>
                <div
                  className={`flex items-center justify-center
                            ${movieInfo ? "block" : "hidden"}`}
                >
                  <button
                    className="px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out mt-2"
                    onClick={() => {
                      scroll(0, 0);
                      navigate(`/movie/${movie.id}`);
                    }}
                  >
                    {new Date(movie.releaseDate) <= new Date("2022-12-20") ? (
                      <>Mua vé</>
                    ) : (
                      <>Chi tiết</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="h-[52px] w-full line-clamp-2 cursor-pointer font-bold text-center py-2 hover:text-sky-500 z-10 bg-white dark:bg-slate-800"
        onClick={() => {
          scroll(0, 0);
          navigate(`/movie/${movie.id}`);
        }}
      >
        {movie.rated.substring(0, 1) === "P" ? (
          <span className="border border-green-500 rounded text-green-500 px-1 mr-1">
            P
          </span>
        ) : (
          <span className="border border-red-500 rounded text-red-500 px-1 mr-1">
            {movie.rated.substring(0, 3)}
          </span>
        )}
        {movie.name}
      </div>
    </div>
  );
};
