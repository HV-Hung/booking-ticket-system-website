import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import {
  ArrowDownCircleIcon,
  PlayCircleIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { ClockIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { PopUpYoutube } from "../../components/PopUpYoutube";
import useGet from "../../api/useGet";
import { MovieShowtime } from "./MovieShowtime";

const nowDay = new Date("2022-12-20");
nowDay.setHours(0, 0, 0, 0);
export const MovieDetails = () => {
  const [isShowPopUp, setIsShowPopUp] = useState<boolean>(false);
  const [isMovieDetails, setIsMovieDetails] = useState<boolean>(false);

  const id = useParams().id;
  const { data: movie, isFetching } = useGet("movie/" + id);

  const isShowing = true;
  return (
    <>
      {movie ? (
        <div
          className={`hidden sm:block relative bg-cover ${
            isShowing ? "min-h-[420px]" : "min-h-[95vh]"
          }`}
          style={{
            backgroundImage: `url(${movie.image})`,
          }}
        >
          <div className="absolute inset-0 bg-gray-900 opacity-75 backdrop-filter backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex items-center text-white lg:px-12 px-10">
            <img
              className="w-[220px] h-[340px] rounded"
              src={movie.image}
            ></img>
            <div className="pl-10 relative h-[340px] w-full">
              <div
                className={`${
                  isMovieDetails
                    ? "translate-y-0 text-3xl"
                    : "translate-y-32 text-4xl"
                } transform absolute transition-all duration-500`}
              >
                <div className="flex items-center font-bold">
                  {movie.rated.substring(0, 1) === "P" ? (
                    <span className="text-xl mt-1 border border-green-500 rounded text-green-500 px-2">
                      P
                    </span>
                  ) : (
                    <span className="text-xl mt-1 border border-red-500 rounded text-red-500 px-1">
                      {movie.rated.substring(0, 3)}
                    </span>
                  )}
                  <p className="font-bold py-2 ml-2 -mr-2"> {movie.name}</p>
                </div>

                <div className="flex space-x-5 py-2 text-xl font-medium">
                  <p> {movie.genre.join(", ")}</p>
                  <p className="font-thin text-xl mx-5 mb-1">-</p>
                  <div className="flex items-center">
                    <ClockIcon className="mr-2 h-7 w-7 inline-block" />
                    <p>{movie.duration} phút</p>
                  </div>
                  <p className="font-thin text-xl mx-5 mb-1">-</p>
                  <div className="flex items-center">
                    <CalendarDaysIcon className="mr-2 h-7 w-7 inline-block" />
                    <p>
                      {new Date(movie.releaseDate).toLocaleDateString("en-UK")}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  isMovieDetails
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1/4 opacity-0"
                } transform absolute top-24 transition-all duration-500`}
              >
                <div>
                  <span className="font-medium">Đạo diễn: </span>
                  {movie.director}
                </div>
                <div>
                  <span className="font-medium">Diễn viên: </span>
                  {movie.actors}
                </div>
                <div>
                  <span className="font-medium"> Ngôn ngữ: </span>
                  {movie.language}
                </div>
                <div className="py-4">{movie?.description}</div>
              </div>

              <div className="absolute bottom-8 left-4 text-xl text-sky-500 font-semibold z-30">
                <button
                  className={`${
                    isMovieDetails
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-1/2 opacity-0"
                  } flex items-center transform absolute left-5 w-40 transition-all duration-500`}
                  onClick={() => setIsMovieDetails(!isMovieDetails)}
                >
                  Ẩn thông tin
                  <MinusIcon className="h-5 w-5 ml-1" />
                </button>
                <button
                  className={`${
                    isMovieDetails
                      ? "translate-y-1/2 opacity-0"
                      : "translate-y-0 opacity-100"
                  } flex items-center transform absolute left-5 w-48 transition-all duration-500`}
                  onClick={() => setIsMovieDetails(!isMovieDetails)}
                >
                  Thêm thông tin
                  <PlusIcon className="h-5 w-5 ml-1" />
                </button>
              </div>

              <div className="absolute bottom-0 w-full flex items-center justify-center">
                <button
                  className=" hover:text-sky-500"
                  onClick={() => setIsShowPopUp(!isShowPopUp)}
                >
                  <div className="flex items-center justify-center">
                    <PlayCircleIcon className="w-10 h-10" />
                    <p className="font-semibold text-base ml-2">XEM TRAILER</p>
                  </div>
                </button>
                {isShowing && (
                  <>
                    <p className="font-thin text-xl mx-5 mb-1">|</p>
                    <button
                      className=" hover:text-sky-500"
                      onClick={() => {
                        window.scroll({
                          top: 450,
                          behavior: "smooth",
                        });
                      }}
                    >
                      <div className="flex items-center justify-center">
                        <ArrowDownCircleIcon className="w-10 h-10" />
                        <p className="font-semibold text-base ml-2">MUA VÉ</p>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center min-h-screen py-10">
          <Spin spinning={isFetching} size="large" tip="Loading..." />
        </div>
      )}

      {movie ? (
        <div
          className={`block sm:hidden relative bg-cover ${
            isShowing ? "min-h-[600px]" : "min-h-screen"
          }`}
          style={{
            backgroundImage: `url(${movie?.image})`,
          }}
        >
          <div className="absolute inset-0 bg-gray-900 opacity-75 backdrop-filter backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex flex-col justify-center text-white px-8">
            <div className="text-base font-bold">
              {movie.rated.substring(0, 1) === "P" ? (
                <span className="mt-1 border border-green-500 rounded text-green-500 px-2">
                  P
                </span>
              ) : (
                <span className="mt-1 border border-red-500 rounded text-red-500 px-1">
                  {movie.rated.substring(0, 3)}
                </span>
              )}
              <span className="text-xl py-2 ml-1"> {movie.name}</span>
              <div className="flex space-x-5 font-medium my-2">
                <div className="flex items-center">
                  <ClockIcon className="mr-2 h-5 w-5 inline-block" />
                  <p>{movie.duration} phút</p>
                </div>
                <p className="font-thin text-xl mx-5 mb-1">-</p>
                <div className="flex items-center">
                  <CalendarDaysIcon className="mr-2 h-5 w-5 inline-block" />
                  <p>
                    {new Date(movie.releaseDate).toLocaleDateString("en-UK")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                className="w-[100px] h-[150px] rounded mt-2"
                src={movie?.image}
              ></img>
              <div className="pl-4">
                <p>
                  <span className="font-medium">Thể loại: </span>
                  {movie?.genre.join(", ")}
                </p>
                <p>
                  <span className="font-medium">Đạo diễn: </span>
                  {movie?.director}
                </p>

                <p>
                  <span className="font-medium">Diễn viên: </span>
                  {movie?.actors}
                </p>
                <p>
                  <span className="font-medium"> Ngôn ngữ: </span>
                  {movie?.language}
                </p>
              </div>
            </div>
            <div className="py-2">{movie?.description}</div>

            <div className="flex items-center justify-center">
              <button
                className=" hover:text-sky-500"
                onClick={() => setIsShowPopUp(!isShowPopUp)}
              >
                <div className="flex items-center justify-center">
                  <PlayCircleIcon className="w-10 h-10" />
                  <p className="font-semibold text-base ml-2">XEM TRAILER</p>
                </div>
              </button>
              {isShowing && (
                <>
                  <p className="font-thin text-xl mx-5 mb-1">|</p>
                  <button
                    className=" hover:text-sky-500"
                    onClick={() => {
                      window.scroll({
                        top: 600,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <ArrowDownCircleIcon className="w-10 h-10" />

                      <p className="font-semibold text-base ml-2">MUA VÉ</p>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center min-h-screen my-10">
          <Spin size="large" tip="Loading..." />
        </div>
      )}

      {id && isShowing && <MovieShowtime movieId={id} />}

      {movie && isShowPopUp && (
        <PopUpYoutube
          link={movie.trailer_url}
          setIsShowPopUp={setIsShowPopUp}
        ></PopUpYoutube>
      )}
    </>
  );
};
