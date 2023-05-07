import { useNavigate } from "react-router-dom";
import { Movie } from "../../interface/Interface";

export const MovieCard: React.FC<{movie: Movie, isShowing: boolean}> = ({movie, isShowing})=>{
    const navigate = useNavigate();
  
    return (
      <div
        key={movie.id}
        className="sm:w-[192px] w-[170px] sm:h-[455px] h-[420px] relative"
      >
                  {/* {movie.rated.substring(0, 1) === "P" ? (
                      <p className="absolute top-2 left-2 bg-green-500 rounded-full font-semibold text-white py-1 px-[11px] z-10">
                        P
                      </p>
                    ) : (
                      <p className="absolute top-2 left-2 bg-red-500 rounded-full font-semibold text-white p-1 z-10">
                        {movie.rated.substring(0, 3)}
                      </p>
                    )} */}
  
                  <div
                    className={`absolute top-[38px] -left-4 w-0 h-0 border-l-[16px] border-l-transparent border-t-[20px] 
                      ${
                        movie.rated.substring(0, 1) === "P"
                          ? "border-t-green-800"
                          : "border-t-[#a01419]"
                      }`}
                  />
  
                  <div className="absolute top-2 -left-4 flex h-[30px]">
                    <p
                      className={`w-[56px] font-semibold text-white py-1 z-10
                      ${
                        movie.rated.substring(0, 1) === "P"
                          ? "bg-green-600 pl-7"
                          : "bg-[#ed1c24] pl-6"
                      }`}
                    >
                      {movie.rated.substring(0, 1) === "P" ? (
                        <>P</>
                      ) : (
                        <>{movie.rated.substring(0, 3)}</>
                      )}
                    </p>
  
                    <div
                      className={`w-0 h-0 border-t-[30px] border-r-[20px] border-r-transparent z-10
                    ${
                      movie.rated.substring(0, 1) === "P"
                        ? "border-t-green-600"
                        : "border-t-[#ed1c24]"
                    }`}
                    />
                  </div>
  
                  <img
                    className="sm:w-[192px] sm:h-[276px] w-[170px] h-[240px] mx-auto cursor-pointer transition ease-in-out delay-150 hover:scale-105 duration-300 rounded"
                    src={movie.image}
                    alt={movie.name}
                    onClick={() => {
                      scroll(0, 0);
                      navigate(`/movie/${movie.id}`);
                    }}
                  ></img>
                  <div
                    className="line-clamp-2 cursor-pointer font-bold mt-3 hover:text-sky-500"
                    onClick={() => {
                      scroll(0, 0);
                      navigate(`/movie/${movie.id}`);
                    }}
                  >
                    {movie.name}
                  </div>
                  <div className="line-clamp-2">
                    <span className="font-medium">Thể loại: </span>
                    {movie.genre.join(", ")}
                  </div>
                  <div>
                    <span className="font-medium">Thời lượng: </span>
                    {movie.duration} phút
                  </div>
                  <div>
                    <span className="font-medium">Khởi chiếu: </span>
                    {new Date(movie.releaseDate).toLocaleDateString("en-UK")}
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <button
                      className="sm:px-4 px-3 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out"
                      onClick={() => {
                        scroll(0, 0);
                        navigate(`/movie/${movie.id}`);
                      }}
                    >
                      {isShowing ? <>Mua vé</> : <>Chi tiết</>}
                    </button>
                  </div>
                </div>
  
    )
    
  }