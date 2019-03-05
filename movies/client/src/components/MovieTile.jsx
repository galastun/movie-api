import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Displays the movie image and basic information.
 *
 * @param {Object} props
 * @returns {ReactElement}
 */
export default function MovieTile(props) {
  const {
    id,
    title,
    rating,
    image,
  } = props;

  return (
    <Link to={`/movie/${id}`} className="movie-tile-container flex-col">
      <img src={image} className="movie-tile" alt={title} />
      <span>{ title }</span>
      <i className="text-small">{ rating }</i>
    </Link>
  );
}

MovieTile.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
