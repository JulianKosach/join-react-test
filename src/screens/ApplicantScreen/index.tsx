import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Preloader from 'components/Preloader';

import stores from 'stores';

import clsx from 'clsx';
import { useAppStyles } from 'styles/AppStyles';
import { useStyles } from './styles';

const ApplicantScreen = () => {
  const history = useHistory();
  const AppS = useAppStyles();
  const S = useStyles();

  const { candidatesStore } = stores;
  const { loading, newCandidate } = candidatesStore;

  const handleChange = (event: any) => {
    candidatesStore.handleChangeNewCandidate({ field: event.target.name , value: event.target.value });
  };

  const handleApply = async () => {
    await candidatesStore.addNewCandidate();
    history.push('/candidates');
  };

  return (
    <div className={clsx(AppS.Screen, S.Container)}>
      <Paper className={S.Form}>
        <Typography
          variant="h5"
        >
          Interested in this job?
        </Typography>

        <FormControl className={S.TextField}>
          <TextField
            label="Full Name"
            variant="outlined"
            name="fullName"
            value={newCandidate.fullName}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleApply}
          className={S.ApplyButton}
        >
          Apply now for this job
        </Button>
      </Paper>

      {loading && <Preloader />}
    </div>
  );
};

export default observer(ApplicantScreen);