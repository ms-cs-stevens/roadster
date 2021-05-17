import React, { useEffect, useState, useRef } from "react";
import { useFirestoreQuery } from "../hooks";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  //makeStyles,
  Paper,
  List
} from "@material-ui/core";
import Comment from "./Comment";
import "firebase/firestore";
import firebaseApp from "../../firebase/firebaseApp";

const Section = ({ data, db = firebaseApp.firestore() }) => {
  
  //const classes = useStyles();
  const messagesRef = db.collection("messages");
  console.log(data.journeyId);
  
  let allComments = useFirestoreQuery(
    messagesRef.orderBy("createdAt", "asc")
  );

  const comments = allComments.filter(function jId(comment) {
    return comment.journeyId === data.journeyId;
  });

  const [newComment, setNewComment] = useState("");

  const inputRef = useRef();

  console.log(data)
  const { uid, displayName, journeyId } = data;


  useEffect(() => {
    const query = db.collection("messages").orderBy("createdAt").limit(100);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleOnChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(db)
    {
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

  return (
    <Card>
        <CardHeader title = "Chat" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Paper style={{maxHeight: '15em', overflow: 'auto'}}>
              <List>

              {comments
                ?.sort((first, second) =>
                  first?.timestamp?.seconds <= second?.timestamp?.seconds ? -1 : 1
                )
                ?.map((comment) => (
                  <Typography>
                      <Comment {...comment} />
                  </Typography>
                ))}
              </List>
            </Paper>
            <form onSubmit={handleOnSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={newComment}
                onChange={handleOnChange}
              />
              <button type="submit" disabled={!newComment}>
                Send
              </button>
            </form>
          </Box>
        </CardContent>
    </Card>
  );
};

export default Section;