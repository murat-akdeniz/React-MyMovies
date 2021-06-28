
import React, { Component } from 'react'
import MovieList from './MovieList'
import SearchBar from './SearchBar'
import axios from 'axios'
require('dotenv').config()
console.log(process.env.REACT_APP_API_KEY);

class App extends Component {
    state = {
        movies: [],
        searchQuery: ''
    }

    async componentDidMount() {
        const response = await axios.get(`https://api.themoviedb.org/4/list/7097116?page=1&api_key=${process.env.REACT_APP_API_KEY}`);
        console.log(response);
        this.setState({ movies: response.data.results });
    }

    //AXIOS İLE DELETE
    deleteMovie = async (movie) => {
        //burada anlık tıklanan buton dışındakileri döndür yeni bir arraya
        axios.post(`https://api.themoviedb.org/3/list/7097116/remove_item?media_id=${movie.id}&session_id=${process.env.REACT_APP_SESSION_ID}&api_key=${process.env.REACT_APP_API_KEY}`);

        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        )

        this.setState(state => ({
            movies: newMovieList
        }))
    }
    searchMovie = (event) => {
        this.setState({ searchQuery: event.target.value })
    }
    render() {
        let filteredMovies = this.state.movies.filter((movie) => {
            return movie.original_title.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
        })
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-lg-12">
                        <SearchBar searchMovieProp={this.searchMovie} />
                    </div>
                </div>
                <MovieList movies={filteredMovies} deleteMovieProp={this.deleteMovie} />

            </div>
        )
    }
}

export default App


