import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import Thoughts from "./views/Thoughts";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/thoughts">
          <Thoughts />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
