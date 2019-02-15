import React from "react";
import { Card } from "react-bootstrap";
import unknown_profile from "../../Assets/unknown_profile.png";
import { URL } from "../../Components/URL/URL";
import "./Cast.css";
const cast = props => {
  var profile;
  if (props.profile) {
    profile = URL.basePosterURLSmall + props.profile;
  } else {
    profile = unknown_profile;
  }

  return (
    <>
      <Card style={{ marginBottom: "10px" }}>
        <Card.Img variant="top" className="CardHeight" src={profile} />
        <Card.Body style={{ padding: "0px" }}>
          <blockquote className="blockquote mb-0">
            <footer
              className={"fontsizefooter"}
              style={{ display: "block", color: "#6c757d" }}
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
