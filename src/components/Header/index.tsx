import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

import { useStyles } from './styles';

const navs = [
  { title: 'Home', link: '/', cypressId: 'header__home-link' },
  { title: 'Apply yourselt', link: '/applicant', cypressId: 'header__applicant-link' },
  { title: 'All Candidates', link: '/candidates', cypressId: 'header__candidates-link' },
]

const Header = () => {
  const S = useStyles();
  return (
    <AppBar color="default" className={S.Header}>
      {navs.map(({ title, link, cypressId }) => (
        <NavLink exact
          key={link}
          to={link}
          className={S.NavItem} 
          data-cy={cypressId}
        >
          <Typography variant="subtitle1" className={S.NavText}>
            {title}
          </Typography>
        </NavLink>
      ))}
    </AppBar>
  );
};

export default Header;