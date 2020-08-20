import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { useStyles } from './styles';

import Candidate from 'types/Candidate';

type Props = {
  candidate: Candidate;
};

const CandidateView = ({ candidate }: Props) => {
  const S = useStyles();

  const { fullName, email, avatar } = candidate;
  return (
    <Paper elevation={1} className={S.Candidate}>
      <div className={S.InfoCol}>
        <Avatar alt={fullName} src={avatar} className={S.Avatar} />
        <div>
          <Typography variant="h6">
            {fullName}
          </Typography>
          <Typography variant="subtitle1">
            {email}
          </Typography>
        </div>
      </div>

      <div className={S.DataCol}>

      </div>

      <div className={S.DataCol}>

      </div>
    </Paper>
  );
};

export default CandidateView;