
import { makeStyles } from '@material-ui/styles';

export const AppBarHeight = 60;

export const useAppStyles = makeStyles((theme: any) => ({
  Container: {
    height: '100vh',
    paddingTop: AppBarHeight,
    color: theme.palette.secondary.main,
    background: theme.palette.grey['100']
  },
  Screen: {
    minHeight: '100%',
    padding: 30
  }
}));