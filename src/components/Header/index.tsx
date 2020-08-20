import React from 'react';
import AppBar from '@material-ui/core/AppBar';

import { useStyles } from './styles';

const Header = () => {
  const S = useStyles();
  return (
    <AppBar color="default" className={S.Header}>
      Header
    </AppBar>
  );
};

export default Header;