
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: any) => ({
  Candidate: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.secondary.main
  },
  DataCol: {
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none'
    }
  },
  InfoCol: {
    
  },
  Avatar: {
    marginRight: 10
  },
  ProgressWrap: {
    position: 'relative',
    marginRight: 10
  },
  ProgressBgCircle: {
    stroke: theme.palette.grey['300']
  },
  Progress: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  ProgressCircleError: {
    stroke: '#d96865'
  },
  ProgressCircleWarning: {
    stroke: '#f09451'
  },
  ProgressCircleOk: {
    stroke: theme.palette.primary.main
  },
  ProgressValue: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate3d(-50%,-50%,0)'
  },
  ScoreLabel: {
    fontSize: 16,
    opacity: 0.7
  },
  ScoreValue: {
    fontWeight: 'bold'
  },

  StateBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  State: {
    textTransform: 'uppercase',
    color: theme.palette.secondary.main,
  },
  StateHired: {
    textTransform: 'uppercase',
    color: '#128d25',
    fontWeight: 'bold'
  },
  StateRejected: {
    textTransform: 'uppercase',
    color: '#d96865',
    fontWeight: 'bold'
  },
  StateProgress: {
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  AppliedOnRow: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
  },
  AppliedOnLabel: {
    fontSize: 14,
    marginRight: 6,
    opacity: 0.7
  },
  MenuBtn: {
    padding: 0,
    width: 40,
    minWidth: 40,
    height: 40,
    color: theme.palette.secondary.main,
    marginLeft: 20,
  },
  MenuItem: {
    color: theme.palette.secondary.main,
    '& > svg': {
      marginRight: 5
    }
  },

  DialogBody: {
    padding: '10px 30px 30px',
    color: theme.palette.secondary.main,
    minWidth: 280
  },
  StateSelect: {
    width: '100%'
  },
  StateSelectOption: {
    
  },
  DialogSaveBtn: {
    width: '100%',
    marginTop: 20
  }
}));