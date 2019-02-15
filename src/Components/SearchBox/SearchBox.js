import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import "./SearchBox.css";
const searchBox = props => {
  //console.log(props);
  const genres = props.genre.map(genre => {
    return (
      <option key={genre.id} value={genre.id}>
        {genre.name}
      </option>
    );
  });
  return (
    <>
      <Form>
        <Form.Row>
          <Col xs={12} md={12}>
            <div
              style={{
                color: "darkgray",
                fontWeight: "700",
                fontSize: "1.3em"
              }}
            >
              Search Parameters
            </div>
            <Form.Label className="Color">Genre</Form.Label>
            <Form.Control id="multiselect" as="select" multiple>
              {genres}
            </Form.Control>
          </Col>
          <Col xs={6} md={12}>
            <Form.Label className="Color">From Date</Form.Label>
            <Form.Control id="FromDate" type="date" />
          </Col>
          <Col xs={6} md={12}>
            <Form.Label className="Color">To Date</Form.Label>
            <Form.Control id="ToDate" type="date" />
          </Col>
          <Col xs={6} md={12}>
            <Form.Label className="Color">
              Rating Above (Range: 0-10)
            </Form.Label>
            <Form.Control id="AbvRating" type="number" min="0" max="10" />
          </Col>
          <Col xs={6} md={12}>
            <Form.Label className="Color">
              Rating Below (Range: 0-10)
            </Form.Label>
            <Form.Control id="BelRating" type="number" min="0" max="10" />
          </Col>
          <Col xs={6} md={12}>
            <Form.Label className="Color">SortBy</Form.Label>
            <Form.Control id="SortBy" as="select">
              <option value="popularity.asc">Popularity Ascending</option>
              <option value="popularity.desc">Popularity Descending</option>
              <option value="resease_date.asc">Release Date Ascending</option>
              <option value="resease_date.desc">Resease Date Descending</option>
            </Form.Control>
          </Col>
          <Col style={{ marginTop: "auto" }}>
            <Button onClick={props.search} variant="outline-info">
              Search
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </>
  );
};
export default searchBox;
