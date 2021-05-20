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
import React, { useState, useEffect, useContext } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import { openUploadWidget } from "../../services/CloudinaryService";
import apiService from "../../services/apiService";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from "axios";
import { AuthContext } from "../../firebase/Auth";

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

function ImageGridList({ journey }) {
  const [images, setImages] = useState([]);
  const [journeyImages, setJourneyImages] = useState(null);
  const [showSave, setShowSave] = useState(false);
  const [imageCounter, setImageCounter] = useState(0);
  const [allowEdit, setAllowEdit] = useState(false);
  const { currentUser } = useContext(AuthContext);

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
        setShowSave(true);
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
      setShowSave(false);
    } catch (e) {
      console.log(e);
      alert("Provide correct values");
    }
  };

  useEffect(() => {
    async function fetchJourney() {
      let data = await apiService.getResource(`journeys/${journey._id}`);

      setAllowEdit(
        journey.creatorId === currentUser.uid ||
          (journey.editable &&
            journey.users.includes(currentUser.uid))
      );
      setImages(data.journey.images);
      setJourneyImages(data.journey.images);
    }
    fetchJourney();
  }, [journey]);

  const classes = useStyles();

  const renderImages = () => {
    return images.length ? (
      <CloudinaryContext cloudName="dhpq62sqc">
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={2}>
            {images.map((tile) => (
              <GridListTile key={tile}>
                <Image
                  publicId={tile}
                  fetch-format="auto"
                  quality="auto"
                  alt="trip images"
                  height="200"
                  width="300"
                  crop="fill"
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </CloudinaryContext>
    ) : (
      <Typography variant="body2">No Images yet</Typography>
    );
  };

  return (
    <Card>
      <CardHeader
        title="Image Gallery"
        action={
          allowEdit && (showSave ? (
            <Button onClick={saveImages} variant="contained" color="primary">
              Save images
            </Button>
          ) : (
            <IconButton
              onClick={() => beginUpload(journey._id)}
              color="primary"
              aria-label="upload picture"
            >
              <PhotoCamera />
            </IconButton>
          ))
        }
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          {renderImages()}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ImageGridList;
