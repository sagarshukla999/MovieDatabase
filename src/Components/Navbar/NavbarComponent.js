import React from "react";

import {
  Navbar,
  Nav,
  Form,
  Button,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const navbarcomponent = props => {
  const genres = props.genre.map(genre => {
    let link = "/genre/" + genre.id + "/" + genre.name;
    return (
      <Dropdown.Item key={genre.id} href={link}>
        {genre.name}
      </Dropdown.Item>
      // <p key={genre.id}>
      //   <NavLink className="genre" to={link}>
      //     {genre.name}
      //   </NavLink>
      // </p>
    );
  });
  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      props.search();
      return false;
    }
  };

  //var d = (document.getElementById("Genredropdown").className = "active");
  //d.className += "active";

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <NavLink to={"/"} className="appname">
          The Movie Database
        </NavLink>
        <Nav className="nav mr-auto">
          <NavLink to={"/upcoming"}>Upcoming</NavLink>
          <DropdownButton title="Genre" id="Genredropdown">
            {genres}
          </DropdownButton>
          <NavLink to={"/searchparams"}>Search</NavLink>
        </Nav>
        <Form inline>
          <input
            type="text"
            id="searchmovie"
            placeholder="Search"
            onKeyDown={handleKeyPress}
          />
          <Button onClick={props.search} variant="outline-info">
            Search
          </Button>
        </Form>
      </Navbar>
    </>
  );
};

export default navbarcomponent;
