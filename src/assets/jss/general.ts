import { red } from '@material-ui/core/colors';
import green from '@material-ui/core/colors/green';

// ==========================================
// General styles used across the application
const sizes = {
  sidebarWidth: 170,
};

// Colors palette
const colors = {
  primary: ['#9c27b0', '#BE78E7', '#8e24aa', '#af2cc5'],
  success: green[500],
  error: red[600],
  black: ['#000000', '#333333', '#555555'],
  white: '#FFFFFF',
};

// General Box Shadow
// https://getcssscan.com/css-box-shadow-examples
const boxShadow = {
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 12px`,
};

export { sizes, colors, boxShadow };
