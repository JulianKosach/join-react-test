import React from 'react';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';
import { useAppStyles } from 'styles/AppStyles';
import { useStyles } from './styles';

const HomeScreen = () => {
  const history = useHistory();
  const AppS = useAppStyles();
  const S = useStyles();

  const redirectTo = (link: string) => {
    history.push(link);
  };

  return (
    <div className={clsx(AppS.Screen, S.Container)}>
      <Typography
        variant="h5"
      >
        Interested in this job?
      </Typography>

      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={() => redirectTo('/applicant')}
        data-cy="home__applicant-link"
        className={S.ApplyButton}
      >
        Apply yourself
      </Button>

      <Typography
        variant="h6"
        className={S.OrText}
      >
        - OR -
      </Typography>
      <Typography
        variant="subtitle1"
        className={S.OrText}
      >
        Are you a Recruiter?
      </Typography>

      <Button
        size="large"
        variant="contained"
        color="secondary"
        data-cy="home__candidates-link"
        onClick={() => redirectTo('/candidates')}
        className={S.ListButton}
      >
        View All Candidates
      </Button>
    </div>
  );
};

export default HomeScreen;