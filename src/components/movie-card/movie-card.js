import React, { Component } from "react";
import { Rate, Image } from "antd";
import TextFormat from "../../services/text-format";
import "./movie-card.css";
export default class MovieCard extends Component {
  _textFormat = new TextFormat()
  render() {
    const {id, title, release_date, vote_average, overview} = this.props
    const imagePath = this.props.poster_path;
    const isValidPoster = (imagePath) => {
      let path = imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : '';
      return path;
    };
    const posterPath = isValidPoster(imagePath);
    return (
      <div className="movie-card" key={id}>
        <Image src={posterPath} style={{float:"left", width:180, height:280}}/>
        <div className="movie-card__content">
          <h2 style={{ marginTop: 10, fontSize: 16, textAlign: 'left', paddingRight: 50 }}>{title}</h2>
          <p style={{ fontSize: 12, textAlign: 'left', color: '#827E7E', marginTop: 5, marginBottom: 5 }}>
          {release_date}</p>
          <div className="movie-card__rating-ring">{vote_average}</div>
          <div className="movie-card__tags">Tags</div>
          <p style={{ fontSize: 12, textAlign: 'left' }}>{this._textFormat.truncate(overview,70)}</p>
          <div className="movie-card__stars">
            <Rate count={10} style={{ fontSize: 12, marginTop: 'auto' }} onChange={() => {}}/>
          </div>  
        </div>  
      </div>
    );
  }
}
