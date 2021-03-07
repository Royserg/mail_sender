import React, { FC, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
// Redux
import { useStoreActions, useStoreState } from 'store';

// Styles
import './Messages.less';
// Components
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Button, Card, Divider, Tag, Typography } from 'antd';
import EmailEditor from 'react-email-editor';

const { Paragraph } = Typography;

interface AttachmentFile {
  name: string;
  path: string;
}

const Messages: FC = () => {
  const { sendMails } = useStoreActions(({ mailingList }) => mailingList);
  const { user, mailingLists } = useStoreState((state) => {
    return {
      user: state.account.account,
      mailingLists: state.mailingList.mailingLists,
    };
  });

  const history = useHistory();

  const [currentList, setCurrentList] = useState<string>('');
  const [filesList, setFileList] = useState<AttachmentFile[]>([]);

  let editor = useRef(null);

  useEffect(() => {
    // @ts-ignore
    editor.current = unlayer.init({
      id: 'editor-container',
      projectId: 1234,
      displayMode: 'web',
      appearance: {
        theme: 'dark',
      },
    });

    console.log('editor', editor);
  }, []);

  // Handlers
  const handleFormSubmit = async (formData: any) => {
    // Add attachments
    formData.attachments = filesList;
    // Add message html

    // @ts-ignore
    emailEditorRef.current.editor.exportHtml((editorData) => {
      const { design, html } = editorData;
      formData.message = html;

      // Send mails
      sendMails({
        auth: user,
        mailingList: currentList,
        mailData: formData,
      });
    });
  };

  const generateTags = (listName: string) => {
    const listObj = mailingLists.find((l) => l.filename === listName);
    const data = listObj.data[0];
    delete data.key;

    return Object.keys(data).map((tag, idx) => (
      <Tag key={idx}>
        <Paragraph copyable={{ tooltips: ['Copy tag', 'Copied!'] }}>
          {`#${tag}`}
        </Paragraph>
      </Tag>
    ));
  };

  // -- Email Editor --
  const emailEditorRef = useRef(null);
  const exportHtml = () => {
    // @ts-ignore
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
    });
  };

  const onLoad = () => {
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
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
            submitButtonProps: {
              disabled: !currentList,
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
            name='email'
            label='Email'
            width='lg'
            fieldProps={{ placeholder: 'Connect to your Outlook email' }}
            initialValue={user.username || ''}
            disabled
            rules={[
              {
                required: true,
                message: 'Outlook account connection required',
              },
            ]}
          />
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
          {/* Recipients */}
          {mailingLists.length > 0 ? (
            <>
              <ProFormSelect
                name='mailingList'
                label='Mailing list'
                getValueFromEvent={(listName) => setCurrentList(listName)}
                fieldProps={{
                  placeholder: 'Mailing list',
                }}
                width='sm'
                options={mailingLists.map((list, idx) => ({
                  key: idx,
                  value: list.filename,
                  label: list.filename,
                }))}
              />

              {currentList && (
                <div style={{ marginBottom: '1rem' }}>
                  <Divider orientation='left'>Dynamic tags</Divider>
                  {generateTags(currentList)}
                </div>
              )}
            </>
          ) : (
            <Button danger onClick={() => history.push('/mailing-lists')}>
              Upload mailing list
            </Button>
          )}

          {/* Email Editor */}
          <div id='editor-container'></div>

          {/* <EmailEditor ref={emailEditorRef} onLoad={onLoad} /> */}

          <input
            type='file'
            name='filefield'
            multiple
            onChange={(e) => {
              if (e.target.files) {
                let fileAttachments: AttachmentFile[] = [];
                for (let i = 0; i < e.target.files.length; i++) {
                  const file = e.target.files[i];
                  fileAttachments.push({ name: file.name, path: file.path });
                }

                setFileList(fileAttachments);
              }
            }}
          ></input>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default Messages;
