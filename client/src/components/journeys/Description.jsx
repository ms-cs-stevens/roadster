import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@material-ui/core";
import React, {useState,useEffect} from 'react';
import { CloudinaryContext,Image } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "../../services/CloudinaryService";
import apiService from "../../services/apiService";

const InfoCard = ({ journey }) => {
  const [images, setImages] = useState([]);
  const [journeyImages, setJourneyImages] = useState(null);
  

  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: "dhpq62sqc",
      tags: [tag],
      uploadPreset: "juawc70d"
    };
  
   
    
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log("photos=" + photos);
        if(photos.event === 'success'){
         setImages([...images, photos.info.public_id])
        }
   
      } else {
        console.log(error);
      }
    })
  }

  const saveImages =async ()=>{
  
  

    try {
      const data = await apiService.editResource("journey/updateImage/PYt1uhPaZrjSI87Zk-FuF", {
        imageArray:images
      });
    } catch (e) {
      console.log(e);
      alert("Provide correct values");
    }
}

  useEffect(() =>{
    fetchPhotos("image", setImages);
  },[]);

  useEffect( () => {
  async function fetchJourney() {
      let data = await apiService.getResource(`journeys/PYt1uhPaZrjSI87Zk-FuF`);
      setImages(data.images);
      setJourneyImages(data.images);
    }
    fetchJourney();
    
  }, [journey])

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
            <Typography>
              CategoriesTravel TrendsBusiness ManagementMarketingTravel
              TechnologyDistributionTrekkSoft Tips Search How to write a tour
              description that sells All Posts Published by Stephanie Kutschera
              | Sep 4, 2018 | Tourism Marketing | 3 MIN READ Let's say you are a
              tour operator who offers paragliding to travelers from all over
              the world. You work in a busy city, so there are three other
              similar size tour companies providing paragliding activities in
              the same location that you run your tours. You know what makes
              your paragliding experience different from your competitors, but
              how can you let potential customers know?
            </Typography>
            <br />
            <br />
            <Typography component="h2" variant="h6">
              Images
            </Typography>
            <Typography  component="h2" variant="h6">

            <CloudinaryContext cloudName="dhpq62sqc">
            
            <button onClick={() => beginUpload()}>Choose Images</button>
            <section>
            {images.map(i => <Image
              key={i}
              publicId={i}
              fetch-format="auto"
              quality="auto"
            />)}
            </section>
            
          </CloudinaryContext>
          <button onClick={saveImages}>Save Images</button>
          
              </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  } else {
    return "Loading Trip Details !!";
  }
};

export default InfoCard;
