import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays CategorySliders for all movies based on their category.
 *
 * @param {Object} props
 * @returns {ReactElement}
 */
export default function MaxRating(props) {
  const { selected, ratings, onChange } = props;

  const options = [];

  ratings.forEach((rating) => {
    options.push(
      <option key={rating} value={rating}>{ rating }</option>,
    );
  });

  return (
    <div className="max-rating">
      <label htmlFor="rating-select">
        <i className="fas fa-lock" />
        <span> Max Rating</span>
        <select
          id="rating-select"
          value={selected}
          onChange={(e) => { onChange(e.target.value); }}
        >
          { options }
        </select>
      </label>
    </div>
  );
}

MaxRating.defaultProps = {
  selected: 'NC-17',
};

MaxRating.propTypes = {
  selected: PropTypes.string,
  ratings: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
