import React from 'react'
import { Showtime } from '../../interface/Interface';
import { useNavigate } from 'react-router-dom';

export const formattedTime = (time: string): string => {
    
    const date = new Date(time);
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

export const CinemaShowtime : React.FC<{showtime: Showtime}>= ({showtime}) => {
    const navigate = useNavigate();


  const handleShowtimeClick = (showtimeId: string) => {
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
  return (
    <div
    key={showtime.movie.id}
    className="lg:mx-16 my-5 mx-2"
  >
    <div className="flex">
      <img
        src={showtime.movie.image}
        alt={showtime.movie.name}
        className="rounded lg:h-[280px] lg:w-[190px] h-[150px] w-[100px]"
      ></img>
      <div className="lg:pl-12 pl-6">
        <div
          className="font-bold sm:text-xl mb-4 cursor-pointer hover:text-sky-500"
          onClick={() => {
            scroll(0, 0);
            navigate(`/movie/${showtime.movie.id}`);
          }}
        >
          {showtime.movie.rated.substring(0, 1) === "P" ? (
            <span className="border border-green-500 rounded text-green-500 px-1 mx-1">
              {showtime.movie.rated.substring(0, 1)}
            </span>
          ) : (
            <span className="border border-red-500 rounded text-red-500 px-1 mx-1">
              {showtime.movie.rated.substring(0, 3)}
            </span>
          )}

          {showtime.movie.name}
        </div>
        <div className="font-medium sm:text-lg">
          <div className="flex flex-wrap sm:gap-x-6 sm:gap-y-5 gap-x-3 gap-y-3">
            {showtime.showtimes?.map(
              (showtimeDetails:any) => (
                <button
                  key={showtimeDetails.id}
                  className="lg:w-20 lg:py-[6px] sm:w-16 w-12 p-1 bg-white border-sky-700 border-2 hover:bg-sky-500 dark:hover:bg-sky-700 dark:bg-slate-800 dark:border-slate-900 rounded"
                  onClick={() =>
                    handleShowtimeClick(showtimeDetails.id)
                  }
                >
                  {formattedTime(showtimeDetails.start)}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="border border-gray-400 my-5" />
  </div>
  )
}
