import React, { Component } from "react";
import { Rate, Image, Tag } from "antd";
import GenresContext from "../context/genres-context";

import "./movie-card.css";
export default class MovieCard extends Component {
  
  static contextType = GenresContext;


  state = {
    genresData: this.createGenresList(this.context),
  };

  createGenresList(context) {
    context.then((results) => this.setState({ genresData: results }));
  }

  transformGenres(genres) {
    const { genresData } = this.state;
    const newArr = [];
    genres.forEach((item) => {
      genresData.forEach((genre) => {
        if (item === genre.id) {
          newArr.push(genre);
        }
      });
    });
    return newArr.map((item) => (
      <Tag key={item.id} color="default">
        {item.name}
      </Tag>
    ));
  }

  render() {
    const { genresData } = this.state;
    const {moviesData: {id, name, date, rated, desriptions, poster}} = this.props
    const isValidPoster = (poster) => {
      let path = poster ? `https://image.tmdb.org/t/p/w500${poster}` : '';
      return path;
    };
    const posterPath = isValidPoster(poster);

    return (
      <div className="movie-card" key={id}>
        <Image src={posterPath} style={{float:"left", width:180, height:280}}/>
        <div className="movie-card__content">
          <h2 style={{ marginTop: 10, fontSize: 16, textAlign: 'left', paddingRight: 50 }}>{name}</h2>
          <p style={{ fontSize: 12, textAlign: 'left', color: '#827E7E', marginTop: 5, marginBottom: 5 }}>
          {date}</p>
          <div className="movie-card__rating-ring">{rated}</div>
          {/* <div className="movie-card__tags">{this.transformGenres(genresData)}</div> */}
          <p style={{ fontSize: 12, textAlign: 'left' }}>{desriptions}</p>
          <div className="movie-card__stars">
            <Rate count={10} style={{ fontSize: 12, marginTop: 'auto' }} onChange={() => {}}/>
          </div>  
        </div>  
      </div>
    );
  }
}
