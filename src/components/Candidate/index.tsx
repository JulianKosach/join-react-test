import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';

import { useStyles } from './styles';

import Candidate from 'types/Candidate';
type Props = {
  candidate: Candidate;
};

const CandidateView = ({ candidate }: Props) => {
  const S = useStyles();
  const { fullName, email, avatar, state, appliedOn, score = {} } = candidate;
  const { scorePercentage = 0, scoreTitle = '', scoreColor = '' } = score;
  const [progressCircleClass, setProgressCircleClass] = useState(S.ProgressCircleError);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const handleOpenMenu = (event: any) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleChangeState = () => {
    handleCloseMenu();
  };

  const handleDelete = () => {
    handleCloseMenu();
  };

  useEffect(() => {
    if (scoreColor === 'error') {
      setProgressCircleClass(S.ProgressCircleError);
    } else if (scoreColor === 'warn') {
      setProgressCircleClass(S.ProgressCircleWarning);
    } else {
      setProgressCircleClass(S.ProgressCircleOk);
    }
  }, [scoreColor, S]);

  return (
    <Paper elevation={1} className={S.Candidate}>
      <div className={S.DataCol} style={{ flex: 2 }}>
        <Avatar alt={fullName} src={avatar} className={S.Avatar} />
        <div className={S.InfoCol}>
          <Typography variant="h6">
            {fullName}
          </Typography>
          <Typography variant="subtitle1">
            <a href={`mailto:${email}`}>
              {email}
            </a>
          </Typography>
        </div>
      </div>

      <div className={S.DataCol} style={{ flex: 1 }}>
        <div className={S.ProgressWrap}>
          <CircularProgress
            variant="static"
            size={60}
            value={100} 
            classes={{ circle: S.ProgressBgCircle }}
            color="inherit"
          />
          <CircularProgress
            variant="static"
            size={60}
            value={scorePercentage}
            className={S.Progress}
            classes={{ circle: progressCircleClass }}
            color="inherit"
          />
          <Typography variant="subtitle1" className={S.ProgressValue}>
            {scorePercentage}%
          </Typography>
        </div>
        <div className={S.InfoCol}>
          <Typography variant="subtitle1" className={S.ScoreLabel}>
            Application score
          </Typography>
          <Typography variant="h6" className={S.ScoreValue}>
            {scoreTitle}
          </Typography>
        </div>
      </div>

      <div className={S.DataCol} style={{ flex: 1, justifyContent: 'flex-end' }}>
        <div className={S.StateBlock}>
          <Chip label={state} className={S.State} />
          <div className={S.AppliedOnRow}>
            <Typography variant="body1" className={S.AppliedOnLabel}>
              Applied on
            </Typography>
            <Typography variant="subtitle1">
              {appliedOn}
            </Typography>
          </div>
        </div>
        <Button 
          size="small"
          variant="outlined"
          className={S.MenuBtn}
          aria-controls="candidate-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu}
        >
          <MoreHorizIcon />
        </Button>
        <Menu
          id="candidate-menu"
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleChangeState} className={S.MenuItem}>
            <SettingsIcon />
            Change State
          </MenuItem>
          <MenuItem onClick={handleDelete} className={S.MenuItem}>
            <DeleteIcon />
            Delete
          </MenuItem>
        </Menu>
      </div>
    </Paper>
  );
};

export default CandidateView;