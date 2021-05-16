import React, { useContext } from 'react';
import Moment from 'react-moment';
import { AuthContext } from "../../firebase/Auth";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { red } from '@material-ui/core/colors';
import banner from "../../images/sign-in-page.jpg";
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import RoomIcon from '@material-ui/icons/Room';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  oppositeContent: {
    flex: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
}));

function CardItem({ journey }) {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  const showEditIcon = () =>{
    return (journey.editable || journey.creatorId === currentUser.uid);
  }

  return (
    <Card className={classes.paper}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {journey.creator[0]}
          </Avatar>
        }
        action={
          showEditIcon() &&
            <IconButton aria-label="edit-joutney">
              <EditIcon />
            </IconButton>
        }
        title={journey.name || "Roadtrip" }
        subheader={<Moment format="MMM D, YYYY">
          {journey.startDate}
        </Moment>}
      />
      <CardMedia
        className={classes.media}
        image={banner}
        title="Paella dish"
      />
      <CardContent>
        <Timeline>
          <TimelineItem style={{ minHeight:"55px" }}>
            <TimelineOppositeContent
              className={classes.oppositeContent}
              color="textSecondary"
            >
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TripOriginIcon color="action" fontSize="small"/>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent >{journey.origin.formattedAddress}</TimelineContent>
          </TimelineItem>
          <TimelineItem style={{ minHeight:"50px" }}>
            <TimelineOppositeContent
              className={classes.oppositeContent}
              color="textSecondary"
            >
            </TimelineOppositeContent>
            <TimelineSeparator>
              <RoomIcon color="action"/>
            </TimelineSeparator>
            <TimelineContent>{journey.destination.formattedAddress}</TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  );
}

export default CardItem;