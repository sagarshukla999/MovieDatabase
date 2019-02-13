import React from "react";
import { Pagination } from "react-bootstrap";
const ShowMovies = props => (
  <>
    <div
      style={{
        color: "darkgray",
        fontWeight: "700",
        fontSize: "1.3em"
      }}
    >
      {props.children}
    </div>
    <div>{props.movies}</div>
    <Pagination style={{ marginLeft: "4%" }}>
      <Pagination.Prev onClick={props.prevPage} />
      {props.items}
      <Pagination.Next onClick={props.nextPage} />
    </Pagination>
  </>
);

export default ShowMovies;
