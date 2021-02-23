import React from 'react';
import { Input, Form } from 'antd';

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    record: any;
    index: number;
    children: React.ReactNode;
    nodeRef : React.MutableRefObject<Input>
}

export const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    nodeRef,
    ...restProps
  }) => {
  
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Input style={{width : '80%'}} ref={nodeRef}/>
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
};

export const isAdding = (record) => {
    let bool = record.id === 'new';
    return bool;
}

export const remove_row = (id, data) => {
  return data.filter(x => x.id !== id);
}

export const isEditing = (record: any, key : any) => {
  return record.id === key;
};