import React, { FC, useEffect, useState } from 'react';
// import { Button, createMuiTheme, CssBaseline, Menu, ThemeProvider } from '@material-ui/core';
import { NavLink, Route, Switch } from 'react-router-dom';
// Styles
import './App.less';
// Redux
import { useStoreActions } from 'store';
// Components
// import Sidebar from 'components/Sidebar';
import Messages from 'views/Messages';
import Settings from 'views/Settings';
import MailingLists from 'views/MailingLists';
import Templates from 'views/Templates';

import { Button, Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const App: FC = () => {
  const { init } = useStoreActions(({ account }) => account);

  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Layout className='main-layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>Logo</div>
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
          <Menu.Item key='1' icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key='2' icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key='3' icon={<SettingOutlined />}>
            <NavLink to='/settings'>Settings</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            }
          )}
          <Button type='primary'>Themed?</Button>
        </Header>

        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route exact path='/messages' component={Messages} />
            <Route exact path='/templates' component={Templates} />
            <Route exact path='/lists' component={MailingLists} />
            <Route exact path='/settings' component={Settings} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

{
  /* <ThemeProvider theme={theme}>
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
    </ThemeProvider> */
}
