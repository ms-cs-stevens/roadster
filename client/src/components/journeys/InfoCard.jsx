import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";

const InfoCard = (props) => (
  <Card style={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={6} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            component="h2"
            variant="h6"
          >
            {props.title}
          </Typography>
          <Typography color="textPrimary" variant="body2">
            {props.value}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: props.color[600],
              height: 56,
              width: 56,
            }}
          >
            {props.icon}
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default InfoCard;
