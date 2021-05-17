import React, { useContext } from "react";
import Section from "./Section";
import { AuthContext } from "../../firebase/Auth";

function CommentsBox({ journey }) {
  const { currentUser } = useContext(AuthContext);

  let data = currentUser;
  data.journeyId = journey._id;

  const renderContent = () => {
    if (currentUser) return <Section data={data}/>;

    return (
      <div>
        <div>
          <h2>Comments</h2>
        </div>
      </div>
    );
  };

  //
  return (
    <div>
      <main>{renderContent()}</main>
    </div>
  );
}

export default CommentsBox;
