import React from "react";
import { Card } from "react-bootstrap";
import "./MovieBox.css";

const moviebox = props => (
  <Card className="moviebox movieboxheight">
    <Card.Img variant="top" onLoad={props.isImageLoaded} src={props.poster} />
  </Card>
);

export default moviebox;
