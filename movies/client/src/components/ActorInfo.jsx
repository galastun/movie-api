import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays the actor image and name.
 *
 * @param {Object} props
 * @returns {ReactElement}
 */
export default function ActorInfo(props) {
  const { image, name } = props;

  return (
    <div className="flex-container actor-title">
      <img src={image} className="actor-image" alt={name} />
      <span>{ name }</span>
    </div>
  );
}

ActorInfo.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
