import React, { useState, useRef } from "react";

import {
  Button,
  MediaQuery,
  createStyles,
  Container,
  Timeline,
  Grid,
  Col,
  LoadingOverlay,
  Alert,
  Space,
  Center,
} from "@mantine/core";
import { motion } from "framer-motion";

import { uploadImageToAWS } from "../api/Api";

export default function Home() {
  const fileUpload = useRef(null);
  const uploadRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { classes } = useStyles();

  const handleUploadImage = async (e) => {
    setUploading(true);

    setFile(e.target.files[0]);

    const uploadedImage = await uploadImageToAWS(e.target.files[0]);

    if (uploadedImage.response === true) {
      setSuccess(true);
    } else {
      setError(uploadedImage.error);
    }

    setUploading(false);
  };

  return (
    <div>
      <motion.div
        className={classes.hero}
        animate={{ backgroundColor: ["#acc6f0", "#fac4b0", "#acc6f0"] }}
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
            <h1 className={classes.heroTextPrimary}>Share your thoughts </h1>
          </MediaQuery>
          <MediaQuery smallerThan="lg">
            <h1 className={classes.heroTextPrimaryPhone}>
              Share your thoughts{" "}
            </h1>
          </MediaQuery>
        </motion.div>
        <motion.div
          initial={{ x: -1280 }}
          animate={{ x: 0 }}
          transition={{ ease: "anticipate", delay: 0.9 }}
        >
          <MediaQuery largerThan="lg">
            <h1 className={classes.heroTextSecondary}>with the entire world</h1>
          </MediaQuery>
          <MediaQuery smallerThan="lg">
            <h1 className={classes.heroTextSecondaryPhone}>
              with the entire world
            </h1>
          </MediaQuery>
        </motion.div>
        <motion.div
          initial={{ x: -1280 }}
          animate={{ x: 0 }}
          transition={{ ease: "anticipate", delay: 1 }}
        >
          <MediaQuery largerThan="lg">
            <h1 className={classes.heroTextSecondary}>through an image</h1>
          </MediaQuery>
          <MediaQuery smallerThan="lg">
            <h1 className={classes.heroTextSecondaryPhone}>through an image</h1>
          </MediaQuery>
        </motion.div>

        <motion.div
          initial={{ x: -1280 }}
          animate={{ x: 0 }}
          transition={{ ease: "anticipate", delay: 1 }}
        >
          <Button
            color="dark"
            size="xl"
            className={classes.button}
            onClick={() =>
              uploadRef.current.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start now
          </Button>
        </motion.div>
      </motion.div>
      <Container className={classes.upload}>
        <Grid>
          <LoadingOverlay
            visible={uploading}
            loaderProps={{ size: "xl", color: "orange", variant: "bars" }}
          />
          <Col span={12} lg={2} md={3} sm={12}>
            <Center>
              <Timeline active={3} bulletSize={24} lineWidth={3} color="orange">
                <Timeline.Item title="Click the button" />
                <Timeline.Item title="Select an image" />
                <Timeline.Item title="Upload the image" />
                <Timeline.Item title="Done" />
              </Timeline>
            </Center>
          </Col>
          <Col span={12} lg={10} md={9} sm={12}>
            <MediaQuery largerThan="lg">
              <h1 className={classes.heroTextPrimary}>Choose an image</h1>
            </MediaQuery>
            <MediaQuery smallerThan="lg">
              <h1 className={classes.heroTextPrimaryPhone}>Choose an image</h1>
            </MediaQuery>
            <Button
              ref={uploadRef}
              size="xl"
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              onClick={() => {
                fileUpload.current.click();
              }}
            >
              Upload
            </Button>
            <Space />
            <form encType="multipart/form-data" method="POST">
              <input
                type="file"
                multiple={false}
                ref={fileUpload}
                onChange={(e) => handleUploadImage(e)}
                accept="image/*"
                className={classes.hide}
              />
            </form>

            {success ? (
              <Alert color="green" title="File uploaded!">
                You uploaded: {file.name}
              </Alert>
            ) : null}
            {error ? (
              <Alert color="red" title="Something went wrong!">
                {error}
              </Alert>
            ) : null}
          </Col>
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  hero: {
    minHeight: "80vh",
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
  button: {
    marginTop: "1rem",
  },
  upload: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    textAlign: "center",
  },
  hide: {
    pointerEvents: "none",
    display: "none",
  },
}));
