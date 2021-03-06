import React, { FC } from 'react';
// Styles
// Redux
import { useStoreActions, useStoreState } from 'store';

// Components
import { Card, Switch, List, Alert } from 'antd';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const Settings: FC = () => {
  const { connect } = useStoreActions(({ account }) => account);
  const { connectionFeedback, connectionStatus } = useStoreState(
    ({ account }) => account
  );

  // Theme Switching
  const { switcher, currentTheme, themes } = useThemeSwitcher();

  const handleThemeSwitch = (checked: boolean) => {
    // setIsDarkMode(checked);
    switcher({ theme: checked ? themes.dark : themes.light });
  };
  // Theme Switching --- End

  const handleConnectToOutlook = async (data: {
    username: string;
    password: string;
  }) => {
    connect({ username: data.username, password: data.password });
  };

  const OutlookForm = (
    <>
      {connectionFeedback.message && (
        <Alert
          message={connectionFeedback.message}
          banner
          type={connectionFeedback.success ? 'success' : 'error'}
        />
      )}
      <ProForm
        submitter={{
          searchConfig: {
            submitText:
              connectionStatus === 'Loading' ? 'Loading...' : 'Connect',
          },
          submitButtonProps: {
            disabled: connectionStatus === 'Loading' ? true : false,
            loading: connectionStatus === 'Loading',
          },
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
        onFinish={async (values: { username: string; password: string }) =>
          handleConnectToOutlook(values)
        }
      >
        <ProFormText
          name='username'
          label='Email'
          width='md'
          fieldProps={{ placeholder: 'Outlook email' }}
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Email required',
            },
          ]}
        />
        <ProFormText
          name='password'
          label='Password'
          width='md'
          fieldProps={{ placeholder: 'Outlook password', type: 'password' }}
          rules={[
            {
              required: true,
              message: 'Password required',
            },
          ]}
        />
      </ProForm>
    </>
  );

  return (
    <PageContainer>
      <Card>
        <h3>Settings</h3>
        <List itemLayout='horizontal'>
          <List.Item actions={[OutlookForm]}>
            <List.Item.Meta
              title='Outlook connection'
              description='Connect to your outlook account'
            />
          </List.Item>
          <List.Item
            actions={[
              // TODO: SAVE THEME in the db -> Config table?
              <Switch
                onChange={handleThemeSwitch}
                checked={currentTheme === themes.dark}
                checkedChildren='Dark'
                unCheckedChildren='Light'
              />,
            ]}
          >
            <List.Item.Meta
              title='Theme'
              description='Choose between light and dark'
            />
          </List.Item>
        </List>
      </Card>
    </PageContainer>
  );
};

export default Settings;
