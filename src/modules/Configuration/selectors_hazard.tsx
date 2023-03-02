import React from "react";
import { Input, Form, Select } from "antd";
import { ILivelihood } from "../../models/LivelihoodModel";

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: any;
  index: number;
  children: React.ReactNode;
  nodeRef: React.MutableRefObject<Input>;
  inputType: number;
  list_livelihood : ILivelihood[]
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
  list_livelihood,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        render_type(inputType, dataIndex, title, nodeRef, list_livelihood)
      ) : (
        children
      )}
    </td>
  );
};

const render_type = (inputType: number, dataIndex, title, nodeRef, list_livelihood) => {
  const livelihood_options = list_livelihood.map((item : ILivelihood) => {
    return {
      value: item.id,
      label: item.livelihood_name
    }
  });

  switch (inputType) {
    case 1 :
      return(
        <Form.Item
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
          <Select
            style={{
              width: 200,
            }}
            options={livelihood_options}
            />
        </Form.Item>
      )
    case 2:
      return (
        <Form.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input style={{ width: "80%" }} ref={nodeRef} />
        </Form.Item>
      );

    default:
      break;
  }
};

export const isAdding = (record) => {
  let bool = record.id === "new";
  return bool;
};

export const remove_row = (id, data) => {
  return data.filter((x) => x.id !== id);
};

export const isEditing = (record: any, key: any) => {
  return record.id === key;
};
