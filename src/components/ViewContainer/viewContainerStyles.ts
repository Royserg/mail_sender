import { makeStyles } from '@material-ui/core/styles';
import { boxShadow, colors } from 'assets/jss/general';

const styles = makeStyles({
  headingContainer: {
    background: colors.black[2],
    zIndex: 1,
    marginBottom: '1rem',
    ...boxShadow,
  },
  heading: {
    padding: '0.5rem',
    color: colors.white,
    marginLeft: '1rem',
  },
});

export default styles;
