import React, { FC, ReactElement } from 'react';
import { Container, Typography } from '@material-ui/core';

// Styles
import useStyles from './viewContainerStyles';

interface ViewContainerProps {
  heading: string;
  children: ReactElement;
}

const ViewContainer: FC<ViewContainerProps> = ({ heading, children }) => {
  const classes = useStyles();

  return (
    <>
      {heading && (
        <div className={classes.headingContainer}>
          <Typography variant='h6' classes={{ root: classes.heading }}>
            {heading}
          </Typography>
        </div>
      )}
      <Container maxWidth='lg'>{children}</Container>
    </>
  );
};

export default ViewContainer;
