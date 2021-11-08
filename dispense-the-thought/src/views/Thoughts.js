import React, { useState, useEffect } from "react";

import {
  MediaQuery,
  createStyles,
  Loader,
  Grid,
  Col,
  Container,
  Image,
  Divider,
  Space,
  Alert,
  Modal,
} from "@mantine/core";

import { motion } from "framer-motion";

import { getThoughts } from "../api/Api";

export default function Thoughts() {
  const [thoughts, setThoughts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { classes } = useStyles();

  useEffect(() => {
    (async () => {
      const thoughts = await getThoughts();

      if (thoughts.error !== null) {
        setError(thoughts.error);
      } else {
        setThoughts(thoughts.response.toString());
      }

      setIsLoading(false);
    })();
  }, []);

  const returnAppropriateComponent = () => {
    if(isLoading) {
      return <Loader
              className={classes.centerLoader}
              color="orange"
              size="xl"
              variant="bars"
            />
    }
    else if(error !== null) {
      return <Alert color="red" title="Something went wrong!">
              {error}
            </Alert>
    } else {
      return thoughts.map((thought) => (
        <Col key={thought} span={12} lg={4} md={4} sm={12}>
          <motion.div
            onClick={() => {
              setSelectedImage(thought);
              setIsModalVisible(true);
            }}
            className={classes.image}
            whileHover="hover"
            variants={{
              hover: {
                scale: 1.1,
              },
            }}
          >
            <Image src={thought} fit="contain" alt="" radius="md" withPlaceholder />
          </motion.div>
        </Col>
      ))
    }
  }
  
  return (
    <div>
      <motion.div
        className={classes.hero}
        animate={{ backgroundColor: ["#D3959B", "#BFE6BA", "#D3959B"] }}
        transition={{
          easings: ["easeIn"],
          repeat: Infinity,
          duration: 10,
        }}
      >
        <motion.div
          initial={{ x: -1280 }}
          animate={{ x: 0 }}
          transition={{ ease: "anticipate", delay: 0.8 }}
        >
          <MediaQuery largerThan="lg">
            <h1 className={classes.heroTextPrimary}>All the thoughts </h1>
          </MediaQuery>
          <MediaQuery smallerThan="lg">
            <h1 className={classes.heroTextPrimaryPhone}>All the thoughts </h1>
          </MediaQuery>
        </motion.div>

        <motion.div
          initial={{ x: -1280 }}
          animate={{ x: 0 }}
          transition={{ ease: "anticipate", delay: 0.9 }}
        >
          <MediaQuery largerThan="lg">
            <h1 className={classes.heroTextSecondary}>from everyone</h1>
          </MediaQuery>
          <MediaQuery smallerThan="lg">
            <h1 className={classes.heroTextSecondaryPhone}>from everyone</h1>
          </MediaQuery>
        </motion.div>

        <motion.div
          initial={{ x: -1280 }}
          animate={{ x: 0 }}
          transition={{ ease: "anticipate", delay: 1 }}
        >
          <MediaQuery largerThan="lg">
            <h1 className={classes.heroTextSecondary}>around the world</h1>
          </MediaQuery>
          <MediaQuery smallerThan="lg">
            <h1 className={classes.heroTextSecondaryPhone}>around the world</h1>
          </MediaQuery>
        </motion.div>

        <motion.div
          className={classes.scrollDown}
          initial={{ x: -1280 }}
          animate={{ x: 0 }}
          transition={{ ease: "anticipate", delay: 1.3 }}
        >
          <MediaQuery largerThan="lg">
            <h1 className={classes.heroTextPrimary}>Scroll Down </h1>
          </MediaQuery>
          <MediaQuery smallerThan="lg">
            <h1 className={classes.heroTextPrimaryPhone}>Scroll Down </h1>
          </MediaQuery>
        </motion.div>
      </motion.div>

      <Modal
        opened={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        size="95%"
      >
        <Image src={selectedImage} alt="" radius="md" />
      </Modal>

      <Container>
        <MediaQuery largerThan="lg">
          <h1 className={classes.heroTextPrimary}>Thoughts </h1>
        </MediaQuery>
        <MediaQuery smallerThan="lg">
          <h1 className={classes.heroTextPrimaryPhone}>Thoughts </h1>
        </MediaQuery>
        <Divider />
        <Space />
        <Grid>
          {returnAppropriateComponent()}
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  hero: {
    padding: "4rem",
  },
  heroTextPrimary: {
    fontSize: "5rem",
  },
  heroTextSecondary: {
    fontSize: "4rem",
    color: "gray",
  },
  heroTextPrimaryPhone: {
    fontSize: "3rem",
  },
  heroTextSecondaryPhone: {
    fontSize: "2rem",
    color: "gray",
  },
  scrollDown: {
    minHeight: "50vh",
    textAlign: "center",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    cursor: "pointer",
  },
  centerLoader: {
    display: "block",
    margin: "auto",
  },
}));
