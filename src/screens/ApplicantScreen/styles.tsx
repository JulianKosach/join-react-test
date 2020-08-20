
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Form: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    maxWidth: '100%',
    width: 400,
    padding: 30,
  },
  TextField: {
    marginTop: 20
  },
  ApplyButton: {
    marginTop: 20
  }
}));