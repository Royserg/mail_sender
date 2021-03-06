import { FC } from 'react';

// Styles
import './Home.less';

// Components
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';

const Home: FC = () => {
  return (
    <PageContainer title='Dashboard'>
      <Card style={{ marginBottom: '20rem' }}>
        <Typography.Title level={3}>❤️ MailSender App ❤️</Typography.Title>
      </Card>
    </PageContainer>
  );
};

export default Home;
