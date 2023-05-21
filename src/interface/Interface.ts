export interface Movie {
  name: string;
  image: string;
  director: string;
  actors: string;
  releaseDate: Date;
  genre: string[];
  duration: number;
  language: string;
  description: string;
  rated: string;
  trailer_url: string;
  id: string;
}

export interface Province {
  name: string;
  id: string;
  cinemas: Cinema[];
}

export interface Cinema {
  name: string;
  address: string;
  address_url: URL;
  id: string;
}

export interface ShowtimeDetails {
  name: string;
  start: string;
  end: string;
  seats: string[];
  id: string;
  room: number;
  movieId: Movie;
}

export interface Showtime {
  movie: Movie;
  showtimes: ShowtimeDetails[];
  cinema: Cinema;
  showtime: ShowtimeDetails;
}

export interface Seat {
  status: 0 | 1 | 2;
  type: string;
  code: string;
  price: number;
  id: number;
}

export interface Room {
  name: string;
  id: number;
}

export interface Food {
  id: number;
  image: string;
  title: string;
  contents: string[];
  price: number;
  quantity: number;
}

export interface Ticket {
  id: number;
  foods: Food[];
  seat: string;
  seatPrice: number;
  showtime: ShowtimeDetails;
  user: User;
  paymentMethod: string;
  movieName: string;
  cinemaName: string;
  movieImage: string;
  totalTicket: number;
  totalFood: number;
  code: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDay: string;
  gender: string;
}

export interface NewsOffer {
  id: string;
  name: string;
  img: string;
  date: string;
  contents: string[];
  address: string;
  objects: string[];
  others: string[];
}
