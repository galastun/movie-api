import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieTile(props) {
  const { id, title, category, rating, image } = props;

  return (
    <Link to={`/movie/${id}`} className="movie-tile-container flex-col">
      <img src={image} className="movie-tile" alt={ title } />
      <span>{ title }</span>
      <i className="text-small">{ rating }</i>
    </Link>
  );
}
