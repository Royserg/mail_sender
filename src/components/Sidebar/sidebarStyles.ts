//@ts-check
import { makeStyles } from '@material-ui/core/styles';
import { sizes, boxShadow, colors } from 'assets/jss/general';

const sidebarStyles = makeStyles({
  drawerContainer: {
    background: colors.white,
    border: 'none',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    zIndex: 1,
    ...boxShadow,
    width: sizes.sidebarWidth,
  },
  sidebarLink: {
    textDecoration: 'none',
    color: colors.black[0],
  },
});

export default sidebarStyles;
