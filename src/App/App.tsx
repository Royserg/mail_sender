import React, { FC, useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
// Styles
// import './App.less';
// Redux
import { useStoreActions } from 'store';

// Components
import ProLayout, { DefaultFooter, MenuDataItem } from '@ant-design/pro-layout';
import logo from 'assets/icon.svg';
import {
  GithubOutlined,
  MailOutlined,
  SettingOutlined,
  CrownOutlined,
  TeamOutlined,
  EditOutlined,
} from '@ant-design/icons';

import routes from 'routes';

import Messages from 'views/Messages';
import Templates from 'views/Templates';
import MailingLists from 'views/MailingLists';
import Settings from 'views/Settings';

// <---- Probably to delete below ----->
const App: FC = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const { init } = useStoreActions(({ account }) => account);

  const IconMap = {
    MailOutlined: <MailOutlined />,
    EditOutlined: <EditOutlined />,
    TeamOutlined: <TeamOutlined />,
    CrownOutlined: <CrownOutlined />,
    SettingOutlined: <SettingOutlined />,
  };

  useEffect(() => {
    console.log('initializing the data');
    init();
  }, [init]);

  // Not used <3 👇 👇
  const Footer = (
    <DefaultFooter
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
  );
  // Not used 👆 👆

  const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
    menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }));

  return (
    <ProLayout
      title='MailSender'
      fixSiderbar={true}
      location={{
        pathname: location.pathname,
      }}
      logo={logo}
      onMenuHeaderClick={() => history.push('/')}
      menuDataRender={() => loopMenuItem(routes)}
      menuItemRender={(item, dom) => {
        return <NavLink to={item.path || '/'}>{dom}</NavLink>;
      }}
      headerRender={false}
      // footerRender={() => Footer}
    >
      <Switch>
        <Route exact path='/messages' component={Messages} />
        <Route exact path='/templates' component={Templates} />
        <Route exact path='/mailing-lists' component={MailingLists} />
        <Route exact path='/settings' component={Settings} />

        <Redirect to='/messages' />
      </Switch>
    </ProLayout>
  );
};

export default App;
