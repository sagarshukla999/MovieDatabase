import React from "react";
import { Card } from "react-bootstrap";
import "./MovieBox.css";

const moviebox = props => (
  <Card className="moviebox">
    <Card.Img variant="top" src={props.poster} />
  </Card>
);

export default moviebox;
