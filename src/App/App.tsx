import { FC } from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
// Styles
import useStyles from './AppStyles';
// Components
import Sidebar from 'components/Sidebar';
import Messages from 'views/Messages';
import Settings from 'views/Settings';
import MailingLists from 'views/MailingLists';
import Templates from 'views/Templates';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
        },
      },
    },
  },
});

const App: FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidebar />
      <main className={classes.main}>
        <Switch>
          <Route exact path='/messages' component={Messages} />
          <Route exact path='/templates' component={Templates} />
          <Route exact path='/lists' component={MailingLists} />
          <Route exact path='/settings' component={Settings} />
        </Switch>
      </main>
    </ThemeProvider>
  );
};

export default App;
