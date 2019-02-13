import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";
const loading = props => (
  //<div>Sagar</div>
  <ReactLoading
    type="bars"
    className="position"
    height={"100vh"}
    width={"10%"}
  />
);

export default loading;
