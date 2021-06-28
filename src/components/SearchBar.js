import React, { Component } from 'react'

class SearchBar extends Component {

  handleFormSubmit = (event) => {
    event.preventDefault();
  }
  render() {
    return (
      <form className='mt-5' onSubmit={this.handleFormSubmit}>
        <div className="form-row mb-5">
          <div className="col-12">
            <input
              type="text"
              onChange={this.props.searchMovieProp}
              className='form-control'
              placeholder='Search a movie'

            />
          </div>
        </div>
      </form>
    )
  }
}

export default SearchBar
