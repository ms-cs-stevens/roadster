import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@material-ui/core";
import React from "react";

const InfoCard = ({ journey }) => {
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
            <Typography style={{color: "#333"}}>{journey.name}</Typography>
            <br />
            <Typography component="h2" variant="h6">
              Description
            </Typography>
            <Typography style={{color: "#333"}}>
              {journey.description || "No description available for the roadtrip"}
            </Typography>
            {/* <br />
            <Typography component="h2" variant="h6">
              Tentative Start Date
            </Typography>
            <Typography style={{color: "#333"}}>
              {<Moment format="MMM D, YYYY">{journey.startDate}</Moment>}
            </Typography> */}
            <br />
            <Typography style={{fontStyle: "italic", color: "blue"}}>
              Editable by { journey.editable ? "Members" : "Owner" } only
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
