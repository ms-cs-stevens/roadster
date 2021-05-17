import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    // backgroundColor: red[500],
  },
  oppositeContent: {
    flex: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
}));

const AddCheckpoints = () => {
  const classes = useStyles();

  return (
    <>
      <form className={classes.form} onSubmit={"hello"}>

      </form>
    </>
  );
}

export default AddCheckpoints;