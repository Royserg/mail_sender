import { FC } from 'react';
// Components
import ViewContainer from 'components/ViewContainer';

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
