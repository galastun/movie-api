import React from 'react';

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
      <img src={ props.image } className='actor-image' />
      <span>{ props.name }</span>
    </div>
  );
}
