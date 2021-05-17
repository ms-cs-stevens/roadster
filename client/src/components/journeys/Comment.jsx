import { formatRelative } from 'date-fns';

const formatDate = date => {
  let formattedDate = '';
  if (date) {
    formattedDate = formatRelative(date, new Date());
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const Message = ({
  timestamp = null,
  content = '',
  userName = '',
  flagged = false,
}) => {
  if (!content) return null;

return (
  <div>
    {userName ? <p>{userName}</p> : null}
    {timestamp?.seconds ? (
      <span>{formatDate(new Date(createdAt.seconds * 1000))}</span>
    ) : null}
    <p>{content}</p>
  </div>
);
};