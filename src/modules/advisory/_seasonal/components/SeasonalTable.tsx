import React, {useState, useEffect, useImperativeHandle} from 'react';
import { Table, Form, notification } from 'antd';
import { EditOutlined, CloseOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { ActionButton } from '../../../../components/index';
import { EditableCell, isAdding, remove_row, isEditing } from './Selector';
import useFocus from '../../../../hooks/useFocus';

interface IMonthTable {
    id : string;
    month : string;
    value : string;
}
interface IProps {
    data : Array<IMonthTable>;
    editingKey : string;
    setData : React.Dispatch<React.SetStateAction<IMonthTable[]>>;
    setEditingKey : React.Dispatch<React.SetStateAction<string>>
}
const init = {
    id : 'new',
    month : '',
    value : ''
}

const SeasonalTable  = React.forwardRef((props : IProps, ref)  => {
    const { nodeRef, setFocus } = useFocus(null);
    const [ form ] = Form.useForm();

    useImperativeHandle(ref, () => ({
        addNewMonth : () => {
            if(props.data.length === 6){
                return notification.warning({
                    message : 'Table must be less than or equal to 6 rows!'
                })
            }  
            if(props.editingKey === 'new') return;
            const newData = [...props.data, init]
            props.setData(newData);
            props.setEditingKey('new')
            form.resetFields();
        }
    }))

    const save = async (record) =>{
        try {
            const item = (await form.validateFields()) as IMonthTable;
            if(props.editingKey === 'new'){
                let id = props.data.length === 1 ?  1 : props.data[props.data.length - 2].id + 1;
                const added_vals = props.data.map(element => {
                    if(element.id === 'new'){
                        return {...item , id}
                    }
                    return element;
                })
                props.setData(added_vals as IMonthTable[]);
                props.setEditingKey('');
            }else{
                const added_vals = props.data.map(element => {
                    if(element.id === record.id){
                        return {...item, id : element.id}
                    }
                    return element;
                })
                props.setData(added_vals);
                props.setEditingKey('');
            }
           
        }catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const edit = (record: IMonthTable) => {
        form.setFieldsValue({ ...record });
        props.setEditingKey(record.id);
    }

    const cancel = () => {
        if(props.data.length === 1) return;
        if(props.editingKey === 'new'){
            props.setData(remove_row('new', props.data));
        }
        props.setEditingKey('');
    }

    const deleteItem = (record : IMonthTable) =>{
        if(props.data.length === 1) return;
        props.setData(remove_row(record.id, props.data))
    }

    const render_action_buttons = (val, record, index) =>{
        const editable = isEditing(record, props.editingKey);
        if(!editable){
            return(
                <ActionButton>
                    <EditOutlined onClick={() => edit(record)}/>
                    <DeleteOutlined onClick={() =>deleteItem(record)} />
                </ActionButton>
            )
        }
        return(
            <ActionButton>
                <CheckOutlined  onClick={() =>save(record)}/>
                <CloseOutlined  onClick={cancel}/>
            </ActionButton>
        )
    }

    const columns : Array<any> = [
        {
            title: 'Month',
            dataIndex: 'month',
            editable: true,
            key: 'month', 
            width : '46%'
        },
        {
            title: 'Value',
            dataIndex: 'value',
            editable: true,
            key: 'value',
            width : '46%'
        },
        {
            title: '',
            key: 'action',
            fixed: 'right',
            width: 100,
            align : 'center',
            render: (val, rowData, index) => render_action_buttons(val, rowData, index)
        }
    ]

    const mergedColumns = columns.map(column => {
        if (!column.editable) {
          return column;
        }
        return {
          ...column,
          onCell: (record: IMonthTable) => ({
            record,
            dataIndex: column.dataIndex,
            inputType: checkInputType(column.dataIndex),
            title: column.title,
            editing: isEditing(record, props.editingKey),
            selectedMonth : props.data.map(x => x.month),
            nodeRef
          }),
        };
    });

    return (
        <>
            <Form form={form} component={false}>
                <Table
                    rowKey="id"
                    components={{
                        body: { 
                            cell: EditableCell,
                        },
                    }}
                    columns={mergedColumns} 
                    dataSource={props.data}
                    pagination={false}
                />
            </Form>
        </>
    )
});

export default SeasonalTable


const checkInputType = (dataIndex) => {
    switch(dataIndex) {
        case 'month':
            return 0;
        case 'value':
            return 1;
        default:
            return -1;
    }
}