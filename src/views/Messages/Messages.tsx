import { FC } from 'react';
import { useForm } from 'react-hook-form';
// Redux
import { useStoreState } from 'store';
// Services
import { sendMail } from 'services/mailService';
// Styles
import useStyles from './messagesStyles';
// Components
import ViewContainer from 'components/ViewContainer';
import { Button, TextField } from '@material-ui/core';

const Messages: FC = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const { username } = useStoreState((state) => state.account.account);

  const handleFormSubmit = async (data: any) => {
    console.log(data);
    const result = await sendMail({
      recipient: data.recipient,
      cc: data.cc,
      subject: data.subject,
      html: data.content,
    });

    console.log('result', result);
  };

  return (
    <ViewContainer
      heading={username || 'Connect to your Outlook account in Settings'}
    >
      <h3>Create Message</h3>
      <div>
        <form
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div>
            <TextField
              name='recipient'
              label='To'
              inputRef={register({ required: 'Recipient required.' })}
              error={!!errors.recipient}
              helperText={errors.recipient && errors.recipient.message}
              classes={{ root: classes.fieldContainer }}
            />
          </div>

          <div>
            <TextField
              name='cc'
              label='CC'
              inputRef={register}
              classes={{ root: classes.fieldContainer }}
            />
          </div>

          <div>
            <TextField
              name='subject'
              label='Subject'
              inputRef={register({ required: 'Subject required.' })}
              error={!!errors.subject}
              helperText={errors.subject && errors.subject.message}
              classes={{ root: classes.fieldContainer }}
            />
          </div>

          <div style={{ margin: '2rem 0' }}>
            <TextField
              name='content'
              label='Content'
              inputRef={register({ required: 'Content required.' })}
              error={!!errors.content}
              helperText={errors.content && errors.content.message}
              variant='outlined'
              multiline
              rows={10}
              classes={{ root: classes.fieldContainer }}
            />
          </div>

          <Button variant='contained' type='submit'>
            Send
          </Button>
        </form>
      </div>
    </ViewContainer>
  );
};

export default Messages;
