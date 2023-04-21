import KEY_API from "../libs/libs.js";
import { format } from "date-fns";
import TextFormat from "./text-format.js";

export default class MoviedbApi {
  _url = "https://api.themoviedb.org/3";

  _textFormat = new TextFormat();

  totalResults = 0;

  async getResponseMovies(keyward, page) {
    if (keyward !== " ") {
      const request = await fetch(
        `${this._url}/search/movie?api_key=${KEY_API}&query=${keyward}&per_page=${page}`
      );
      if (!request.ok) {
        throw new Error(
          `Could not fetch ${this._url}` + `, received ${request.status}`);
      }
      const response = await request.json();
      this.totalResults = await response.total_results
      const data = await response.results.map((item)=> this.transformMovie(item))
      return data;
    } else {
      return []
    }
  }
  async getGengers() {
    const request = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY_API}&language=en-US`
    );
    const response = await request.json();
    return response.genres;
  }

  transformMovie(movie) {
    try {
      return {
        id: movie.id,
        poster: movie.poster_path || "/pBwqs2Q8TwJMi7rt4C9hTRXsA20.jpg",
        name: movie.original_title,
        rated: movie.vote_average,
        date: format(new Date(movie.release_date), `MMMM dd, yyyy`),
        genres: movie.genre_ids,
        desriptions: this._textFormat.truncate(movie.overview),
        stars: null,
        rating: movie.rating || null,
      };
    } catch (error) {
      return console.log(error);
    }
  }
}
