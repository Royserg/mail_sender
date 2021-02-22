import { FC } from 'react';
import { useForm } from 'react-hook-form';
// Redux
import { useStoreState } from 'store';
// Services
// import { sendMail } from 'services/mailService';
// Styles

// Components
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormUploadButton,
  ProFormTextArea,
} from '@ant-design/pro-form';

import { Card } from 'antd';

const Messages: FC = () => {
  const { register, handleSubmit, errors } = useForm();

  const { username } = useStoreState((state) => state.account.account);

  console.log('username', username);

  const handleFormSubmit = async (data: any) => {
    console.log('sending mails', data);
    // const result = await sendMail({
    //   recipient: data.recipient,
    //   cc: data.cc,
    //   subject: data.subject,
    //   html: data.content,
    // });

    // console.log('result', result);
  };

  return (
    <PageContainer title='Message'>
      {/* Alert maybe in here saying if there is connection to Outlook account */}
      <Card>
        <ProForm
          submitter={{
            searchConfig: {
              submitText: 'Send',
            },
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
          }}
          onFinish={async (values) => handleFormSubmit(values)}
        >
          {/* Sender */}
          <ProFormText
            name='Email'
            label='Email'
            width='lg'
            fieldProps={{ placeholder: 'Connect to your Outlook email' }}
            initialValue={username || ''}
            disabled
            rules={[
              {
                required: true,
                message: 'Outlook account connection required',
              },
            ]}
          />

          {/* Recipients */}
          <ProForm.Group>
            {/* <ProFormText
              name='Recipients'
              label='Recipients'
              fieldProps={{
                placeholder: 'Enter recipients or upload mailing list',
              }}
              width='lg'
              rules={[
                {
                  required: true,
                  message: 'Recipient(s) required',
                },
              ]}
            /> */}

            <ProFormSelect
              name='mailingList'
              label='Mailing list'
              fieldProps={{
                placeholder: 'Mailing list',
              }}
              width='md'
              options={[
                // Fetch mailing lists, or rather read them from redux
                {
                  value: 'list1',
                  label: 'list1_label',
                },
              ]}
              rules={[
                {
                  required: true,
                  message: 'Mailing list required',
                },
              ]}
            />
          </ProForm.Group>

          <ProFormText
            name='cc'
            label='CC'
            fieldProps={{
              placeholder: 'Enter cc',
            }}
            width='lg'
            rules={[
              {
                required: false,
              },
            ]}
          />

          <ProFormText
            name='subject'
            label='Email subject'
            width='lg'
            fieldProps={{ placeholder: 'Enter email subject' }}
            rules={[
              {
                required: true,
                message: 'Subject required',
              },
            ]}
          />

          <ProFormUploadButton
            extra='Upload：.jpg .zip .doc .wps'
            label='Upload'
            name='file'
            title='Upload'
          />

          <ProFormTextArea
            width='xl'
            label='Message'
            name='message'
            fieldProps={{
              placeholder: 'Message',
            }}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default Messages;
