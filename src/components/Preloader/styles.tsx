
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  Preloader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255,255,255,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
}));