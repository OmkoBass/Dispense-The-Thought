import React from "react";

import { motion } from "framer-motion";

import { Title, Button, createStyles } from "@mantine/core";

import { useHistory } from "react-router";

export default function Header() {
  const { classes } = useStyles();
  const history = useHistory();

  return (
    <header className={classes.header}>
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
                  yoyo: Infinity,
                },
              },
            }}
            whileHover="hover"
          >
            <Title weight={"bold"}>Dispense The Thought</Title>
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
          <Button size="lg" color="dark">
            Thoughts
          </Button>
        </motion.li>
      </motion.ul>
    </header>
  );
}

const useStyles = createStyles((theme) => ({
  header: {
    maxHeight: "10vh",
  },
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
