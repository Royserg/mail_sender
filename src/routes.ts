const routes = [
  {
    path: '/messages',
    name: 'Messages',
    icon: 'MailOutlined',
  },
  {
    path: '/templates',
    name: 'Templates',
    icon: 'EditOutlined',
  },
  {
    path: '/mailing-lists',
    name: 'Malining lists',
    icon: 'TeamOutlined',
  },
  {
    path: '/demo',
    name: 'demo',
    icon: 'CrownOutlined',
    children: [
      {
        path: '/welcome',
        name: 'one',
      },
    ],
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: 'SettingOutlined',
  },
];

export default routes;
