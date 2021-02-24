import React, { FC } from 'react';
import { GithubOutlined } from '@ant-design/icons';

// Styles
import './Home.less';

// Components
import { DefaultFooter, PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';

const Home: FC = () => {
  return (
    <PageContainer title='Dashboard'>
      <Card style={{ marginBottom: '20rem' }}>
        <Typography.Title level={3}>
          Final Project application - MailSender
        </Typography.Title>
      </Card>
      <DefaultFooter
        style={{ position: 'fixed', bottom: '0', left: '50%' }}
        copyright={`${new Date().getFullYear()}`}
        links={[
          {
            key: 'github',
            title: <GithubOutlined />,
            href: 'https://github.com/Royserg/mail_sender',
            blankTarget: true,
          },
        ]}
      />
    </PageContainer>
  );
};

export default Home;
