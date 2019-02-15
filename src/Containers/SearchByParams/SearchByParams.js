import React, { Component } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import Searchbox from "../../Components/SearchBox/SearchBox";
import axios from "axios";
import "../UpcomingMovies/Upcoming.css";
import ShowMovies from "../../Components/ShowMovies/ShowMovies";
import MovieBox from "../../Components/MovieBox/MovieBox";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import NoData from "../../Components/NoData/Nodata";
import { URL } from "../../Components/URL/URL";
import "./SearchByParams.css";

class SearchByParams extends Component {
  state = {
    isLoaded: true,
    searchParams: "",
    page: 1,
    content: [],
    totalpages: 0
  };
  searchParams = () => {
    let searchParam = "";
    let selected = document.getElementById("multiselect");
    let query = "";
    for (let i = 0; i < selected.length; i++) {
      if (selected.options[i].selected)
        if (query === "") {
          query = selected.options[i].value;
        } else {
          query += "," + selected.options[i].value;
        }
    }

    if (query !== "") {
      searchParam += "&with_genres=" + query;
    }

    let FromDate = document.getElementById("FromDate").value;
    let ToDate = document.getElementById("ToDate").value;
    if (FromDate && ToDate) {
      if (FromDate > ToDate) {
        alert("From Date should be later than To Date");
        return;
      }
    }
    let AbvRating = document.getElementById("AbvRating").value;
    let BelRating = document.getElementById("BelRating").value;
    if (AbvRating && BelRating) {
      if (AbvRating > BelRating) {
        alert("Below rating should be greater than lower rating");
        return;
      }
    }
    if (AbvRating) {
      if (AbvRating > 10 || AbvRating < 0) {
        alert("Rating Above should be within the range 0 to 10");
        return;
      }
    }
    if (BelRating) {
      if (BelRating > 10 || BelRating < 0) {
        alert("Rating Below should be within the range 0 to 10");
        return;
      }
    }

    let SortBy = document.getElementById("SortBy").value;

    if (FromDate) {
      searchParam += "&release_date.gte=" + FromDate;
    }
    if (ToDate) {
      searchParam += "&release_date.lte=" + ToDate;
    }
    if (AbvRating) {
      searchParam += "&vote_average.gte=" + AbvRating;
    }
    if (BelRating) {
      searchParam += "&vote_average.lte=" + BelRating;
    }
    searchParam += "&sort_by=" + SortBy;

    this.setState({
      searchParams: searchParam
    });
    this.getpageDetails(1, searchParam);
  };

  getpageDetails = (page, searchquery = this.state.searchParams) => {
    this.setState({
      isLoaded: false
    });

    axios(
      URL.url +
        "discover/movie" +
        URL.api_key +
        "&language=en-US" +
        searchquery +
        "&page=" +
        page
    )
      .then(response => {
        const filteredmovie = response.data.results.filter(movie => {
          return movie.poster_path != null;
        });
        var sliceindex = Math.floor(filteredmovie.length / 5);
        const movies = filteredmovie.slice(0, sliceindex * 5);
        //console.log(response);
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

  render() {
    const movies = this.state.content.map(movie => {
      var posterpath;
      posterpath = URL.basePosterURLSmall + movie.poster_path;
      return (
        <Col md={3} xs={4} key={movie.id}>
          <Link to={"/MovieDetails/" + movie.id} key={movie.id}>
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
    let output;
    if (!this.state.isLoaded) {
      output = <Loading />;
    } else if (this.state.content.length === 0) {
      output = <NoData />;
    } else {
      output = (
        <>
          <ShowMovies
            movies={movies}
            items={items}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
          />
        </>
      );
    }

    return (
      <Row className="Overflow1">
        <Col xs={12} md={2} style={{ textAlign: "left" }}>
          <Searchbox genre={this.props.genre} search={this.searchParams} />
        </Col>
        <Col xs={12} md={9}>
          <div className="Overflow2">{output}</div>
        </Col>
      </Row>
    );
  }
}

export default SearchByParams;
