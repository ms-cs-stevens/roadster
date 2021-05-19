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
            <Typography>{journey.name}</Typography>
            <br />
            <br />
            <Typography component="h2" variant="h6">
              Description
            </Typography>
            <Typography>{journey.description}</Typography>
            <br />
          </Box>
        </CardContent>
      </Card>
    );
  } else {
    return "Loading Trip Details !!";
  }
};

export default InfoCard;
