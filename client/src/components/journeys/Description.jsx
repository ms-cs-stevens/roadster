import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Typography,
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
}));

const InfoCard = ({ journey }) => {
  if (journey) {
    return (
      <Card>
        <CardHeader title="Trip Details" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 300,
              position: "relative",
            }}
          >
            <Typography component="h2" variant="h6">
              Name
            </Typography>
            <Typography>{journey.name}</Typography>
            <br />
            <br />
            <Typography component="h2" variant="h6">
              Description
            </Typography>
            <Typography>
              CategoriesTravel TrendsBusiness ManagementMarketingTravel
              TechnologyDistributionTrekkSoft Tips Search How to write a tour
              description that sells All Posts Published by Stephanie Kutschera
              | Sep 4, 2018 | Tourism Marketing | 3 MIN READ Let's say you are a
              tour operator who offers paragliding to travelers from all over
              the world. You work in a busy city, so there are three other
              similar size tour companies providing paragliding activities in
              the same location that you run your tours. You know what makes
              your paragliding experience different from your competitors, but
              how can you let potential customers know?
            </Typography>
            <br />
            <br />
            <Typography component="h2" variant="h6">
              Images
            </Typography>
            <Typography>Show images here ....</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  } else {
    return "Loading Trip Details !!";
  }
};

export default InfoCard;
