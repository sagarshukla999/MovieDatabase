import React, { Component } from "react";
import axios from "axios";
import { Col, Pagination } from "react-bootstrap";
import MovieBox from "../../Components/MovieBox/MovieBox";
import { Link } from "react-router-dom";
import "./Upcoming.css";
import ShowMovies from "../../Components/ShowMovies/ShowMovies";
import Loading from "../../Components/Loading/Loading";
import NoData from "../../Components/NoData/Nodata";
import { URL } from "../../Components/URL/URL";

class UpcomingMovies extends Component {
  state = {
    page: 1,
    content: [],
    totalpages: 0,
    url: "",
    isLoaded: false
  };

  getpageDetails = (number, url = this.state.url) => {
    this.setState({
      isLoaded: false
    });

    axios(url + number)
      .then(response => {
        const filteredmovie = response.data.results.filter(movie => {
          return movie.poster_path != null;
        });
        var sliceindex = Math.floor(filteredmovie.length / 6);
        const movies = filteredmovie.slice(0, sliceindex * 6);
        if (movies.length === 0) {
          alert("No Movies");
        }
        if (response.data.total_pages > 25) {
          this.setState({
            content: movies,
            page: response.data.page,
            isLoaded: true,
            totalpages: 25
          });
        } else {
          this.setState({
            content: movies,
            page: response.data.page,
            isLoaded: true,
            totalpages: response.data.total_pages
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoaded: true
        });
      });
  };
  nextPage = () => {
    let page = this.state.page;
    if (page === this.state.totalpages - 1) {
      return;
    } else {
      this.getpageDetails(page + 1);
    }
  };
  prevPage = () => {
    let page = this.state.page;
    if (page === 1) {
      return;
    } else {
      this.getpageDetails(page - 1);
    }
  };

  componentDidMount = () => {
    let url;
    url = URL.url + "movie/upcoming" + URL.api_key + "&language=en-US&page=";
    //console.log(url);
    this.setState({
      url: url
    });
    this.getpageDetails(1, url);
  };
  render() {
    const movies = this.state.content.map(movie => {
      var posterpath;
      posterpath = URL.basePosterURLSmall + movie.poster_path;
      return (
        <Col md={2} xs={4} key={movie.id}>
          <Link to={"/MovieDetails/" + movie.id}>
            <MovieBox title={movie.title} key={movie.id} poster={posterpath} />
          </Link>
        </Col>
      );
    });
    let active = this.state.page;
    let items = [];
    for (let number = 1; number < this.state.totalpages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => this.getpageDetails(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (!this.state.isLoaded) {
      return <Loading />;
    } else if (this.state.content.length === 0) {
      return <NoData />;
    } else {
      return (
        <div style={{ height: "92vh", overflowY: "auto", overflowX: "hidden" }}>
          <ShowMovies
            movies={movies}
            items={items}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
          >
            Upcoming Movies
          </ShowMovies>
        </div>
      );
    }
  }
}

export default UpcomingMovies;
