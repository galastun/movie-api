import React from 'react';

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

  movies.forEach((movie, i) => {
    const { film_id: id, title, rating, category } = movie;
    let { _index, _image } = movie;

    // Add a fake image if it doesn't already have one
    if (!_image) {
      const imageNumber = Math.floor(Math.random() * 10);
      _image = movie._image = `/images/${imageNumber}.jpg`;
    }

    // Put the movie in the specific category
    categoryMap[category].push(<MovieTile
      title={ utilities.toTitleCase(title) }
      rating={ rating }
      image={ _image }
      id={ id }
      key={ id } />);
  });

  Object.entries(categoryMap).forEach((obj, i) => {
    _categories.push(
      <CategorySlider key={ i } id={ i } title={ obj[0] }>
        { obj[1] }
      </CategorySlider>
    );
  });

  return (
    <section className="movie-list">
      { _categories }
    </section>
  );
}
