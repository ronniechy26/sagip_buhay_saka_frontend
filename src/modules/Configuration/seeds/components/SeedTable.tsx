import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Table, Switch, Form, notification} from 'antd';
import { ISeed } from '../../../../models/SeedModel';
import { EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import  moment from 'moment';
import { StatusFilter } from '../../../../constants';
import useTableSearch from '../../../../hooks/useTableSearch';
import useTableFilterDate from '../../../../hooks/useTableFilterDate';
import useFocus from '../../../../hooks/useFocus';
import { Switch as SwitchWrapper, ActionButton } from '../../../../components/index'
import { EditableCell, isAdding, remove_row, isEditing } from '../../selectors';

interface IProps {
    list : Array<ISeed>;
    loading : boolean;
    add_seed : (data : ISeed) => void;
    update_seed : (data : ISeed, id : string) => void;
    deactivate_seed : (id : string) => void;
    activate_seed : (id : string) => void;
    status : any
}

const SeedTable = React.forwardRef((props : IProps, ref) => {
    const getColumnSearch = useTableSearch();
    const getColumnFilterDate = useTableFilterDate();
    const [ form ] = Form.useForm();
    const [ data, setData ] = useState<Array<ISeed>>([]);
    const [ editingKey, setEditingKey ] = useState('');
    const { nodeRef, setFocus } = useFocus(null);
    const [ flag, setFlag ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(1);

    useEffect(() => {
        setData(props.list)
    }, [props.list])
   
    useEffect(() => {
        setFocus();
    }, [editingKey, setFocus])

    useImperativeHandle(ref, () => ({
        addNewSeed : () => {
            if(editingKey === 'new'){
                return;
            }  
            //inserting the new object on top of current page
            let temp = [...data];
            temp.splice( currentPage * 10 - 10, 0, {
                is_active: true,
                variety: "",
                seed_name: "",
                id: 'new'
            })
            setData(temp);
            setEditingKey('new');
            form.resetFields();
        }
    }))

    useEffect(() => {
        const type = editingKey === 'new' ? 
            'SEED_ADD' : 'SEED_UPDATE';
        if(flag && props.status[type] ) {
            if (props.status[type].error === null) {
                notification.success({ 
                    message:  `Seed successfully 
                        ${editingKey === 'new' ? 'Added' : 'Modified'}!`
                })
            }
            setFlag(false);
        }
    }, [editingKey, props.status, flag]);

    const save = async () =>{
        try {
            setFlag(true);
            const data = (await form.validateFields()) as ISeed;
            if(editingKey === 'new'){
                props.add_seed(data);
            }else{
                props.update_seed(data, editingKey);
            }
            setEditingKey('');
        }catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const statusHandler  = async (status : boolean, id : string) =>{
        if(!status){
            await props.deactivate_seed(id);
            notification.success({ 
                message:  `Seed successfully deactivated`
            })
        }else {
            await props.activate_seed(id);
            notification.success({ 
                message:  `Seed successfully activated`
            })
        }
    }

    const edit = (record: ISeed) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.id);
    };

    const cancel = () => {
        if(editingKey === 'new'){
            setData(remove_row('new', data));
        }
        setEditingKey('');
    }

    const render_action_buttons = (val, record, index) =>{
        const editable = isEditing(record, editingKey);
        if(!editable){
            return(
                <ActionButton>
                    <EditOutlined onClick={() => edit(record)}/>
                </ActionButton>
            )
        }
        return(
            <ActionButton>
                <CheckOutlined onClick={save} />
                <CloseOutlined  onClick={cancel}/>
            </ActionButton>
        )
    }

   const render_date = (val,rowData) =>{
        let adding = isAdding(rowData);
        return adding ? ( <span></span> ) : ( <>{val ? moment(val).format('YYYY-MM-DD h:mm:ss') : '-'}</>)
    }
    
    const render_edit_status = (val, record) => {
        const editing = isEditing(record, editingKey);
        const adding = isAdding(record);
        return adding || editing ? 
            ( <span></span> )
            :
            (
                <SwitchWrapper>
                    <Switch checked={val} onChange={(status) => statusHandler(status, record.id)} />
                </SwitchWrapper>             
            ) 
    }
 
    const columns : Array<any>= [
        {
            title: 'Seed',
            dataIndex: 'seed_name',
            editable: true,
            key: 'seed_name',
            ...getColumnSearch(
                ['seed_name'], 
                (props) => <>{(props.val)}</>
            ),
        },
        {
            title: 'Variety',
            dataIndex: 'variety',
            editable: true,
            key: 'variety',
            ...getColumnSearch(
                ['variety'], 
                (props) => <>{(props.val)}</>
            ),
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
            ...getColumnFilterDate('created_at'),
            render: (val : any, rowData : any) => render_date(val, rowData),
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            filters : StatusFilter,
            filterMultiple : false,
            onFilter : (value : any, record : any) => record['is_active'] === value,
            render: (val : boolean, record : any) => render_edit_status(val, record)
        },
        {
            title: '',
            key: 'action',
            fixed: 'right',
            width: 100,
            align : 'center',
            render: (val, rowData, index) => render_action_buttons(val, rowData, index)
        }
    ];

    const mergedColumns = columns.map(column => {
        if (!column.editable) {
          return column;
        }
        return {
          ...column,
          onCell: (record: ISeed) => ({
            record,
            dataIndex: column.dataIndex,
            title: column.title,
            editing: isEditing(record, editingKey),
            nodeRef
          }),
        };
    });

    
    const TableOnChange = (pagination, filter, sorter) =>{
        setCurrentPage(pagination.current);
    }

    return (
        <React.Fragment>
            <Form form={form} component={false}>
                <Table<ISeed> 
                    rowKey="id"
                    components={{
                        body: { 
                            cell: EditableCell,
                        },
                    }}
                    columns={mergedColumns} 
                    dataSource={data} 
                    loading={props.loading} 
                    onChange={TableOnChange}  
                    pagination={{ 
                        position: ['bottomRight'], 
                        defaultPageSize: 10, 
                        showSizeChanger: false, 
                        current : (currentPage)
                    }}
                />
            </Form>
        </React.Fragment> 
    )
})

export default SeedTable;
