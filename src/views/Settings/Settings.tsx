import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
// Styles
import useStyles from './settingsStyles';
// Redux
import { useStoreActions, useStoreState } from 'store';
// Components
import ViewContainer from 'components/ViewContainer/ViewContainer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

import config from 'config';

const Settings: FC = () => {
  const classes = useStyles();

  const { connect } = useStoreActions(({ account }) => account);
  const { connectionFeedback, connectionStatus } = useStoreState(
    ({ account }) => account
  );

  const { register, handleSubmit, errors } = useForm();

  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel: string) => (
    e: ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : '');
  };

  const handleConnectToOutlook = async (data: {
    username: string;
    password: string;
  }) => {
    // Disable submit button and show `connecting` indicator
    console.log('sending', data);

    connect({ username: data.username, password: data.password });
  };

  return (
    <ViewContainer heading='Settings'>
      <Grid container justify='center' alignItems='center'>
        <div className={classes.settingsContainer}>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='connection-settings'
              id='connection-settings'
            >
              <Typography className={classes.heading}>
                Outlook Account
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
              >
                <Typography className={classes.secondaryHeading}>
                  Connect to your Outlook account.
                </Typography>
                <form onSubmit={handleSubmit(handleConnectToOutlook)}>
                  <Grid
                    container
                    justify='center'
                    alignItems='center'
                    direction='column'
                  >
                    <TextField
                      name='username'
                      label='Username'
                      placeholder='mymail@mail.com'
                      inputRef={register({ required: 'Username required.' })}
                      error={!!errors.username}
                      helperText={errors.username && errors.username.message}
                      defaultValue={config.USERNAME}
                    />
                    <TextField
                      name='password'
                      label='Password'
                      type='password'
                      inputRef={register({ required: 'Password required.' })}
                      error={!!errors.password}
                      helperText={errors.password && errors.password.message}
                      defaultValue={config.PASSWORD}
                    />
                    <Button
                      variant='outlined'
                      className={classes.saveButton}
                      type='submit'
                      disabled={connectionStatus === 'Loading'}
                    >
                      {connectionStatus === 'Loading'
                        ? 'Loading...'
                        : 'Connect'}
                    </Button>
                    {/* Connection feedback */}
                    {connectionFeedback.message && (
                      <div
                        className={clsx(
                          connectionFeedback.success
                            ? classes.feedbackSuccess
                            : classes.feedbackFail
                        )}
                      >
                        {connectionFeedback.message}
                      </div>
                    )}
                  </Grid>
                </form>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='theme-settings'
              id='theme-settings'
            >
              <Typography className={classes.heading}>Theme</Typography>
              <Typography className={classes.secondaryHeading}>
                Change theme
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>To Implement this functionality if time</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
    </ViewContainer>
  );
};

export default Settings;
