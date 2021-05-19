/* import React, { 
    useEffect, 
    useState, 
    useRef, 
    useContext } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    makeStyles,
    }   from "@material-ui/core"
import { AuthContext } from "../../firebase/Auth";
import apiService from "../../services/apiService";

const Comments = async (props) => {
    const journey = props.journey;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const {currentUser} = useContext(AuthContext);

    console.log(currentUser, " ", journey);

    const newCommentRef = useRef();

    useEffect(() => {
        if (newCommentRef.current)  newCommentRef.current.focus();
    }, [newCommentRef]);

    const handlePostComment = async (e) => {
        e.preventDefault();
        const trimmed = newComment.trim();
        if (trimmed) {
            let newCommentData = {
                posterId: currentUser.id,
                content: trimmed,
            }

            let updateData = journey;
            updateData.comments.push(newCommentData);

            try {
                const data  = await apiService.editResource(`journeys/${journey._id}`, updateData);
                setComments(data.comments);
            } catch (e) {
                console.log(e);
            }
            setNewComment('');
        }
    };

    const handleOnChange = e => {
        setNewComment(e.target.value);
    };

    return (
        <Card>
            <CardHeader title = "Comments Section"/>
            <CardContent>
                {comments?.map(comment => (
                        <li key={comment.id}>
                            {comment}
                        </li>
                        )
                    )
                }
            </CardContent>
            <Divider/>
            <form
            onSubmit={handlePostComment}
            >
            <input
            label = {currentUser.displayName}
            ref={newCommentRef}
            type="text"
            value={newComment}
            onChange={handleOnChange}
            />
            <button
            type="submit"
            disabled={!newComment}
            >
            Post
            </button>
            </form>
        </Card>
    )
}

export default Comments; */