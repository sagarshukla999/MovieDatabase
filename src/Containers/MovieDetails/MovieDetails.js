import React, { Component } from "react";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import MovieDetailsDesign from "../../Components/MovieDetailsDesign/MovieDetailsDesign";
import { URL } from "../../Components/URL/URL";

class MovieDetails extends Component {
  state = {
    movieinfo: {},
    isLoaded: false
  };

  componentDidMount = () => {
    const movieId = this.props.match.params.id;
    axios(
      URL.url +
        "movie/" +
        movieId +
        URL.api_key +
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
            backdrop_path={
              URL.basePosterURL + this.state.movieinfo.backdrop_path
            }
            poster_path={URL.basePosterURL + this.state.movieinfo.poster_path}
            info={this.state.movieinfo}
          />
        </>
      );
    }
  }
}

export default MovieDetails;
