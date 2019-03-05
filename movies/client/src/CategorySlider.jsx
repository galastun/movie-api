import React from 'react';

/**
 * Horizontally sliding container for movie tiles.
 * 
 * @param {Object} props
 * @returns {ReactElement}
 */
export default function CategorySlider(props) {
  const { id, title, children } = props;

  return (
    <div key={ id } className="category-container">
      <h2>{ title }</h2>
      <div className="flex-container category-slider">{ children }</div>
    </div>
  );
}
