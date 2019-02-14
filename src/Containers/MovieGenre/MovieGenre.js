import React, { Component } from "react";
import { Badge } from "react-bootstrap";
import axios from "axios";
import MovieBox from "../../Components/MovieBox/MovieBox";
import "./MovieGenre.css";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const baseURL =
  "http://api.themoviedb.org/3/discover/movie?api_key=d1a6c240f9c4dae2020c7d78070cccde";
const basePosterURL = "http://image.tmdb.org/t/p/w185/";
class MovieGenre extends Component {
  state = {
    movies: []
  };

  componentDidMount = () => {
    axios(baseURL + "&with_genres=" + this.props.id)
      .then(response => {
        const posts = response.data.results.slice(0, 20);
        this.setState({
          movies: posts
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const filteredposts = this.state.movies.filter(movie => {
      return movie.poster_path != null;
    });

    const posts = filteredposts.map(movie => {
      var posterpath;
      posterpath = basePosterURL + movie.poster_path;
      return (
        <Link to={"/MovieDetails/" + movie.id} key={movie.id}>
          <MovieBox title={movie.title} key={movie.id} poster={posterpath} />
        </Link>
      );
    });

    let responsive = {
      0: { items: 1 },
      600: { items: 3 },
      1024: { items: 6 }
    };
    return (
      <>
        <Link to={"/genre/" + this.props.id + "/" + this.props.name}>
          <h1 style={{ display: "inline-block" }}>
            <Badge style={{ color: "#66fcf1" }}>{this.props.type}</Badge>
          </h1>
        </Link>
        <AliceCarousel
          items={posts}
          duration={2000}
          responsive={responsive}
          autoPlay={true}
          startIndex={1}
          fadeOutAnimation={true}
        />
      </>
    );
  }
}

export default MovieGenre;
