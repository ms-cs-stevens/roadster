import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useAuthState} from '../hooks';
import Section from './Section';
//import Loader from './components/Loader';

firebase.initializeApp({
  apiKey: "AIzaSyA-dW5JvHVfWdaMoUeLxP0DRcjQ89GCbg4",
  authDomain: "roadster-sans.firebaseapp.com",
  projectId: "roadster-sans",
  storageBucket: "roadster-sans.appspot.com",
  messagingSenderId: "653920987324",
  appId: "1:653920987324:web:c656064aa53d57e1af08b9",
  measurementId: "G-4Y94RV73E9"
});

function CommentsBox() {
  const { user, /* initializing */ } = useAuthState(firebase.auth());
  
  const renderContent = () => {
    /* if (initializing) {
      return (
        <div >
        </div>
      );
    } */

    if (user) return <Section user={user} />;

    return (
      <div>
        <div>
          <h2>
            Comments
          </h2>
        </div>
      </div>
    );
  };

  //
  return (
    <div>
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default CommentsBox;