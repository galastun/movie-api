import React from 'react';

export default function MovieTile(props) {
  const { title, category, rating } = props;
  const imageNumber = Math.floor(Math.random() * 10);
  const style = {
    backgroundImage: `url(images/${imageNumber}.jpg)`,
    backgroundSize: 'cover',
  };

  return (
    <div style={{ width: '150px', margin: '1.2rem', cursor: 'pointer' }}>
      <img src={`images/${imageNumber}.jpg`} className="movie-tile" alt={ title } />
      { title } - { rating }
    </div>
  );
}