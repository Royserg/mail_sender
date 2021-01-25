import { makeStyles } from '@material-ui/core/styles';

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
}));

export default settingsStyles;
