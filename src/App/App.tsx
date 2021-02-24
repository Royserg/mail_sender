import React, { FC, useEffect, useState } from 'react';
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';

// Redux
import { useStoreActions, useStoreState } from 'store';

// Components
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout';
import logo from 'assets/icon.svg';
import {
  MailOutlined,
  SettingOutlined,
  CrownOutlined,
  TeamOutlined,
  EditOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

import routes from 'routes';

import Messages from 'views/Messages';
import Templates from 'views/Templates';
import MailingLists from 'views/MailingLists';
import Settings from 'views/Settings';
import Home from 'views/Home';
import { Drawer, List, message } from 'antd';
import { StatusKind } from 'types/mailingList';

const App: FC = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const { init, loadLists, setStatus } = useStoreActions((store) => {
    return {
      init: store.account.init,
      loadLists: store.mailingList.getLists,
      setStatus: store.mailingList.setStatus,
    };
  });

  const { currentlySending, sendStatus } = useStoreState(
    (store) => store.mailingList
  );

  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

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
    loadLists();
  }, [init, loadLists]);

  useEffect(() => {
    if (sendStatus === 'Loading') {
      setDrawerVisible(true);
    }
    if (sendStatus === 'Success') {
      message.success('Emails Sent successfully!');
      setStatus({ statusKind: StatusKind.sendStatus, status: undefined });
      setDrawerVisible(false);
    }
  }, [sendStatus, setStatus]);

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
    >
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/messages' component={Messages} />
        <Route exact path='/templates' component={Templates} />
        <Route exact path='/mailing-lists' component={MailingLists} />
        <Route exact path='/settings' component={Settings} />

        <Redirect to='/home' />
      </Switch>

      <Drawer
        title='Sending in process...'
        placement='right'
        // onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <List
          dataSource={currentlySending}
          loading={currentlySending.length === 0}
          locale={{ emptyText: 'Sending...' }}
          renderItem={(user, idx) => (
            <List.Item key={idx}>
              <List.Item.Meta title={user.email || 'email@mail.com'} />
              <CheckCircleOutlined />
            </List.Item>
          )}
        />
      </Drawer>
    </ProLayout>
  );
};

export default App;
