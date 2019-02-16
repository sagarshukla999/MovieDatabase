// import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import drawerlogo from "../../Assets/drawer.png";
import search from "../../Assets/search.png";
const styles = {
  list: {
    width: 200
  },
  fullList: {
    width: "auto"
  }
};

class navbarcomponent extends Component {
  state = {
    left: false,
    open: true
  };

  toggleDrawer = open => () => {
    this.setState({
      left: open
    });
  };

  handleKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.search();
      return false;
    }
  };

  render() {
    const genres = this.props.genre.map(genre => {
      let link = "/genre/" + genre.id + "/" + genre.name;
      return (
        <ListItem button key={genre.id}>
          <NavLink style={{ marginLeft: "1em" }} className="genre" to={link}>
            {genre.name}
          </NavLink>
        </ListItem>
      );
    });

    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <NavLink to={"/"} exact>
            <ListItem button>Home</ListItem>
          </NavLink>
          <NavLink to={"/upcoming"}>
            <ListItem button>Upcoming</ListItem>
          </NavLink>
          <NavLink to={"/searchparams"}>
            <ListItem button>Search</ListItem>
          </NavLink>
        </List>
        <Divider />
        <List>
          <ListItem style={{ color: "white" }}>Genre:</ListItem>
          {genres}
        </List>
      </div>
    );

    return (
      <div>
        <div style={{ textAlign: "right", backgroundColor: "#343a40" }}>
          <span style={{ float: "left" }}>
            <Button
              style={{ minWidth: "10px" }}
              onClick={this.toggleDrawer(true)}
            >
              <img
                src={drawerlogo}
                style={{ height: "25px", width: "25px" }}
                alt="Drawer"
              />
            </Button>
            <NavLink to={"/"} className="appname">
              The Movie Database
            </NavLink>
          </span>
          <span>
            <input
              type="text"
              id="searchmovie"
              placeholder="Search"
              onKeyDown={this.handleKeyPress}
            />
            <Button id="buttonSearchMovie" onClick={this.props.search}>
              <img
                src={search}
                style={{ height: "25px", width: "25px" }}
                alt="Drawer"
              />
            </Button>
          </span>
        </div>
        <Drawer
          className="sideDrawer"
          open={this.state.left}
          onClose={this.toggleDrawer(false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

navbarcomponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(navbarcomponent);
