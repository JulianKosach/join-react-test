import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';

import stores from 'stores';
import { states } from 'helpers/state.helper';

import { useStyles } from './styles';

import Candidate from 'types/Candidate';
type Props = {
  candidate: Candidate;
};

const CandidateView = ({ candidate }: Props) => {
  const S = useStyles();
  const { candidatesStore } = stores;
  const { id, fullName, email, avatar, state, appliedOn, score = {} } = candidate;
  const { scorePercentage = 0, scoreTitle = '', scoreColor = '' } = score;
  
  const [progressCircleClass, setProgressCircleClass] = useState(S.ProgressCircleError);
  const [stateClass, setStateClass] = useState(S.State);

  const currentState = states.find(item => item.label === state) || states[0];
  const availableStates = states.filter(item => {
    const stepDiff = item.step - currentState.step;
    return stepDiff === 0 || stepDiff === 1;
  });

  const [newState, setNewState] = useState(state);
  const [showDialog, setShowDialog] = useState(false);
  const handleOpenDialog = () => {
    setShowDialog(true);
  };
  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const handleOpenMenu = (event: any) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleChangeState = () => {
    handleCloseMenu();
    handleOpenDialog();
  };

  const handleDelete = () => {
    handleCloseMenu();
    candidatesStore.deleteCandidate(id);
  };

  const handleChangeNewState = (event: any) => {
    setNewState(event.target.value);
  };

  const handleUpdateState = () => {
    handleCloseDialog();
    candidatesStore.updateCandidate(id, { state: newState });
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

  useEffect(() => {
    setNewState(state);
  }, [state]);

  useEffect(() => {
    if (state === 'hired') {
      setStateClass(S.StateHired);
    } else if (state === 'not a fit') {
      setStateClass(S.StateRejected);
    } else if (state === 'in review') {
      setStateClass(S.StateProgress);
    } else {
      setStateClass(S.State);
    }
  }, [state, S]);

  return (
    <Paper elevation={1} className={S.Candidate} data-cy="candidate" data-id={id}>
      <div className={S.DataCol} style={{ flex: 2 }}>
        <Avatar alt={fullName} src={avatar} className={S.Avatar} />
        <div className={S.InfoCol}>
          <Typography variant="h6" data-cy="candidate__fullName">
            {fullName || 'No name'}
          </Typography>
          <Typography variant="subtitle1">
            <a href={`mailto:${email}`} data-cy="candidate__email">
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
          <Typography variant="subtitle1" className={S.ProgressValue} data-cy="candidate__score">
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
          <Chip label={state} className={stateClass} onClick={handleOpenDialog} data-cy="candidate__state" />
          <div className={S.AppliedOnRow}>
            <Typography variant="body1" className={S.AppliedOnLabel}>
              Applied on
            </Typography>
            <Typography variant="subtitle1">
              {(appliedOn || '').split(' ')[0]}
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
          data-cy="candidate__menu-btn"
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
          <MenuItem onClick={handleChangeState} className={S.MenuItem} data-cy="candidate__change-state-btn">
            <SettingsIcon />
            Change State
          </MenuItem>
          <MenuItem onClick={handleDelete} className={S.MenuItem} data-cy="candidate__delete-btn">
            <DeleteIcon />
            Delete
          </MenuItem>
        </Menu>


        <Dialog onClose={handleCloseDialog} aria-labelledby="state-change-dialog" open={showDialog}>
          <DialogTitle id="state-change-dialog">
            Change state
          </DialogTitle>
          <div className={S.DialogBody}>
            <FormControl className={S.StateSelect}>
              <InputLabel id="state-select-label">New State</InputLabel>
              <Select
                labelId="state-select-label"
                id="state-select"
                value={newState}
                onChange={handleChangeNewState}
                data-cy="candidate__state-select"
              >
                {availableStates.map(({ label }) => (
                  <MenuItem key={label} value={label} className={S.StateSelectOption} data-cy={`candidate__state-select-option-${label.replace(' ', '-')}`}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              disabled={newState === state}
              onClick={handleUpdateState}
              className={S.DialogSaveBtn}
              data-cy="candidate__update-state-btn"
            >
              Update State
            </Button>
          </div>
        </Dialog>
      </div>
    </Paper>
  );
};

export default CandidateView;