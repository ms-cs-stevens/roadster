import React from "react";
import { formatRelative } from "date-fns";

const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    formattedDate = formatRelative(date, new Date());
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const Comment = ({ timestamp = null, content = "", userName = "" }) => {
  if (!content) return null;

  return (
    <div>
      <div>
        <div>
          {userName ? <p>{userName}</p> : null}
          {timestamp?.seconds ? (
            <span>{formatDate(new Date(timestamp.seconds * 1000))}</span>
          ) : null}
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Comment;
