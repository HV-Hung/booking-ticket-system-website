import React, { useEffect, useState } from "react";
import { LineWithText } from "../../components/LineWithText";
import { ListDays } from "../../components/ListDays";
import { Province } from "../../interface/Interface";
import { useQuery } from "react-query";
import { api } from "../../api/api";
import useGet from "../../api/useGet";
import { Spin } from "antd";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { formattedTime } from "../Cinemas/CinemaShowtime";
import { useNavigate } from "react-router-dom";

export const MovieShowtime: React.FC<{ movieId: string }> = ({ movieId }) => {
  const [date, setDate] = React.useState<string>(
    new Date().toLocaleDateString()
  );
  const navigate = useNavigate();
  const [provinceSelected, setProvinceSelected] = useState<Province>();
  const { data: provinces } = useGet("province", { filter: "notNull" });
  const {
    data: showtimesByCinema,
    isFetching: isShowtimeFetching,
    refetch: refetchShowtimes,
  } = useQuery(
    "showtime/movie",
    async () => {
      const { data } = await api.get("showtime/movie", {
        params: {
          date: date,
          provinceId: provinceSelected?.id,
          movieId: movieId,
        },
      });
      return data;
    },
    {
      enabled: false,
      cacheTime: 0,
    }
  );
  const handleShowtimeClick = (showtimeId: string) => {
    navigate(`/booking/${showtimeId}`);
    // if (user) {
    //   scroll(0, 0);
    //   navigate(`/booking/${showtimeId}`);
    // } else {
    //   localStorage.setItem("link", `/booking/${showtimeId}`);
    //   openNotification("info", "Vui lòng đăng nhập để tiếp tục");
    //   scroll(0, 0);
    //   navigate(`/login`);
    // }
  };

  useEffect(() => {
    if (provinceSelected && date) refetchShowtimes();
  }, [provinceSelected, date]);

  return (
    <div className="sm:mx-12 mx-2">
      <LineWithText>TỈNH THÀNH</LineWithText>
      <div className="flex flex-wrap sm:gap-x-10 gap-x-5 gap-y-5  justify-center sm:py-2">
        {provinces?.data.map((province: Province) => (
          <div
            key={province.id}
            onClick={() => setProvinceSelected(province)}
            className={`text-base lg:text-lg  px-2 lg:px-5 py-2 border-sky-700 border-[2px] cursor-pointer hover:bg-sky-500 dark:hover:bg-sky-700 dark:border-slate-900 rounded
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
      {provinceSelected && (
        <>
          <LineWithText>CHỌN NGÀY</LineWithText>
          <ListDays setDate={setDate}></ListDays>
          <LineWithText>LỊCH CHIẾU PHIM</LineWithText>

          <Spin spinning={isShowtimeFetching} size="large" tip="Loading...">
            <div>
              {showtimesByCinema && showtimesByCinema.length > 0 ? (
                <div className="lg:mx-10">
                  {showtimesByCinema?.map((showtime: any) => (
                    <div key={showtime.cinema.id}>
                      <div className="flex sm:flex-row flex-col sm:items-center sm:pl-10 pl-5">
                        <div className="sm:text-xl text-base font-bold sm:py-4 pb-4 sm:w-2/5 w-full flex items-center">
                          <button
                            onClick={() => {
                              window.open(
                                showtime.cinema.address_url,
                                "_blank"
                              );
                            }}
                          >
                            <MapPinIcon className="sm:w-10 sm:h-10 h-6 w-6 sm:mr-2 mr-1" />
                          </button>
                          {showtime.cinema.name}
                        </div>

                        <div className="font-medium sm:text-lg sm:w-3/5 w-full">
                          <div className="flex flex-wrap sm:gap-x-6 gap-x-3 gap-y-4">
                            {showtime.showtimes?.map((showtimeDetails: any) => (
                              <button
                                key={showtimeDetails.id}
                                className="lg:w-20 lg:py-[6px] sm:w-16 w-12 px-1 bg-white border-sky-700 border-2 hover:bg-sky-500 dark:hover:bg-sky-700 dark:bg-slate-800 dark:border-slate-900 rounded"
                                onClick={() =>
                                  handleShowtimeClick(showtimeDetails.id)
                                }
                              >
                                {formattedTime(showtimeDetails.start)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="border border-gray-400 my-5" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="font-semibold text-center text-xl my-10">
                  KHÔNG CÓ SUẤT CHIẾU PHÙ HỢP
                </div>
              )}
            </div>
          </Spin>
        </>
      )}
    </div>
  );
};
