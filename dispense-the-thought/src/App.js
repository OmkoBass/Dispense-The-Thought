import React from "react";

import { MantineProvider } from "@mantine/core";

import { motion } from "framer-motion";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import Thoughts from "./views/Thoughts";
import Header from "./components/Header";

function App() {
  return (
    <MantineProvider>
      <Router>
        <motion.div
          animate={{ backgroundColor: ["#acc6f0", "#fac4b0", "#acc6f0"] }}
          transition={{
            easings: ["easeIn"],
            repeat: Infinity,
            duration: 10,
          }}
        >
          <Header />
          <Switch>
            <Route path="/thoughts">
              <Thoughts />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </motion.div>
      </Router>
    </MantineProvider>
  );
}

export default App;
