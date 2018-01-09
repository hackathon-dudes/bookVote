import React, { Component } from 'react';
import CategorySelection from './CategorySelection.js';
import SubcategorySelection from './SubcategorySelection.js';
import SearchResult from './SearchResult.js';
import url from '../../config';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFilter, setSearchQuery, setResponseData } from '../../actions';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      category:'ALL',
      subcategory: null,
      filter: 'SUBJECT',
      subject: 'math',
      response: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  componentWillMount(){
    if(this.state && this.state.response === null)
    axios.post(`${url}/API/Search`, {})
      .then((res) => {
        this.props.setResponseData(res.data);
        this.setState({response : res.data});
      })
      .catch(e => {
        console.error(e);
      })
  }
  handleChange(event) {
    const value = event.target.type === 'text' ? event.target.value : event.target.value;
    const name = event.target.name;
    let result;
    switch(name) {
      case 'subject':
        result = this.props.setSearchQuery(value);
        break;
        case 'filter':
        default:
          result = this.props.setFilter(value);
        break;
    }
    this.setState({ [name]: result.payload });
  }

  handleSubmit(e) {
      e.preventDefault();
      let o = {}
      switch(this.props.filter) {
        case 'ISBN':
          o.ISBN = this.props.search;
          break;
        case 'TITLE':
          o.TITLE = this.props.search;
          break;
        case 'AUTHOR':
          o.AUTHOR = this.props.search;
          break;
        case 'SUBJECT':
        default:
          o.QUERY = this.props.search
      }
      
      if(this.state.category !== 'All')
        o.CATEGORY = this.props.category;

      if(this.state.subcategory)
        o.SUBCATEGORY = this.props.subcategory;

      axios.post(`${url}/API/Search`, o)
      .then((res) => {
        this.props.setResponseData(res.data);
        this.setState({ response: res.data });
      })
      .catch(e => {
        console.error(e);
      })
  }

  createSearchResults(res) {
    return res.map(e => <SearchResult results={e} key={e._id} />);
  }

  componentDidMount(){
    this.setState({
      category:this.props.category,
      subcategory: this.props.subcategory,
      filter: this.props.filter,
      subject: this.props.subject,
      response: this.props.response
    })
  }

  render() {
    return (
      <div className="Search">
        <header className="Search-header">
          {this.props.category}
          {this.props.subcategory ? ' >> ' : null}
          {this.props.subcategory ? this.props.subcategory : null}
        </header>
          <CategorySelection />
          <SubcategorySelection />
        <form onSubmit={this.handleSubmit}>
          <input
            name="subject"
            type="text"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <select
            name="filter"
            value={this.state.filter}
            onChange={this.handleChange}
          >
            <option value="SUBJECT">Subject</option>
            <option value="TITLE">Title</option>
            <option value="AUTHOR">Author</option>
            <option value="ISBN">ISBN</option>
          </select>
          <button type="submit">Search</button>
        </form>
          {this.state.response
            ? this.state.response.hasOwnProperty('RESPONSE')
            ? null
            : this.createSearchResults(this.state.response)
            : null}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  category:state.category,
  subcategory: state.subcategory,
  filter: state.filter,
  search: state.search,
  response: state.response
});

export const mapDispatchToProps = dispatch => bindActionCreators({ setFilter, setSearchQuery, setResponseData}, dispatch);
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Search));