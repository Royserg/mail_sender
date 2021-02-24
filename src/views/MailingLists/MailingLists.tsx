import React, { FC, useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { readString } from 'react-papaparse';
import { DeleteOutlined } from '@ant-design/icons';

// Styles
import './MailingList.less';
// Redux
import { useStoreActions, useStoreState } from 'store';

// Components
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Upload,
  message,
  List,
  Table,
  Button,
  Popover,
  Input,
} from 'antd';
import { StatusKind } from 'types/mailingList';

const { Dragger } = Upload;

const MailingLists: FC = () => {
  const { saveList, removeList, setStatus } = useStoreActions(
    ({ mailingList }) => mailingList
  );
  const { uploadStatus, deleteStatus, mailingLists } = useStoreState(
    ({ mailingList }) => mailingList
  );

  const [uploaded, setUploaded] = useState<boolean>(false);
  const [items, setItems] = useState<any>([]); // CSV files can vary in attributes -> any

  // Filename, popover
  const [filename, setFilename] = useState<string>('');
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);

  // Effects - clear upload window
  useEffect(() => {
    if (uploadStatus === 'Success') {
      message.success('File saved!');
      handleDeleteUpload();
      setStatus({ statusKind: StatusKind.uploadStatus, status: undefined });
    }
  }, [uploadStatus, setStatus]);

  // Handlers
  const handleDeleteUpload = () => {
    setUploaded(false);
    setItems([]);
  };

  const handleFileSave = async (data: any[]) => {
    if (filename.length > 0) {
      setPopoverVisible(false);
      await saveList({ filename, data });
    }
  };

  const uploadedFileTableView = () => {
    const columns = items[0].map((header: string) => {
      header = header.split(' ').join('-').toLocaleLowerCase();

      return {
        title: header,
        dataIndex: header,
        key: header,
      };
    });

    let data: any[] = [];
    for (let i = 1; i < items.length; i++) {
      let dataObj: any = {
        key: i,
      };

      for (let j = 0; j < items[j].length; j++) {
        dataObj[columns[j].key] = items[i][j];
      }
      data.push(dataObj);
    }

    return (
      <>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 0, y: 300 }}
          pagination={false}
        />
        <div className='table-action-buttons-container'>
          <Button
            type='text'
            danger
            icon={<DeleteOutlined />}
            onClick={handleDeleteUpload}
          />
          <Popover
            content={
              <>
                <Input
                  size='small'
                  placeholder='Provide filename'
                  onChange={(e) => setFilename(e.target.value)}
                  style={{ marginBottom: '1rem' }}
                  autoFocus
                />
                <Button type='primary' onClick={() => handleFileSave(data)}>
                  Confirm
                </Button>
              </>
            }
            placement='bottomRight'
            title='Filename'
            trigger='click'
            visible={popoverVisible}
            onVisibleChange={(visible) => setPopoverVisible(visible)}
          >
            <Button
              type='primary'
              loading={uploadStatus === 'Loading'}
              disabled={uploadStatus === 'Loading'}
            >
              Save
            </Button>
          </Popover>
        </div>
      </>
    );
  };

  return (
    <PageContainer title='Mailing Lists'>
      <Card>
        {uploaded ? (
          uploadedFileTableView()
        ) : (
          <div className='dragger-container'>
            {/* Ant-D dragger */}
            <Dragger
              name='mailing-list'
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
              onChange={async (info) => {
                const { status } = info.file;
                if (status !== 'uploading') {
                  // Do something while file is uploading
                }
                if (status === 'done') {
                  message.success(
                    `${info.file.name} file uploaded successfully.`
                  );

                  const csvString = (await info.file.originFileObj?.text()) as string;
                  const parsedCsv = readString(csvString);
                  setItems(parsedCsv.data);
                  setUploaded(true);
                } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
              showUploadList={true}
              multiple={false}
              accept={'.csv'}
              fileList={[]}
            >
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>
                Click or drag .csv file to this area.
              </p>
            </Dragger>
          </div>
        )}

        <div>
          <h2>Lists</h2>

          <List
            dataSource={mailingLists}
            bordered
            locale={{ emptyText: 'Mailing list empty' }}
            renderItem={(list, idx) => (
              <List.Item key={idx}>
                <List.Item.Meta title={list.filename || 'filename'} />
                <Button
                  type='text'
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeList({ filename: list.filename })}
                  loading={deleteStatus === 'Loading'}
                >
                  Remove
                </Button>
              </List.Item>
            )}
          />
        </div>
      </Card>
    </PageContainer>
  );
};

export default MailingLists;
