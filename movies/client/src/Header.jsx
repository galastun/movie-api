import React from 'react';

/**
 * Header container to display the App title.
 * 
 * @param {Object} props
 * @returns {ReactElement}
 */
export default function Header(props) {
  return (
    <header className="app-header">
      <i className="fas fa-film" />
      { props.title }
    </header>
  );
}