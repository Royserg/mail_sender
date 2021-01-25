import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
// Styles
import useStyles from './settingsStyles';
// Services
import { verifyConnection } from 'services/mailService';
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

const Settings: FC = () => {
  const classes = useStyles();

  const { register, handleSubmit, errors, formState } = useForm();

  const [expanded, setExpanded] = useState('panel1');
  const [connectionMessage, setConnectionMessage] = useState('');

  const handleChange = (panel: string) => (
    e: ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : '');
  };

  const handleConnectToOutlook = async (data: {
    email: string;
    password: string;
  }) => {
    console.log('connecting!', data);
    // Disable submit button and show `connecting` indicator

    // 1. Create transporter object from nodemailer (Context API)
    // 2. verify connection
    // 3. Save transporter if it successfully connected (Context API)

    try {
      const connectionResult = await verifyConnection('username', 'password');
      if (connectionResult) {
        setConnectionMessage('Successfully connected');
      }
    } catch (err) {
      console.log(err);
    }
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
                      defaultValue='username'
                    />
                    <TextField
                      name='password'
                      label='Password'
                      type='password'
                      inputRef={register({ required: 'Password required.' })}
                      error={!!errors.password}
                      helperText={errors.password && errors.password.message}
                      defaultValue='password'
                    />
                    <Button
                      variant='outlined'
                      className={classes.saveButton}
                      type='submit'
                      disabled={formState.isSubmitting}
                    >
                      Connect
                    </Button>
                    {/* Connection feedback */}
                    {connectionMessage && <div>{connectionMessage}</div>}
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
