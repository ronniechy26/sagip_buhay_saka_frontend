import React from 'react';
import { Input, InputNumber, Form, Select } from 'antd';
import { months } from '../../../../constants'

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    record: any;
    index: number;
    children: React.ReactNode;
    nodeRef : React.MutableRefObject<Input>;
    inputType : number;
    selectedMonth : Array<string>
}

export const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    nodeRef,
    inputType,
    selectedMonth,
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
            { return_input(inputType, nodeRef, selectedMonth)}
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

const return_input = (code, nodeRef, selectedMonth) => {
  switch (code) {
    case 0:
      return  (<Select ref={nodeRef}>
                  {months.filter(x => !selectedMonth.includes(x.text)).map((item) => {
                      return (<Select.Option key={item.value} value={item.text}>{item.text}</Select.Option>)
                  })}
              </Select> )
    case 1:
        return  <InputNumber style={{width : '100%'}}  ref={nodeRef}/>
    default:
      break;
  }
}

