import React, { useEffect, useState, useRef } from "react";
import { useFirestoreQuery } from "../hooks";
import { formatRelative } from "date-fns";
import { Divider, makeStyles, Paper, List } from "@material-ui/core";
import "firebase/firestore";
import firebaseApp from "../../firebase/firebaseApp";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { ListItemAvatar } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import ChatIcon from "@material-ui/icons/Chat";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles({
  chatSection: {
    height: "80vh",
  },
  avatar: {
    backgroundColor: deepPurple[800],
  },
  messageArea: {
    height: "65vh",
    overflowY: "auto",
  },
  chat: {
    position: "fixed",
    zIndex: "100",
    bottom: "40px",
    right: "40px",
  },
});

const Chat = ({ data, db = firebaseApp.firestore() }) => {
  const classes = useStyles();
  const messagesRef = db.collection("messages");
  const [showChat, setShowChat] = useState(false);
  let allComments = useFirestoreQuery(messagesRef.orderBy("createdAt", "asc"));

  const comments = allComments.filter(function jId(comment) {
    return comment.journeyId === data.journeyId;
  });

  const [newComment, setNewComment] = useState("");

  const inputRef = useRef();
  const { displayName, journeyId } = data;

  useEffect(() => {
    db.collection("messages").orderBy("createdAt").limit(100);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, db]);

  const handleOnChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (db) {
      const trimmed = newComment.trim();
      if (trimmed) {
        messagesRef.add({
          content: trimmed,
          username: displayName,
          journeyId: journeyId,
          createdAt: new Date(),
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
      {showChat && (
        <Grid
          container
          component={Paper}
          elevation={4}
          className={classes.chatSection}
        >
          <Grid item sm={12}>
            <List className={classes.messageArea}>{renderComments()}</List>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                  ref={inputRef}
                  type="text"
                  value={newComment}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={1} align="right">
                <Fab onClick={handleOnSubmit} color="primary" aria-label="add">
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Chat;
