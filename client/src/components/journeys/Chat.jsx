import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Divider,
  makeStyles,
  Paper,
  List,
  ListItemText,
  Avatar,
  Grid,
  ListItemAvatar,
  TextField,
  ListItem,
  Fab,
  Typography,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ChatIcon from "@material-ui/icons/Chat";
import { deepPurple } from "@material-ui/core/colors";
import { AuthContext } from "../../firebase/Auth";
import { useFirestoreQuery } from "../hooks";
import { formatRelative } from "date-fns";
import "firebase/firestore";
import firebaseApp from "../../firebase/firebaseApp";

const useStyles = makeStyles({
  chatSection: {
    height: "75vh",
  },
  avatar: {
    backgroundColor: deepPurple[800],
  },
  messageArea: {
    height: "60vh",
    overflowY: "auto",
  },
  chat: {
    position: "fixed",
    zIndex: "100",
    bottom: "40px",
    right: "40px",
  },
});

function Chat({ journey, db = firebaseApp.firestore() }) {
  const { currentUser } = useContext(AuthContext);
  let data = currentUser;
  data.journeyId = journey._id;
  const classes = useStyles();
  const messages = db.collection("messages");
  const [showChat, setShowChat] = useState(false);
  let allMessages = useFirestoreQuery(
    messages.orderBy("createdAt", "asc").limit(100)
  );

  const inputRef = useRef();
  const messagesEndRef = useRef();
  const { displayName, journeyId } = data;

  const comments = allMessages.filter(function jId(comment) {
    return comment.journeyId === data.journeyId;
  });

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, messages]);

  const handleOnChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (db) {
      const trimmed = newComment.trim();
      if (trimmed) {
        messages.add({
          content: trimmed,
          username: displayName,
          journeyId: journeyId,
          createdAt: new Date(),
        });
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
        setNewComment("");
      }
    }
  };

  const formatDate = (date) => {
    let formattedDate = "";
    if (date) {
      // Convert the date in words relative to the current date
      formattedDate = formatRelative(date, new Date());
      // Uppercase the first letter
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
  };

  const align = (comment) => {
    return data.displayName === comment.username ? "right" : "left";
  };

  const renderComments = () => {
    return (
      comments &&
      comments.map((comment, i) => {
        console.log(comment);
        const [firstName, lastName] = comment.username.split(" ");
        return (
          <ListItem key={i}>
            <Grid container>
              <Grid item xs={12}>
                <ListItemAvatar align={align(comment)}>
                  <Avatar alt={firstName} className={classes.avatar}>
                    {(firstName[0] + lastName[0]).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  align={align(comment)}
                  primary={comment.content}
                ></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  align={align(comment)}
                  secondary={
                    comment.createdAt?.seconds
                      ? formatDate(new Date(comment.createdAt.seconds * 1000))
                      : ""
                  }
                ></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        );
      })
    );
  };

  return (
    <div className={classes.chat}>
      {showChat && (
        <Grid
          container
          component={Paper}
          elevation={5}
          className={classes.chatSection}
        >
          <Grid item sm={12}>
            <List className={classes.messageArea}>
              {renderComments()}
              <div ref={messagesEndRef} />
            </List>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={10}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                  ref={inputRef}
                  type="text"
                  value={newComment}
                  variant="outlined"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={2} align="right">
                <Fab onClick={handleOnSubmit} color="primary" aria-label="add" size="medium" >
                  <SendIcon  fontSize="small" />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid container>
        <Grid container justify="flex-end" item xs={12}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setShowChat(!showChat)}
          >
            <ChatIcon />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
}

export default Chat;
