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
    name: 'Mailing lists',
    icon: 'TeamOutlined',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: 'SettingOutlined',
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
];

export default routes;
