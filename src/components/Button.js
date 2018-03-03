import React from 'react';
import Loading from './Loading';
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
      {children}
    </button>
  </div>

const withLoading = (Component) => ({isLoading, ...rest}) =>
  isLoading
    ? <Loading />
    : <Component {...rest} />

const ButtonWithLoading = withLoading(Button);

export default ButtonWithLoading;
