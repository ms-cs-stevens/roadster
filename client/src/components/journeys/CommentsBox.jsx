import React, { useContext } from "react";
import Section from "./Section";
import { AuthContext } from "../../firebase/Auth";

function CommentsBox() {
  const { currentUser } = useContext(AuthContext);

  const renderContent = () => {
    if (currentUser) return <Section currentUser={currentUser} />;

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
