import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';

class HomePage extends Component {
    state = { movies: [] }

    componentWillMount() {
       axios.get(API_URL_1 + '/movies')
       .then(movie => {
           this.setState({movies: movie.data});
       });
    }

    renderMovieList = () => {
        return this.state.movies.map(movie => 
            <div key={movie.id} className="merdeka">
                <a href={movie.url}>
                    <img href={movie.url} src={movie.image} alt={movie.id} />
                    <p className="legend">{movie.title}</p>
                </a>
            </div>
        );
    }

    render() {
        return (
            <div style={{ marginTop: "80px" }}>
                <Carousel  showThumbs={false} showIndicators={true} className="container kucing">
                {this.renderMovieList()}
                </Carousel>
            </div>
        );
    }
}

export default HomePage;