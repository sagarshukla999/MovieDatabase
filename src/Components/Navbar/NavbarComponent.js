import React from "react";

import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const navbarcomponent = props => {
  const genres = props.genre.map((genre, i) => {
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
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <NavLink to={"/"} className="appname">
          Movie Database
        </NavLink>
        <Nav className="nav mr-auto">
          <NavLink to={"/upcoming"}>Upcoming</NavLink>
          <DropdownButton title="Genre" className="active" id="Genredropdown">
            {genres}
          </DropdownButton>
          <NavLink to={"/searchparams"}>Search</NavLink>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            id="searchmovie"
            placeholder="Search"
            className="mr-sm-2"
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
