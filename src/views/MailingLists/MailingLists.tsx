import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

// Styles
import './MailingList.less';

// Components
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';

const { Dragger } = Upload;

const uploadProps = {
  name: 'mailing-list',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const MailingLists: FC = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <PageContainer title='Mailing Lists'>
      <Card>
        {/* Dropzone */}
        <div {...getRootProps()} className='dropzone-container'>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>

        {/* Ant-D dragger */}
        <div className='dragger-container'>
          <Dragger {...uploadProps} accept={'.png'} multiple={false}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>
              Click or drag file to this area to upload mailing list
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
