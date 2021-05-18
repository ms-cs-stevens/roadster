import React from 'react';

const journey = {
  journeyId: null,
  origin: null,
  destination: null,
  checkpoints: []
};

const JourneyContext = React.createContext(journey);

export default JourneyContext;


