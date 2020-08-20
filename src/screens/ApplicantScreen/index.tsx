import React from 'react';

import { useAppStyles } from 'styles/AppStyles';
// import { useStyles } from './styles';

const ApplicantScreen = () => {
  const AppS = useAppStyles();
  // const S = useStyles();
  return (
    <div className={AppS.Screen}>
      Applicant Screen
    </div>
  );
};

export default ApplicantScreen;