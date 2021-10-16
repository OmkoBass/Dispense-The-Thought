import React from "react";

import { motion } from "framer-motion";

import { Title, Button, createStyles } from "@mantine/core";

import { useHistory } from "react-router";

export default function Header() {
  const { classes } = useStyles();
  const history = useHistory();

  return (
    <header className={classes.header}>
      <ul className={classes.list}>
        <motion.li
          onClick={() => history.push("/")}
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ ease: "easeOut", delay: 1 }}
        >
          <motion.div
            variants={{
              hover: {
                scale: 1.1,
              },
              transition: {
                yoyo: Infinity,
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
              opacity: 1,
            },
          }}
          whileHover="hover"
        >
          <Button
            size="lg"
            variant="gradient"
            gradient={{ from: "grape", to: "pink", deg: 35 }}
          >
            Thoughts
          </Button>
        </motion.li>
      </ul>
    </header>
  );
}

const useStyles = createStyles((theme) => ({
  header: {},
  link: {
    opacity: 0.5,
  },
  list: {
    padding: "1em",
    listStyleType: "none",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));
