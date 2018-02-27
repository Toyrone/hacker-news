import React, { Component } from 'react';
// import logo from '../logo.svg';
import Search from './Search';
import Table from './Table';
import '../App.css';

const DEFAULT_QUERY = 'twitter';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

// const list = [
//   {
//     title: 'React',
//     url: 'https://facebook.github.io/react/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: 'Redux',
//     url: 'https://github.com/reactjs/redux',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   }
// ];


class App extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }
  
  setSearchTopStories(result) {
    this.setState({ result })
  }
  
  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(data => data.json())
      .then(result => {
        this.setSearchTopStories(result)
      })
      .catch(e => e);
  }
  
  onSearchSubmit(e) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    e.preventDefault();
  }
  
  onDismiss(id) {
    const updatedHits = this.state.result.hits.filter( item => item.objectID !== id);
    this.setState({ 
      result: { ...this.state.result, hits: updatedHits }
    });

    // Alt: 1
    // const isNotId = item => item.objectID !== id;
    // const updatedHits = this.state.result.hits.filter(isNotId);

    // Alt: 2
    // const updatedList = this.state.list.filter( item => (
    //   item.objectID !== id;
    // ));
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value})
    // console.log(e.target.value);
  }
  
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    
  }
  
  render() {
    const { searchTerm, result } = this.state;
    // console.log(this.state);
    
    if (!result) { return null; }
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {result 
          ? <Table
              onDismiss={this.onDismiss}
              list={result.hits}
            />
        : null}

      </div>
    );
  }
}

export default App;
