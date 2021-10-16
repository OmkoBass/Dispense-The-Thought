import React from "react";

import { Button, createStyles } from "@mantine/core";
import { motion } from "framer-motion";

export default function Home() {
  const { classes } = useStyles();

  return (
    <div className={classes.page}>
      <motion.div className={classes.hero}>
        <motion.div
          className={classes.heroTextPrimary}
          initial={{ x: -1280 }}
          animate={{ x: 0 }}
          transition={{ ease: "anticipate", delay: 0.8 }}
        >
          <h1>Share your thoughts </h1>
        </motion.div>
        <motion.div
          className={classes.heroTextSecondary}
          initial={{ x: -1280 }}
          animate={{ x: 0 }}
          transition={{ ease: "anticipate", delay: 0.9 }}
        >
          <h1>with the entire world</h1>
        </motion.div>
        <motion.div
          className={classes.heroTextSecondary}
          initial={{ x: -1280 }}
          animate={{ x: 0 }}
          transition={{ ease: "anticipate", delay: 1 }}
        >
          <h1>through an image</h1>
        </motion.div>

        <motion.div
          initial={{ x: -1280 }}
          animate={{ x: 0 }}
          transition={{ ease: "anticipate", delay: 1 }}
        >
          <Button color="dark" size="xl">
            Start now!
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  page: {
    minHeight: "90vh",
  },
  hero: {
    minHeight: "60vh",
    padding: "4rem",
    borderRadius: " 5em",
    margin: "1rem",
  },
  heroTextPrimary: {
    fontSize: "3rem",
  },
  heroTextSecondary: {
    fontSize: "2rem",
    color: "gray",
  },
}));
