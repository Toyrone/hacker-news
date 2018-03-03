import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Search from './components/Search';
import Button from './components/Button';
import Table from './components/Table';

import renderer from 'react-test-renderer';

// describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

//   test('has a vaid snapshot', () => {
//     const component = renderer.create(<App />);
//
//     let tree = component.JSON();
//     expect(tree).toMatchSnapshot();
//   });
//
//   // it('renders a snapshot', () => {
//   //   const tree = renderer.create(<App />).JSON();
//   //   expect(tree).toMatchSnapshot();
//   // })
// });
//
//
// describe('Search', () => {
//
//   it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<Search>Search</Search>, div);
//   });
//
//   it('renders a snapshot', () => {
//     const tree = renderer.create(<Search>Search</Search>).JSON();
//     expect(tree).toMatchSnapshot();
//   })
//
// });
//
// describe('Button', () => {
//
//   it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<Button>More</Button>, div);
//   });
//
//   it('renders a snapshot', () => {
//     const tree = renderer.create(<Button>More</Button>).JSON();
//     expect(tree).toMatchSnapshot();
//   })
//
// });
//
// describe('Table', () => {
//   const props = {
//     list: [
//       {title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y'},
//       {title: '2', author: '2', num_comments: 1, points: 2, objectID: 'x'}
//     ],
//   };
//
//   it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<Table {...props}/>, div);
//   });
//
//   it('renders a snapshot', () => {
//     const tree = renderer.create(<Table {...props} />).JSON();
//     expect(tree).toMatchSnapshot();
//   });
//
// });
