import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

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
  const { loading, newCandidate, newCandidateValidation } = candidatesStore;
  const { isValid, validationErrors } = newCandidateValidation;
  const [showPassword, setShowPassword] = useState(false);

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

        <div className={S.AvatarRow}>
          <div className={S.AvatarWrap}>
            <Avatar
              alt={newCandidate.fullName}
              src={newCandidate.avatar}
              className={S.Avatar}
            />
            <input
              accept="image/*"
              className={S.FileInput}
              id="avatar_upload"
              type="file"
              onChange={candidatesStore.handleUploadCandidateAvatar}
            />
            <label
              htmlFor="avatar_upload"
              className={S.AvatarUploadWrap}
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                className={S.AvatarUploadBtn}
              >
                <PhotoCameraIcon />
              </IconButton>
            </label>
          </div>
          <div className={S.AvatarHelper}>
            <Typography
              variant="body1"
              className={S.AvatarHelperText}
            >
              Upload your image: <br />
              * .png, .jpg <br />
              * size up to 300 kb
            </Typography>
            {validationErrors.avatar && <Typography
              variant="body1"
              className={S.AvatarHelperError}
            >
              {validationErrors.avatar}
            </Typography>}
          </div>
        </div>

        <FormControl className={S.TextField}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            name="email"
            value={newCandidate.email}
            onChange={handleChange}
            error={validationErrors.email}
            helperText={validationErrors.email}
          />
        </FormControl>

        <FormControl className={S.TextField}>
          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            variant="outlined"
            name="password"
            value={newCandidate.password}
            onChange={handleChange}
            error={validationErrors.password}
            helperText={validationErrors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </FormControl>

        <FormControl className={S.TextField}>
          <TextField
            type="text"
            label="Full Name"
            variant="outlined"
            name="fullName"
            value={newCandidate.fullName}
            onChange={handleChange}
            error={validationErrors.fullName}
            helperText={validationErrors.fullName}
          />
        </FormControl>

        <FormControl className={S.TextField}>
          <TextField
            type="phone"
            label="Phone number"
            variant="outlined"
            name="phone"
            value={newCandidate.phone}
            onChange={handleChange}
            error={validationErrors.phone}
            helperText={validationErrors.phone}
          />
        </FormControl>

        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleApply}
          className={S.ApplyButton}
          disabled={!isValid}
        >
          Apply now for this job
        </Button>
      </Paper>

      {loading && <Preloader />}
    </div>
  );
};

export default observer(ApplicantScreen);