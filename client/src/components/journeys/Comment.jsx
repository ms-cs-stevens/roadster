import React from "react";
import { formatRelative } from "date-fns";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@material-ui/core";

const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    formattedDate = formatRelative(date, new Date());
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const Comment = ({ timestamp = null, content = "", username = "" }) => {
  if (!content) return null;

  return (
    <div>
      <Card>
        <CardHeader title={username} />
        <Divider />
        <CardContent>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Typography>{content}</Typography>
            {formatDate(new Date(timestamp))}
          </Box>
        </CardContent>
      </Card>
      <br />
    </div>
  );
};

export default Comment;
