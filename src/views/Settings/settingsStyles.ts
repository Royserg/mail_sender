import { makeStyles } from '@material-ui/core/styles';
import { colors } from 'assets/jss/general';

const settingsStyles = makeStyles((theme) => ({
  settingsContainer: {
    marginTop: '1rem',
    width: '80%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  saveButton: {
    marginTop: '1rem',
    width: '100%',
  },
  feedbackSuccess: {
    color: colors.success,
  },
  feedbackFail: {
    color: colors.error,
  },
}));

export default settingsStyles;
