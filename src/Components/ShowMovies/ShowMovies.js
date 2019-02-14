import React from "react";
import { Pagination } from "react-bootstrap";
const ShowMovies = props => {
  let pages;
  if (props.items.length !== 0) {
    pages = (
      <Pagination style={{ marginLeft: "4%" }}>
        <Pagination.Prev onClick={props.prevPage} />
        {props.items}
        <Pagination.Next onClick={props.nextPage} />
      </Pagination>
    );
  } else {
    pages = <></>;
  }
  return (
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
      {pages}
    </>
  );
};

export default ShowMovies;
