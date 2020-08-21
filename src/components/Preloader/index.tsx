import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './styles';

const Preloader = () => {
  const S = useStyles();
  return (
    <div className={S.Preloader}>
      <CircularProgress />
    </div>
  );
};

export default Preloader;