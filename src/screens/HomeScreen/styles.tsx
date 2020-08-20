
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ApplyButton: {
    marginTop: 30,
    minWidth: 280
  },
  OrText: {
    marginTop: 30
  },
  ListButton: {
    marginTop: 30,
    minWidth: 280
  }
}));