import KEY_API from "../libs/libs.js";

export default class MoviedbApi {
  _url = "https://api.themoviedb.org/3";

  async getResponseApi(keyward) {
    const request = await fetch(
      `${
        this._url
      }/search/movie?api_key=${KEY_API}&query=${keyward}&per_page=${1}`
    );
    const response = await request.json().then((body) => body.results);
    const results = await response;
    return results;
  }
}
