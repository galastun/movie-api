import React from 'react';

export default function ActorInfo(props) {
  const { image, name } = props;

  return (
    <div className="flex-container actor-title">
      <img src={ props.image } className='actor-image' />
      <span>{ props.name }</span>
    </div>
  );
}