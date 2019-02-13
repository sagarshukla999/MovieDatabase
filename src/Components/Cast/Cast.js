import React from "react";
import { Card } from "react-bootstrap";
import unknown_profile from "../../Assets/unknown_profile.png";
const cast = props => {
  const basePosterURL = "http://image.tmdb.org/t/p/original";
  var profile;
  if (props.profile) {
    profile = basePosterURL + props.profile;
  } else {
    profile = unknown_profile;
  }

  return (
    <>
      <Card style={{ marginBottom: "10px" }}>
        <Card.Img
          variant="top"
          style={{ height: "272px", width: "181px" }}
          src={profile}
        />
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <footer
              style={{ display: "block", fontSize: "70%", color: "#6c757d" }}
            >
              {props.name}
              <br />
              <cite>{props.character}</cite>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </>
  );
};

export default cast;
