import React, { useReducer, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
} from "@material-ui/core";
import SearchLocationInput from "../SearchLocationInput";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
import Alert from '@material-ui/lab/Alert';

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

const journeyReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CHECKPOINT':
      const cps = new Set();
      state.checkpoints.map((cp) => cps.add(cp.placeId))
      let arr = [...cps];
      if(action.value && arr.indexOf(action.value.placeId) === -1) {
        state.checkpoints.push(action.value)
      }
      return state;
    case 'REMOVE_CHECKPOINT':
      state.checkpoints = state.checkpoints.filter(c => action.value.placeId !== c.placeId);
      return state;
    default:
      return state;
  }
}

const AddCheckpoints = ({ journey, setCheckpoints}) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [formData, setCP] = useReducer(journeyReducer, {checkpoints: journey.checkpoints});

  const addCheckpointToJourney = async () => {
    try {
      if(formData.checkpoints.length > 0) {
        const response = await apiService.createResource(`journeys/${journey._id}/checkpoints`, formData);
        if(response) {
          setMessage("New stops are saved in the roadtrip!")
        }
      } else {
        setMessage("Please add stops to your journey");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (event) => {
    setCP({
      value: (event.detail && event.detail.location),
      type: 'ADD_CHECKPOINT'
    });
    setCheckpoints(formData.checkpoints);
    setMessage("Click on save button to update your stops");
  };

  const removeCheckpoint = (event, cp) => {
    setCP({
      value: cp,
      type: 'REMOVE_CHECKPOINT'
    });
    setCheckpoints(formData.checkpoints);
    setMessage("Click on save button to update your stops");
  }

  const checkpoints = () => {
    let cpList = [], cp;
    for(let i = 0; i < 5; i++) {
      if(journey.checkpoints[i]) {
        cp = <span>
          {journey.checkpoints[i].formattedAddress}
          <DeleteForeverIcon color="action" onClick={e => removeCheckpoint(e, journey.checkpoints[i])}  style={{cursor: "pointer"}} />
        </span>;
      } else {
        cp = <SearchLocationInput
                name="origin"
                label="Checkpoint"
                setLocation={handleChange}
                placeholder={`Checkpoint ${i+1}`}
                value={ (journey.checkpoints[i] && journey.checkpoints[i].formattedAddress)}
                id={`checkpoint${i}`}
              />;
      }

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
            {cp}
          </TimelineContent>
        </TimelineItem>
      )
    }

    return (cpList);
  }

  return (
    <Card style={{ "minHeight": "100vh" }}>
      <CardHeader
          action={
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={addCheckpointToJourney}
              className={classes.submit}
            >
              Save Stops
            </Button>
          }
          title="Stops"
          subheader={""}
        />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          {message && (<Alert severity="info">{message}</Alert>)}
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