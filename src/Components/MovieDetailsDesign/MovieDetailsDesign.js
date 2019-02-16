import React from "react";
import { Container, Col, Row, Card, ListGroup } from "react-bootstrap";
import "./MovieDetailsDesign.css";
import star from "../../Assets/star.png";
import Iframe from "react-iframe";
import Cast from "../Cast/Cast";

const MovieDetailsDesign = props => {
  let Trailer;
  if (props.info.videos.results[0]) {
    let videokey = props.info.videos.results[0].key;
    const videourl = "https://www.youtube.com/embed/" + videokey;
    Trailer = (
      <>
        <Iframe
          url={videourl}
          height="100%"
          width="100%"
          id="firstTrailer"
          display="initial"
          position="relative"
          allowFullScreen
        />
      </>
    );
  } else {
    Trailer = <></>;
  }

  let dt = props.info.release_date;
  let runtime = props.info.runtime;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const releaseyear = dt.substring(0, 4);
  const last = props.info.genres.length;
  const genre = props.info.genres.map((genre, i) => {
    if (i + 1 === last) {
      return <span key={genre.id}>{genre.name}&nbsp;</span>;
    } else return <span key={genre.id}>{genre.name},&nbsp;</span>;
  });
  const castlist = props.info.credits.cast.slice(0, 12);
  const cast = castlist.map(actor => {
    return (
      <Col xs={6} md={3} key={actor.cast_id}>
        <Cast
          character={actor.character}
          name={actor.name}
          profile={actor.profile_path}
        />
      </Col>
    );
  });

  const crewlist = props.info.credits.crew.slice(0, 25);
  const crew = crewlist.map(crew => {
    return (
      <ListGroup.Item key={crew.credit_id}>
        {crew.job}: <i>{crew.name}</i>
      </ListGroup.Item>
    );
  });

  return (
    <>
      <div className="MainContainer">
        <div className="ParallaxContainer">
          <img
            src={props.backdrop_path}
            alt="Poster"
            style={{ width: "100%" }}
          />
        </div>

        <div className="ContentContainer">
          <div className="Content">
            <Container>
              <Row>
                <Col xs={8} md={9}>
                  <h1
                    className="ChangeTitlesize"
                    style={{ textAlign: "left", margin: "0px" }}
                  >
                    <b>
                      {props.info.title.toUpperCase()}
                      &nbsp;({releaseyear})
                    </b>
                  </h1>
                </Col>
                <Col xs={4} md={3}>
                  <img src={star} className="starsize" alt="Rating" />
                  <span className="sizeChange">
                    <b>{props.info.vote_average}/10</b>
                    &nbsp;({props.info.vote_count})
                  </span>
                </Col>
              </Row>
              <Row>
                <Col xs={4} md={3}>
                  <Card.Img variant="top" src={props.poster_path} />

                  <ListGroup>
                    <ListGroup.Item>
                      <b>Crew</b>
                    </ListGroup.Item>
                    {crew}
                  </ListGroup>
                </Col>
                <Col xs={8} md={9} className="sizeChange">
                  <Col
                    className="changepadding"
                    style={{ textAlign: "left", color: "gray" }}
                    xs={12}
                  >
                    <i>
                      {genre}|&nbsp;Tagline:&nbsp;{props.info.tagline}
                      &nbsp;|&nbsp;
                      {hours}h&nbsp;{minutes}min
                    </i>
                  </Col>
                  <Col
                    className="changepadding"
                    style={{ textAlign: "left" }}
                    xs={12}
                  >
                    {props.info.overview}
                  </Col>
                  <Col style={{ marginTop: "25px" }} className="VideoSize">
                    {Trailer}
                  </Col>
                  <Row
                    style={{
                      marginTop: "20px",
                      border: "1px solid rgb(207, 210, 212)",
                      borderRadius: "10px",
                      marginBottom: "20px"
                    }}
                  >
                    <Col
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                      xs={12}
                    >
                      <b>Cast</b>
                    </Col>
                    {cast}
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetailsDesign;
