import React from 'react';
// 
// const isSearched = searchTerm => item =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Button = ({ children, onClick, className='' }) =>
  <div>
    <button
      onClick={onClick}
      type="button"
      className={className}
    >
      Dismiss
    </button>
  </div>

export default Button;
