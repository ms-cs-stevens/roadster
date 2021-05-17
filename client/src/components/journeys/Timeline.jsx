// import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
} from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TripOriginIcon from "@material-ui/icons/TripOrigin";
import RoomIcon from "@material-ui/icons/Room";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    flexDirection: "column",
    alignItems: "center",
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

const JourneyTimeline = (props) => {
  const classes = useStyles();
  const journey = props.journey;

  const checkPoints = ["New york", "Long Island", "Buffalo"];

  const buildTimeline = () => {
    let timeline =
      checkPoints.length > 0 &&
      checkPoints.map((checkpoint, i) => {
        return (
          <TimelineItem key={checkpoint + i} style={{ minHeight: "50px" }}>
            <TimelineOppositeContent
              className={classes.oppositeContent}
              color="textSecondary"
            ></TimelineOppositeContent>
            <TimelineSeparator>
              <TripOriginIcon color="action" fontSize="small" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{checkpoint}</TimelineContent>
          </TimelineItem>
        );
      });

    return <>{timeline}</>;
  };

  return (
    <Card {...props}>
      <CardHeader title="Timeline" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Timeline>
            <TimelineItem style={{ minHeight: "55px" }}>
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
            {buildTimeline()}
            <TimelineItem style={{ minHeight: "50px" }}>
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
};

export default JourneyTimeline;
