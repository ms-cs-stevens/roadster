import React, { useEffect, useState, useReducer, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
} from "@material-ui/core";
import SearchLocationInput from "../SearchLocationInput";
import TripOriginIcon from "@material-ui/icons/TripOrigin";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import RoomIcon from "@material-ui/icons/Room";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Paper from '@material-ui/core/Paper';
import JourneyContext from "../../contexts/JourneyContext";
import Typography from '@material-ui/core/Typography';
import TimelineDot from '@material-ui/lab/TimelineDot';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: '6px 16px',
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    // backgroundColor: red[500],
  },
  oppositeContent: {
    flex: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
}));

const journeyReducer = (state, event) => {
  state.checkpoints.push({location: event.value, stopover: true })
  return state;
};

const AddCheckpoints = () => {
  const classes = useStyles();
  const journey = useContext(JourneyContext);
  const [checkpoint, setCheckpoint] = useReducer(journeyReducer, {checkpoints: []});

  const handleChange = (event) => {
    setCheckpoint({
      value: (event.detail && event.detail.location.formattedAddress),
      name: event.target.name
    });
    journey.checkpoints.push(checkpoint);
  };

  const checkpoints = () => {
    let checkpoint = <SearchLocationInput
      name="origin"
      label="Location"
      setLocation={handleChange}
      placeholder="New York, NY"
      id="origin"
    />;

    let i = 0;
    return (
      <TimelineItem>
        <TimelineOppositeContent
          className={classes.oppositeContent}
          color="textSecondary"
        ></TimelineOppositeContent>
        <TimelineSeparator>
            <TripOriginIcon color="action" fontSize="small" />
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          {/* <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Add Checkpoint
            </Typography>
            <br /> */}
            {/* <Typography>Because you need rest</Typography> */}
            {checkpoint}
          {/* </Paper> */}
        </TimelineContent>
      </TimelineItem>
    );
  }

  return (
    <Card style={{ "min-height": "100vh" }}>
      <CardHeader title="Checkpoints" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Timeline>
            <TimelineItem>
              <TimelineOppositeContent
                className={classes.oppositeContent}
                color="textSecondary"
              ></TimelineOppositeContent>
              <TimelineSeparator>
                <TripOriginIcon color="action" fontSize="small" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                {journey.origin.formattedAddress}
              </TimelineContent>
            </TimelineItem>

            { checkpoints() }
            {/* { checkpoints() }
            { checkpoints() }
            { checkpoints() }
            { checkpoints() } */}

            <TimelineItem>
              <TimelineOppositeContent
                className={classes.oppositeContent}
                color="textSecondary"
              ></TimelineOppositeContent>
              <TimelineSeparator>
                <RoomIcon color="action" />
              </TimelineSeparator>
              <TimelineContent>
                {journey.destination.formattedAddress}
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AddCheckpoints;