import React, { FC, useCallback } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

// Styles
import './MailingList.less';

// Components
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { DraggerProps } from 'antd/lib/upload';

const { Dragger } = Upload;

const draggerProps: DraggerProps = {
  name: 'mailing-list',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      console.log(info.file);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  showUploadList: false,
  multiple: false,
  accept: '.csv',
  fileList: [],
};

const MailingLists: FC = () => {
  return (
    <PageContainer title='Mailing Lists'>
      <Card>
        {/* Ant-D dragger */}
        <div className='dragger-container'>
          <Dragger {...draggerProps}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>
              Click or drag .csv file to this area.
            </p>
          </Dragger>
        </div>

        <div>
          <h2>Mailing list load existing mailing lists</h2>
        </div>
      </Card>
    </PageContainer>
  );
};

export default MailingLists;
