import React from 'react';
import Paper from '@material-ui/core/Paper';

import { useStyles } from './styles';

import Candidate from 'types/Candidate';

type Props = {
  candidate: Candidate;
};

const CandidateView = ({ candidate }: Props) => {
  const S = useStyles();

  const { fullName } = candidate;
  return (
    <Paper elevation={1} className={S.Candidate}>
      {fullName}
    </Paper>
  );
};

export default CandidateView;