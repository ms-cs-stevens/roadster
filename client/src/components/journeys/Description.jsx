import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  makeStyles,
  Button,
  GridList,
  GridListTile,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import { openUploadWidget } from "../../services/CloudinaryService";
import apiService from "../../services/apiService";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px",
    overflow: "hidden",
    "& > *": {
      margin: theme.spacing(1),
    },
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
}));

function ImageGridList({ images }) {
  const classes = useStyles();
  if (!images) return "No Images uploaded yet !";
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3}>
        {images.map((tile) => (
          <GridListTile key={tile}>
            <Image
              publicId={tile}
              fetch-format="auto"
              quality="auto"
              height="200"
              width="300"
              crop="fill"
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

const InfoCard = ({ journey }) => {
  const [images, setImages] = useState([]);
  const [journeyImages, setJourneyImages] = useState(null);
  const [imageCounter, setImageCounter] = useState(0);

  // const [images, setImages] = useState([]);
  // const [imageCounter, setImageCounter] = useState(0);
  const beginUpload = (tag) => {
    console.log(tag);
    const uploadOptions = {
      cloudName: "dhpq62sqc",
      tags: [tag],
      uploadPreset: "juawc70d",
    };

    openUploadWidget(uploadOptions, async (error, photos) => {
      if (!error) {
        console.log("photos=" + photos);
        setImageCounter(imageCounter + 1);
      } else {
        console.log(error);
      }
    });
  };

  const saveImages = async () => {
    let arrImage = [];
    try {
      const data = await axios.get(
        "https://res.cloudinary.com/dhpq62sqc/image/list/" +
          journey._id +
          ".json"
      );
      console.log(data.data.resources);
      for (let arr of data.data.resources) {
        arrImage.push(arr.public_id);
      }
      setImages(arrImage);
    } catch (e) {
      console.log("No Images Found");
    }

    try {
      const data = await apiService.editResource(
        `journey/updateImage/${journey._id}`,
        {
          imageArray: arrImage,
        }
      );
      setImages(data.images);
      setJourneyImages(data.images);
    } catch (e) {
      console.log(e);
      alert("Provide correct values");
    }
  };

  useEffect(() => {
    async function fetchJourney() {
      let data = await apiService.getResource(`journeys/${journey._id}`);
      setImages(data.images);
      setJourneyImages(data.images);
    }
    fetchJourney();
  }, [journey]);

  if (journey) {
    return (
      <Card>
        <CardHeader title="Trip Details" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 300,
              position: "relative",
            }}
          >
            <Typography component="h2" variant="h6">
              Name
            </Typography>
            <Typography>{journey.name}</Typography>
            <br />
            <br />
            <Typography component="h2" variant="h6">
              Description
            </Typography>
            <Typography>{journey.description}</Typography>
            <br />
            <br />
            <Typography component="h2" variant="h6">
              Images
            </Typography>

            <CloudinaryContext cloudName="dhpq62sqc">
              <ImageGridList images={images} />
              <IconButton
                onClick={() => beginUpload(journey._id)}
                color="primary"
                aria-label="upload picture"
              >
                <PhotoCamera />
              </IconButton>
              <Button onClick={saveImages} variant="contained" color="primary">
                Save images
              </Button>
            </CloudinaryContext>
          </Box>
        </CardContent>
      </Card>
    );
  } else {
    return "Loading Trip Details !!";
  }
};

export default InfoCard;
