import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

test("Renders App component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
