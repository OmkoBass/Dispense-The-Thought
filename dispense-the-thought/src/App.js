import React from "react";

import { MantineProvider } from "@mantine/core";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import Thoughts from "./views/Thoughts";
import Header from "./components/Header";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/thoughts">
            <Thoughts />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </MantineProvider>
  );
}

export default App;
