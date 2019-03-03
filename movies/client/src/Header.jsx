import React from 'react';

export default function Header(props) {
  return (
    <header className="app-header">
      <i className="fas fa-film" />
      { props.title }
    </header>
  );
}