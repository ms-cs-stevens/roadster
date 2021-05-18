import React, { useReducer } from "react";
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
import Button from '@material-ui/core/Button';
import apiService from "../../services/apiService";

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
  const cps = new Set();
  state.checkpoints.map((cp) => cps.add(cp.placeId))
  let arr = [...cps];
  if(event.value && arr.indexOf(event.value.placeId) === -1) {
    state.checkpoints.push(event.value)
  }
  return state;
};

const AddCheckpoints = ({ journey, setCheckpoints}) => {
  const classes = useStyles();
  const [formData, setCP] = useReducer(journeyReducer, {checkpoints: []});

  const addCheckpointToJourney = async () => {
    try {
      if(formData.checkpoints.length > 0) {
        const response = await apiService.createResource(`journeys/${journey._id}/checkpoints`, formData);
      } else {
        let message = "Please add stops to your journey";
      }
    } catch (e) {
      console.log(e);
      // TODO: set error on form
      alert("Provide correct values");
    }
  }

  const handleChange = (event) => {
    console.log(event.detail)
    setCP({
      value: (event.detail && event.detail.location),
      name: event.target.name
    });
    setCheckpoints(formData.checkpoints);
  };

  const checkpoints = (i) => {
    let cpList = [];
    for(let i = 0; i < 5; i++) {
      cpList.push(
        <TimelineItem key={`checkpoint${i}`}>
          <TimelineOppositeContent
            className={classes.oppositeContent}
            color="textSecondary"
          ></TimelineOppositeContent>
          <TimelineSeparator>
              <TripOriginIcon color="action" fontSize="small" />
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <SearchLocationInput
              name="origin"
              label="Checkpoint"
              setLocation={handleChange}
              placeholder={`Checkpoint ${i+1}`}
              value={ (journey.checkpoints[i] && journey.checkpoints[i].formattedAddress)}
              id={`checkpoint${i}`}
            />
          </TimelineContent>
        </TimelineItem>
      )
    }

    return (cpList);
  }

  return (
    <Card style={{ "minHeight": "100vh" }}>
      <CardHeader title="Checkpoints" />
      <Button onClick={addCheckpointToJourney} variant="outlined">
        Add Checkpoints
      </Button>
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