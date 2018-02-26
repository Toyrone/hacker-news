import React, { Component } from 'react';
import logo from '../logo.svg';
import Search from './Search';
import Table from './Table';
import '../App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
];


class App extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      list,
      searchTerm: '',
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter( item => item.objectID !== id);
    this.setState({ list: updatedList});

    // Alt: 1
    // const isNotId = item => item.objectID !== id;
    // const updatedList = this.state.list.filter(isNotId);

    // Alt: 2
    // const updatedList = this.state.list.filter( item => (
    //   item.objectID !== id;
    // ));
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value})
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>
        <Table
          searchTerm={searchTerm}
          onDismiss={this.onDismiss}
          list={list}
        />

      </div>
    );
  }
}

export default App;
