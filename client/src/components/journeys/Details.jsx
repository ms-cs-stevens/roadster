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
}));

const InfoCard = ({ journey }) => {
  if (journey) {
    return (
      <Card>
        <CardHeader title="Trip details" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 300,
              position: "relative",
            }}
          >
            <dl>
              <dt className="title">Origin : </dt>
              <dd>
                {journey.origin.locality} {journey.origin.state},{" "}
                {journey.origin.country}
              </dd>

              {/* <dt className="title">Stops :</dt>
              {stopCities.length >= 1 ? (
                <div>
                  {stopCities.map((obj) => {
                    let dd = (
                      <dd key={obj.place_id}>
                        {obj.locality} {obj.state}, {obj.country}
                      </dd>
                    );
                    return dd;
                  })}
                </div>
              ) : (
                <dd>No Stops</dd>
              )} */}

              <dt className="title">Destination : </dt>
              <dd>
                {journey.destination.locality} {journey.destination.state},{" "}
                {journey.destination.country}
              </dd>

              <dt className="title">Occupancy : </dt>
              <dd>{journey.occupancy}</dd>

              <dt className="title">Budget : </dt>
              <dd>{journey.budget}</dd>
            </dl>
          </Box>
        </CardContent>
      </Card>
    );
  } else {
    return "Loading Trip Details !!";
  }
};

export default InfoCard;
