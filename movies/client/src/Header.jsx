import React from 'react';
import PropTypes from 'prop-types';

/**
 * Header container to display the App title.
 *
 * @param {Object} props
 * @returns {ReactElement}
 */
export default function Header(props) {
  const { title } = props;
  return (
    <header className="app-header">
      <i className="fas fa-film" />
      { title }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
