import React from 'react';

import { useAppStyles } from 'styles/AppStyles';
// import { useStyles } from './styles';

const CandidatesScreen = () => {
  const AppS = useAppStyles();
  // const S = useStyles();
  return (
    <div className={AppS.Screen}>
      Candidates Screen
    </div>
  );
};

export default CandidatesScreen;