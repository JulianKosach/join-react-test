
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: any) => ({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Form: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    maxWidth: '100%',
    width: 400,
    padding: 30,
  },
  AvatarRow: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  AvatarWrap: {
    position: 'relative',
    padding: 10
  },
  Avatar: {
    width: 80,
    height: 80
  },
  FileInput: {
    display: 'none'
  },
  AvatarUploadWrap: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: '50%',
    background: theme.palette.common.white,
    boxShadow: '0 0 5px 1px rgba(0,0,0,0.1)'
  },
  AvatarUploadBtn: {
    padding: 5
  },
  AvatarHelper: {
    textAlign: 'left',
    marginLeft: 10
  },
  AvatarHelperText: {
    opacity: 0.7,
    fontSize: 10,
    color: theme.palette.secondary.main,
  },
  AvatarHelperError: {
    color: '#d96865',
    fontSize: 10,
    marginTop: 10,
  },
  TextField: {
    marginTop: 20
  },
  ApplyButton: {
    marginTop: 20
  }
}));