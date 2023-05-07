import React, { useEffect } from "react";
import { useState } from "react";
import { LineWithText } from "../../components/LineWithText";
import { ListDays } from "../../components/ListDays";
import { Province, Cinema, Showtime } from "../../interface/Interface";
import { MapPinIcon } from "@heroicons/react/24/outline";
import useGet from "../../api/useGet";
import { Spin } from "antd";
import { CinemaShowtime } from "./CinemaShowtime";
import { useQuery } from "react-query";
import { api } from "../../api/api";

export const Cinemas = () => {
  const [date, setDate] = React.useState<string>(
    new Date().toLocaleDateString()
  );
  const [provinceSelected, setProvinceSelected] = useState<Province>();
  const [cinemaSelected, setCinemaSelected] = useState<Cinema>();
  const { data: province } = useGet("province", { filter: "notNull" });
  const {
    data: showtimesByMovie,
    isFetching: isShowtimeFetching,
    refetch: refetchShowtimes,
  } = useQuery(
    "showtime/cinema",
    async () => {
      const { data } = await api.get("showtime/cinema", {
        params: { date: date, cinemaId: cinemaSelected?.id },
      });
      return data;
    },
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  const handleLocationClick = (linkUrl: URL) => {
    window.open(linkUrl, "_blank");
  };

  useEffect(() => {
    if (cinemaSelected && date) refetchShowtimes();
  }, [cinemaSelected, date]);

  return (
    <>
      <div className="sm:mx-12 mx-2 min-h-screen">
        <LineWithText>DANH SÁCH RẠP</LineWithText>
        {province?.data && (
          <div className="flex flex-wrap sm:gap-x-10 gap-x-5 gap-y-5 justify-center sm:py-5">
            {province?.data.map((province: Province) => (
              <div
                key={province.id}
                onClick={() => {
                  setProvinceSelected(province);
                  setCinemaSelected(undefined);
                }}
                className={`text-base lg:text-lg px-2 lg:px-5 py-2 border-sky-700 border-[2px] cursor-pointer hover:bg-sky-500 dark:hover:bg-sky-700 dark:border-slate-900 rounded
      ${
        provinceSelected?.id === province.id
          ? "bg-sky-500 dark:bg-sky-700"
          : "bg-white dark:bg-slate-800"
      }`}
              >
                <div className="font-bold">{province.name}</div>
              </div>
            ))}
          </div>
        )}
        <div className="lg:p-6 pt-5 grid sm:grid-cols-4 grid-cols-2 gap-5 lg:gap-10 px-2 lg:px-12 text-center">
          {provinceSelected &&
            provinceSelected.cinemas.map((cinema: Cinema) => (
              <div key={cinema.id}>
                <button
                  onClick={() => setCinemaSelected(cinema)}
                  className={`font-bold lg:text-base w-full h-16 border-sky-700 border-[2px] hover:bg-sky-500 dark:hover:bg-sky-700 dark:border-slate-900 rounded-t 
                  ${
                    cinemaSelected?.id === cinema.id
                      ? "bg-sky-500 dark:bg-sky-700"
                      : "bg-white dark:bg-slate-800"
                  }`}
                >
                  {cinema.name}
                </button>
                <p className="sm:block hidden xl:h-20 lg:h-24 md:h-auto bg-white border-sky-700 dark:bg-slate-800 dark:border-slate-900 border-x-[2px] border-b-[2px] px-2 py-2">
                  {cinema.address}
                </p>
                <button
                  className=" border-sky-700 border-x-[2px] border-b-[2px] bg-white p-2 w-full hover:bg-sky-500 dark:hover:bg-sky-700 dark:bg-slate-800 dark:border-slate-900 rounded-b flex justify-center"
                  onClick={() => handleLocationClick(cinema.address_url)}
                >
                  <MapPinIcon className="sm:h-6 sm:w-6 h-4 w-4" />
                </button>
              </div>
            ))}
        </div>
        {cinemaSelected && (
          <>
            <LineWithText>LỊCH CHIẾU PHIM</LineWithText>
            <ListDays setDate={setDate}></ListDays>
            <Spin spinning={isShowtimeFetching} size="large" tip="Loading...">
              {showtimesByMovie && showtimesByMovie.length > 0 ? (
                <div>
                  {showtimesByMovie?.map(
                    (showtime: Showtime, index: number) => (
                      <CinemaShowtime key={index} showtime={showtime} />
                    )
                  )}
                </div>
              ) : (
                <div className="font-semibold text-center text-xl my-10">
                  KHÔNG CÓ SUẤT CHIẾU PHÙ HỢP
                </div>
              )}
            </Spin>
          </>
        )}
      </div>
    </>
  );
};
