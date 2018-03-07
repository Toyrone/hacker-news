import React, { Component } from 'react';
// import logo from '../logo.svg';
import Search from './Search';
import Table from './Table';
import ButtonWithLoading from './Button';
import Loading from './Loading';
import '../App.css';

const DEFAULT_QUERY = 'twitter';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';


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
      results: null,
      searchTerm: DEFAULT_QUERY,
      searchKey: '',
      error: null,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.searchForTopStories = this.searchForTopStories.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  searchForTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey] ? this.state.results[searchKey].hits : [];
    // const oldHits = page !== 0 ? this.state.result.hits : [];

    const updatedHits = [ ...oldHits, ...hits ];

    this.setState({
      // result: {hits: updatedHits, page}
      results: {
        ...results,
        [searchKey]:{ hits: updatedHits, page }
      },
      isLoading: false,
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true});

    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    fetch(url)
      .then(data => data.json())
      .then(result => {
        this.setSearchTopStories(result);
        // console.table(result);
      })
      .catch(e => this.setState({ error: e }));
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ isSortReverse, sortKey });
  }

  onSearchSubmit(e) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.searchForTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    e.preventDefault();
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const updatedHits = hits.filter( item => item.objectID !== id);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
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
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);

  }

  render() {
    const { searchTerm, results, searchKey, error, isLoading, sortKey, isSortReverse } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    console.log(list);
    // if (!results) { return null; }

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
        { error
          ? <div className="interactions">
              <p>Oops! Something went wrong</p>
            </div>
          : <Table
              list={list}
              onDismiss={this.onDismiss}
              sortKey={sortKey}
              onSort={this.onSort}
              isSortReverse={isSortReverse}
            />
        }
        <div className="interactions">
           <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page+1)}>
              More
            </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;
