import React from 'react';
import PropTypes from 'prop-types';

import MovieTile from './MovieTile';
import CategorySlider from './CategorySlider';
import utilities from './utilities';

/**
 * Displays CategorySliders for all movies based on their category.
 *
 * @param {Object} props
 * @returns {ReactElement}
 */
export default function MovieList(props) {
  const { movies, categories } = props;
  const categoryMap = {};
  const _categories = [];

  categories.forEach((category) => {
    categoryMap[category.name] = [];
  });

  movies.forEach((movie) => {
    const {
      film_id: id,
      title,
      rating,
      category,
    } = movie;
    let { _image: image } = movie;

    // Add a fake image if it doesn't already have one
    if (!image) {
      const imageNumber = Math.floor(Math.random() * 10);
      image = `/images/${imageNumber}.jpg`;
      movie._image = image;
    }

    // Put the movie in the specific category
    categoryMap[category].push(<MovieTile
      title={utilities.toTitleCase(title)}
      rating={rating}
      image={image}
      id={id}
      key={id}
    />);
  });

  Object.entries(categoryMap).forEach((obj, i) => {
    _categories.push(
      <CategorySlider key={i} id={i} title={obj[0]}>
        { obj[1] }
      </CategorySlider>,
    );
  });

  return (
    <section className="movie-list">
      { _categories }
    </section>
  );
}

MovieList.propTypes = {
  movies: PropTypes.object.isRequired,
  categories: PropTypes.string.isRequired,
};
