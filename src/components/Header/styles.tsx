
import { makeStyles } from '@material-ui/styles';
import { AppBarHeight } from 'styles/AppStyles';

export const useStyles = makeStyles((theme: any) => ({
  Header: {
    height: AppBarHeight,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px 30px'
  },
  NavItem: {
    marginRight: 30,
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    '&.active': {
      color: theme.palette.primary.main,
    },
  },
  NavText: {
    fontWeight: 'bold',
  }
}));