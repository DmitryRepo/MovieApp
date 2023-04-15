import React, { Component } from "react";
import { Rate, Image } from "antd";
import "./movie-card.css";
export default class MovieCard extends Component {
  render() {
    return (
      <div className="movie-card" key="1">
        <Image src="" style={{float:"left", width:180, height:280}}/>
        <div className="movie-card__content">
          <h2 style={{ marginTop: 10, fontSize: 18, textAlign: 'left', paddingRight: 50 }}>Title</h2>
          <p style={{ fontSize: 12, textAlign: 'left', color: '#827E7E', marginTop: 5, marginBottom: 5 }}>
          releaseDate</p>
          <div className="movie-card__rating-ring">10</div>
          <div className="movie-card__tags">Tags</div>
          <p style={{ fontSize: 12, textAlign: 'left' }}>Text</p>
          <div className="movie-card__stars">
            <Rate count="10" onChange={() => {}}/>
          </div>  
        </div>  
      </div>
    );
  }
}
