import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/app';
import { useFirestoreQuery } from '../hooks';
import Comment from './Comment';

const Section = ({ user = null }) => {
  const db = firebase.firestore();
  const commentsRef = db.collection('Comments');
  const comments = useFirestoreQuery(
    commentsRef.orderBy('timestamp', 'desc').limit(100)
  );

  const [newComment, setNewComment] = useState('');

  const inputRef = useRef();

  const { uid, userName } = user;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleOnChange = e => {
    setNewComment(e.target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    const trimmed = newComment.trim();
    if (trimmed) {
      commentsRef.add({
        content: trimmed,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        userName,
      });
      setNewComment('');
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
                ?.map(comment => (
                    <li key={comment.id}>
                    <Comment {...comment} />
                    </li>
                ))}
            </ul>
        </div>
        <div>
            <form
            onSubmit={handleOnSubmit}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={newComment}
                    onChange={handleOnChange}
                />
                <button
                    type="submit"
                    disabled={!newComment}
                >
                    Send
                </button>
            </form>
        </div>
    </div>
  );
};

export default Section;