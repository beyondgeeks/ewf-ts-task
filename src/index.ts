import { Genre, Movie } from "./index.types";
import { movies } from "./db.json";

const commonElements = (genres1: string[], genres2: Genre[]) => {
  const common = genres1.filter((genre) => {
    let isExist = false;
    for (let i = 0; i < genres2.length; i++) {
      if (genres2[i] == genre) {
        isExist = true;
        break;
      }
    }
    return isExist;
  });
  common.sort();
  genres1.sort();
  return JSON.stringify(common) === JSON.stringify(genres1) ? [...common] : [];
};

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  if (genres.length === 0) {
    return [movies[Math.floor(Math.random() * getFilteredMovies.length)]];
  }
  const filteredMovies = movies.filter(
    (movie: Movie) => commonElements(movie.genres, genres).length > 0
  );
  filteredMovies.sort((m1, m2) => {
    return (
      commonElements(m2.genres, genres).length -
      commonElements(m1.genres, genres).length
    );
  });
  return [...filteredMovies];
};
