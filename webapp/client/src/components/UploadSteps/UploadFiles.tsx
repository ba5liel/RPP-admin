import React, { useState } from 'react';
import { Divider, message, UploadProps, Checkbox } from 'antd';
import styled from 'styled-components';
import { store } from 'store';
import { addChannel, addResume } from 'store/ducks';
import { SERVER_URL } from 'config';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useDispatch } from 'react-redux';

const CheckboxGroup = Checkbox.Group;

const defaultProps: UploadProps = {
  accept: '.pdf,application/pdf',
  multiple: true,
  maxCount: 100,
  // directory: true,
  withCredentials: true,
  name: 'resume',
  beforeUpload: file => {
    const isPDF = file.type === 'pdf' || file.type === 'application/pdf';
    if (!isPDF) {
      message.error('You can only upload PDF files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('File must smaller than 2MB!');
    }
    return isPDF && isLt2M;
  },
  onChange({ file }) {
    if (file.status === 'done') {
      store.dispatch(addResume(file.response.filename));
    }
  },
  action: `${SERVER_URL}/api/upload`,
};

const UploadFilesWrapper = styled.div`
  margin-top: 100px;
  min-height: 100%;
  width: 100%;
  .ant-checkbox-wrapper {
    margin-bottom: 20px;
  }
`;
const plainOptions = ['Telegram', 'LinkedIn', 'Indeed', 'HuluJob', 'Custom'];
const defaultCheckedList = ['Telegram'];

const UploadFiles: React.FC<UploadProps> = props => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  const dispatch = useDispatch();

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    dispatch(addChannel(list.map(e => e.toString())));

  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  return (
    <UploadFilesWrapper>
     <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
      
    </UploadFilesWrapper>
  );
};

UploadFiles.defaultProps = defaultProps;

export default UploadFiles;
