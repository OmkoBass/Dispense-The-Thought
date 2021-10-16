import React from "react";

import { motion } from "framer-motion";

import { Title, Button, MediaQuery, createStyles } from "@mantine/core";

import { useHistory } from "react-router";

export default function Header() {
  const { classes } = useStyles();
  const history = useHistory();

  return (
    <motion.header className={classes.header}>
      <motion.ul
        className={classes.list}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ ease: "easeOut", delay: 0.4 }}
      >
        <motion.li className={classes.logo} onClick={() => history.push("/")}>
          <motion.div
            variants={{
              hover: {
                scale: 1.1,
                transition: {
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 0.5,
                },
              },
            }}
            whileHover="hover"
          >
            <MediaQuery largerThan="lg">
              <Title weight={"bold"}>Dispense The Thought</Title>
            </MediaQuery>

            <MediaQuery smallerThan="lg">
              <Title order={4} weight={"bold"}>
                Dispense The Thought
              </Title>
            </MediaQuery>
          </motion.div>
        </motion.li>

        <motion.li
          onClick={() => history.push("/thoughts")}
          className={classes.link}
          variants={{
            hover: {
              opacity: 0.7,
            },
          }}
          whileHover="hover"
        >
          <MediaQuery largerThan="lg">
            <Button size="lg" color="dark">
              Thoughts
            </Button>
          </MediaQuery>
          <MediaQuery smallerThan="lg">
            <Button size="sm" color="dark">
              Thoughts
            </Button>
          </MediaQuery>
        </motion.li>
      </motion.ul>
    </motion.header>
  );
}

const useStyles = createStyles((theme) => ({
  header: {},
  logo: {
    cursor: "pointer",
  },
  list: {
    padding: "1em",
    listStyleType: "none",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));
