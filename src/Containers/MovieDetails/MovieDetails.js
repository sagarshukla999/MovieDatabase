import React, { Component } from "react";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import MovieDetailsDesign from "../../Components/MovieDetailsDesign/MovieDetailsDesign";

const api_key = "d1a6c240f9c4dae2020c7d78070cccde";
const url = "https://api.themoviedb.org/3/movie/";
const basePosterURL = "https://image.tmdb.org/t/p/original/";
class MovieDetails extends Component {
  state = {
    movieinfo: {},
    isLoaded: false
  };

  componentDidMount = () => {
    const movieId = this.props.match.params.id;
    axios(
      url +
        movieId +
        "?api_key=" +
        api_key +
        "&append_to_response=videos,credits"
    )
      .then(response => {
        this.setState({
          movieinfo: response.data,
          isLoaded: true
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoaded: true
        });
      });
  };
  render() {
    if (!this.state.isLoaded) {
      return <Loading />;
    } else {
      return (
        <>
          <MovieDetailsDesign
            backdrop_path={basePosterURL + this.state.movieinfo.backdrop_path}
            poster_path={basePosterURL + this.state.movieinfo.poster_path}
            info={this.state.movieinfo}
          />
        </>
      );
    }
  }
}

export default MovieDetails;
