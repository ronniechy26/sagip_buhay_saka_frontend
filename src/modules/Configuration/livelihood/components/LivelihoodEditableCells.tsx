import React from 'react';
import { Input, Form, Select } from 'antd';
import styled from 'styled-components';

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    record: any;
    index: number;
    children: React.ReactNode;
    nodeRef : React.MutableRefObject<Input>;
    inputType : number;
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
            { return_input(record, inputType, nodeRef )}
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

const return_input = (record, code, nodeRef) => {
    switch (code) {
        case 0:
            return  ( <Select  mode="tags"> </Select> )
        case 1:
            return  ( <Select  mode="tags"></Select>  )
        case 2:
            return  <Input style={{width : '100%'}}  ref={nodeRef}/>
        default:
        break;
    }
}

// const CustomOption = styled(Select.Option)(
//     {
//         boxShadow: '0px 3px 6px #5D5D5D26',
//         '.ant-select-selection__choice' : {
//             backgroundColor: '#FFF9DF',
//             borderRadius: '19px',
//             fontFamily: 'Montserrat',
//             borderColor: '#F8A63B',
//             '> *' : {
//                 color: '#F8A63B'
//             }
//         },

//         '.ant-select-selection__choice__content' : {
//             marginRight: '3px'
//         }
//     }
// )