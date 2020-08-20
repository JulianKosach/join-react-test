
import { makeStyles } from '@material-ui/styles';
import { AppBarHeight } from 'AppStyles';

export const useStyles = makeStyles(() => ({
  Header: {
    height: AppBarHeight,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px 30px'
  }
}));