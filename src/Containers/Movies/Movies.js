import React, { Component } from "react";
import axios from "axios";
import MovieGenre from "../MovieGenre/MovieGenre";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { URL } from "../../Components/URL/URL";
import "./Movie.css";

class Movies extends Component {
  state = {
    trending: [],
    isLoaded: false
  };

  componentDidMount() {
    axios(URL.url + "trending/movie/day" + URL.api_key + "&language=en-US")
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
          name={post.name}
        />
      );
    });

    const filteredtrending = this.state.trending.filter(movie => {
      return movie.backdrop_path != null;
    });

    const trending = filteredtrending.map(movie => {
      const posterpath = URL.basePosterURL + movie.backdrop_path;
      return (
        <Carousel.Item key={movie.id} className="carouselItemMedia">
          <Link to={"/MovieDetails/" + movie.id} key={movie.id}>
            <img
              className="d-block w-100"
              src={posterpath}
              alt={movie.original_title}
            />
          </Link>
          <Carousel.Caption>
            <h1 style={{ fontSize: "4vw" }}>{movie.original_title}</h1>
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
            interval={40000}
            pauseOnHover={false}
            className="carouselMedia"
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
