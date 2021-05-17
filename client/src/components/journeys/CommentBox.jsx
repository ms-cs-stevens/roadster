import React from 'react';
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import { useEffect } from "react";

firebase.initializeApp({
  apiKey: "AIzaSyA-dW5JvHVfWdaMoUeLxP0DRcjQ89GCbg4",
  authDomain: "roadster-sans.firebaseapp.com",
  projectId: "roadster-sans",
  storageBucket: "roadster-sans.appspot.com",
  messagingSenderId: "653920987324",
  appId: "1:653920987324:web:c656064aa53d57e1af08b9",
  measurementId: "G-4Y94RV73E9"
});

const db = firebase.firestore();
const query = db.collection('Comments').orderBy('timestamp').limit(100);

const [loading, setLoading] = useState(true);
const [user, setUser] = useState (() => auth.currentUser);
const { userId, userName } = user;


const CommentBox = ({ user = null }) => {
    const [comments, setComments] = useState([]);
    useEffect(()=>
    {
        const stop = firebase.auth().onAuthStateChanged(user=>{
        if(user)    setUser(user);
        else    setUser(false);

        if(loading) setLoading(false);
    });

      return stop;
    }, [loading]);

    useEffect(() => {
      const stop = query.onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setComments(data);
      });
      return stop;
    }, []);

    const handleOnChange = e => {
        setNewMessage(e.target.value);
    };

    const handleOnSubmit = e => {
        e.preventDefault();
      
        const trimmed = newComment.trim();
        if (trimmed) {
          commentsRef.add({
            content: trimmed,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            userId,
            userName,
            flagged: false,
          });
          setNewComment('');
        }
      };

    return (
        <div>
        <ul>
        {comments.map(comment => (
            <li key={comment.id}>{comment.content}
            <Comment { ...comment }/></li>
        ))}
        </ul>
        <form
        onSubmit={handleOnSubmit}>
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
        Post
        </button>
    </form>
    </div>
    );
};

export default CommentBox;
