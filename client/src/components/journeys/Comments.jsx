import React, { useEffect, useState, useRef, useContext } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { AuthContext } from "../../firebase/Auth";
import apiService from "../../services/apiService";
import { formatRelative } from "date-fns";
import firebaseApp from "../../firebase/firebaseApp";
import "firebase/firestore";

const Comments = ({ journey, db = firebaseApp.firestore() }) => {
    const [newComment, setNewComment] = useState("");
    const { currentUser } = useContext(AuthContext);

    const q = db.collection("comments");
    let allComments = useFirestoreQuery(
        q.orderBy("createdAt", "desc"),
    );

    const newCommentRef = useRef();

    const { posterName, journeyId } = data;

    const comments = allComments.filter(function jId(comment) {
        return comment.journeyId === data.journeyId;
    });

    useEffect(() => {
        if (newCommentRef.current) newCommentRef.current.focus();
    }, [newCommentRef, comments]);

    const handlePostComment = async (e) => {
        e.preventDefault();

        if(db)
        {
            const trimmed = newComment.trim();
            if (trimmed) {
                let newCommentData = {
                    posterId: currentUser.id,
                    content: trimmed,
                    postername: posterName,
                    journeyId: journeyId,
                    createdAt: new Date(),
                };

                comments.add(newCommentData);


                let updateData = journey;
                updateData.comments.push(newCommentData);

                try {
                    const data = await apiService.editResource(
                    `journeys/${journey._id}`,
                    updateData
                    );
                    setComments(data.comments);
                } catch (e) {
                    console.log(e);
                }
                setNewComment("");
            }
        }
    };

        const formatDate = (date) => {
            let formattedDate = "";
            if (date) {
            formattedDate = formatRelative(date, new Date());
            formattedDate =
                formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
            }
            return formattedDate;
        };

        const align = (comment) => {
            return data.posterName === comment.posterName ? "right" : "left";
        };

        const handleOnTyping = (e) => {
            setNewComment(e.target.value);
        };

        const renderComments = () => {
            return (
            comments &&
            comments.map((comment, i) => {
                console.log(comment);
                const [firstName, lastName] = comment.posterName.split(" ");
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
        <Card>
        <CardHeader title="Comments Section" />
        <CardContent max-height="400px">
                <List>
                {renderComments()}
                </List>
            {/* {comments?.map((comment) => (
            <li key={comment.id}>{comment}</li>
            ))} */}
        </CardContent>
        <Divider />
        <form onSubmit={handlePostComment}>
            <input
            label={currentUser.posterName}
            ref={newCommentRef}
            type="text"
            value={newComment}
            onChange={handleOnTyping}
            />
            <button type="submit" disabled={!newComment}>
            Post
            </button>
        </form>
        </Card>
    );
};

export default Comments;