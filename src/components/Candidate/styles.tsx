
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: any) => ({
  Candidate: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.secondary.main
  },
  InfoCol: {
    display: 'flex',
    alignItems: 'center',
  },
  Avatar: {
    marginRight: 20
  },
  DataCol: {

  }
}));