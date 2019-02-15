import React, { Component } from "react";
import NavbarComponent from "../../Components/Navbar/Navbarold";
import Movies from "../Movies/Movies";
import "./Layout.css";
import axios from "axios";
import { Route, withRouter, Switch } from "react-router-dom";
import MovieDetails from "../MovieDetails/MovieDetails";
import UpcomingMovies from "../UpcomingMovies/UpcomingMovies";
import SearchByText from "../SearchByText/SearchByText";
import MovieByGenre from "../MoviesByGenre/MoviesByGenre";
import SearchByParams from "../SearchByParams/SearchByParams";
import { URL } from "../../Components/URL/URL";

class Layout extends Component {
  state = {
    searchtext: "",
    genre: []
  };

  componentDidMount() {
    axios(URL.url + "genre/movie/list" + URL.api_key + "&language=en-US")
      .then(response => {
        this.setState({
          genre: response.data.genres
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getSearchText = () => {
    let value = document.getElementById("searchmovie").value;

    if (value) {
      this.setState({
        searchtext: value
      });
      this.props.history.push("/search/name");
    }
  };

  render() {
    return (
      <>
        <NavbarComponent genre={this.state.genre} search={this.getSearchText} />
        <main>
          <Switch>
            <Route
              path="/"
              render={props => <Movies genre={this.state.genre} {...props} />}
              exact
            />
            <Route path="/MovieDetails/:id" component={MovieDetails} exact />
            <Route path="/upcoming" component={UpcomingMovies} exact />
            <Route path="/genre/:id/:name" component={MovieByGenre} exact />
            <Route
              path="/search/name"
              render={props => (
                <SearchByText searchtext={this.state.searchtext} {...props} />
              )}
            />
            <Route
              path="/searchparams"
              render={props => (
                <SearchByParams genre={this.state.genre} {...props} />
              )}
            />
            <Route
              render={() => (
                <div style={{ color: "white", height: "100vh" }}>
                  <h1>Not a valid URL</h1>
                </div>
              )}
            />
          </Switch>
        </main>
      </>
    );
  }
}

export default withRouter(Layout);
