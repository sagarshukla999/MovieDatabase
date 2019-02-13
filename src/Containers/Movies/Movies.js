import React, { Component } from "react";
import axios from "axios";
import MovieGenre from "../MovieGenre/MovieGenre";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

const key = "?api_key=d1a6c240f9c4dae2020c7d78070cccde";
const baseURL = "https://api.themoviedb.org/3";
const trending = "/trending/movie/day";
const basePosterURL = "http://image.tmdb.org/t/p/original/";
class Movies extends Component {
  state = {
    trending: [],
    isLoaded: false
  };

  componentDidMount() {
    axios(baseURL + trending + key + "&language=en-US")
      .then(response => {
        let trending = response.data.results.slice(0, 10);
        this.setState({
          trending: trending,
          isLoaded: true
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoaded: true
        });
      });
  }
  render() {
    const posts = this.props.genre.map(post => {
      return (
        <MovieGenre
          loaded={this.state.isLoaded}
          type={post.name}
          id={post.id}
          key={post.id}
        />
      );
    });

    const filteredtrending = this.state.trending.filter(movie => {
      return movie.backdrop_path != null;
    });

    const trending = filteredtrending.map(movie => {
      const posterpath = basePosterURL + movie.backdrop_path;
      return (
        <Carousel.Item key={movie.id} style={{ height: "90vh" }}>
          <Link to={"/MovieDetails/" + movie.id} key={movie.id}>
            <img
              className="d-block w-100"
              src={posterpath}
              alt={movie.original_title}
            />
          </Link>
          <Carousel.Caption>
            <h3>{movie.original_title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });

    if (!this.state.isLoaded) {
      return <Loading />;
    } else {
      return (
        <div style={{ height: "92vh", overflowY: "auto" }}>
          <Carousel
            interval={4000}
            pauseOnHover={false}
            style={{ height: "90vh" }}
          >
            {trending}
          </Carousel>
          {posts}
        </div>
      );
    }
  }
}

export default Movies;
