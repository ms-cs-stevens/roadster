import React, { useEffect, useState, useRef } from "react";
import { useFirestoreQuery } from "../hooks";
import Comment from "./Comment";
import "firebase/firestore";
import firebaseApp from "../../firebase/firebaseApp";

const Section = ({ currentUser }) => {
  const db = firebaseApp.firestore();
  const messagesRef = db.collection("messages");
  const comments = useFirestoreQuery(
    messagesRef.orderBy("timestamp", "desc").limit(100)
  );

  const [newComment, setNewComment] = useState("");

  const inputRef = useRef();

  const { uid, displayName } = currentUser;

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

    const trimmed = newComment.trim();
    if (trimmed) {
      messagesRef.add({
        content: trimmed,
        username: displayName,
        journeyId: "bcCvtKTPCa8O71fcBxZao",
        createdAt: new Date(),
      });
      setNewComment("");
    }
  };

  return (
    <div>
      <div>
        <div>
          <p>Comments</p>
        </div>

        <ul>
          {comments
            ?.sort((first, second) =>
              first?.timestamp?.seconds <= second?.timestamp?.seconds ? -1 : 1
            )
            ?.map((comment) => (
              <li key={comment.id}>
                <Comment {...comment} />
              </li>
            ))}
        </ul>
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default Section;
