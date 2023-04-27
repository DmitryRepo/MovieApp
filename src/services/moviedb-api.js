// import KEY_API from "../libs/libs.js";
import { format } from "date-fns";
import TextFormat from "./text-format.js";

export default class MoviedbApi {
  _url = "https://api.themoviedb.org/3";

  _textFormat = new TextFormat();

  KEY_API = 'f616520c820e10cdf5b59969a0010af1'

  totalResults = 0;

  async getResponseMovies(keyward, page) {
    try {
      if (keyward !== " ") {
        const request = await fetch(
          `${this._url}/search/movie?api_key=${this.KEY_API}&query=${keyward}&page=${page}`
        );
        if (!request.ok) {
          throw new Error(
            // eslint-disable-next-line no-useless-concat
            `Could not fetch ${this._url}` + `, received ${request.status}`
          );
        }
        const response = await request.json();
        this.totalResults = response.total_results;
        const data = await response.results.map((item) =>
          this.transformMovie(item)
        );
        return data;
      } else {
        return [];
      }
    } catch (error) {}
  }

  async getGengers() {
    try {
      const request = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.KEY_API}&language=en-US`
      );
      const response = await request.json();
      return response.genres;
    } catch (error) {}
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
        desriptions: this._textFormat.truncate(movie.overview, 80),
        stars: null,
        rating: movie.rating || null,
      };
    } catch (error) {}
  }

  async openGuestSession() {
    const request = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.KEY_API}`
    );
    const response = await request.json();
    return response;
  }

  async ratedMovie(guestSessoinId, movieId, rating) {
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${this.KEY_API}&guest_session_id=${guestSessoinId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: rating,
        }),
      }
    );
    const response = await request.json();
    return response;
  }

  async getRatedMovies(guestSessoinId, page) {
    const request = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessoinId}/rated/movies?api_key=${this.KEY_API}&language=en-US&sort_by=created_at.asc&page=${page}`
    );
      const response = await request.json();
      this.totalResults = response.total_results;
      const data = await response.results.map((item) =>
        this.transformMovie(item)
      );
      return data;
    }
}
