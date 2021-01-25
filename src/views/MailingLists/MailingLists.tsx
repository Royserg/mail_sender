import ViewContainer from 'components/ViewContainer';
import { FC } from 'react';

import useStyles from './mailingListsStyles';

const MailingLists: FC = () => {
  const classes = useStyles();

  return (
    <ViewContainer heading='Mailing List'>
      <p>Upload .csv or shit</p>
    </ViewContainer>
  );
};

export default MailingLists;
