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
  

  const beginUpload = async tag => {
    const uploadOptions = {
      cloudName: "dhpq62sqc",
      tags: [tag],
      uploadPreset: "juawc70d"
    };
  
    let flag=false;
    console.log(flag);
    openUploadWidget(uploadOptions, async (error, photos) => {
      if (!error) {
        console.log("photos=" + photos);
        if(photos.event === 'success'){
         setImages([...images, photos.info.public_id])
         flag=true;
        }
        if(flag){
        await setDatatoDB();
        flag=false;
        }
      } else {
        console.log(error);
      }
    })
    async function setDatatoDB()
    {
    try {
      const data = await apiService.editResource("journey/updateImage/PYt1uhPaZrjSI87Zk-FuF", {
        imageArray:images
      });
      flag=false;
    } catch (e) {
      console.log(e);
      alert("Provide correct values");
    }

}
    
  }

  useEffect( () => {
    fetchPhotos("image", setImages);
    console.log("images -->");
    for(let arr of images){
      console.log("arr-0" + arr);
    }
  }, [])

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
            
            <button onClick={() => beginUpload()}>Upload Image</button>
            <section>
            {images.map(i => <Image
              key={i}
              publicId={i}
              fetch-format="auto"
              quality="auto"
            />)}
            </section>
            
          </CloudinaryContext>
          
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
