import React, { Component } from "react";
import "./App.css";
import Layout from "./Containers/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
