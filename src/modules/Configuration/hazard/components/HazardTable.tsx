import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Table, Switch, Form, notification} from 'antd';
import { EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import  moment from 'moment';
import { StatusFilter } from '../../../../constants';
import useTableSearch from '../../../../hooks/useTableSearch';
import useTableFilterDate from '../../../../hooks/useTableFilterDate';
import useFocus from '../../../../hooks/useFocus';
import { Switch as SwitchWrapper, ActionButton } from '../../../../components/index'
import { EditableCell, isAdding, remove_row, isEditing } from '../../selectors';
import { IHazard } from '../../../../models/HazardModel';

interface IProps {
    list : Array<IHazard>;
    loading : boolean;
    add_hazard : (data : IHazard) => void;
    update_hazard : (data : IHazard, id : string) => void;
    deactivate_hazard : (id : string) => void;
    activate_hazard : (id : string) => void;
    status : any
}

const HazardTable = React.forwardRef((props : IProps, ref) => {
    const getColumnSearch = useTableSearch();
    const getColumnFilterDate = useTableFilterDate();
    const [ form ] = Form.useForm();
    const [ data, setData ] = useState<Array<IHazard>>([]);
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
        addNewHazard : () => {
            if(editingKey === 'new'){
                return;
            }  
            //inserting the new object on top of current page
            let temp = [...data];
            temp.splice( currentPage * 10 - 10, 0, {
                is_active: true,
                hazard : "",
                risk : "",
                advisory : "", 
                id: 'new'
            })
            setData(temp);
            setEditingKey('new');
            form.resetFields();
        }
    }))

    useEffect(() => {
        const type = editingKey === 'new' ? 
            'HAZARD_ADD' : 'HAZARD_UPDATE';
        if(flag && props.status[type] ) {
            if (props.status[type].error === null) {
                notification.success({ 
                    message:  `hazard successfully 
                        ${editingKey === 'new' ? 'Added' : 'Modified'}!`
                })
            }
            setFlag(false);
        }
    }, [editingKey, props.status, flag]);

    const save = async () =>{
        try {
            setFlag(true);
            const data = (await form.validateFields()) as IHazard;
            if(editingKey === 'new'){
                props.add_hazard(data);
            }else{
                props.update_hazard(data, editingKey);
            }
            setEditingKey('');
        }catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const statusHandler  = async (status : boolean, id : string) =>{
        if(!status){
            await props.deactivate_hazard(id);
            notification.success({ 
                message:  `hazard successfully deactivated`
            })
        }else {
            await props.activate_hazard(id);
            notification.success({ 
                message:  `hazard successfully activated`
            })
        }
    }

    const edit = (record: IHazard) => {
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
            title: 'Hazard',
            dataIndex: 'hazard',
            editable: true,
            key: 'hazard',
            ...getColumnSearch(
                ['hazard'], 
                (props) => <>{(props.val)}</>
            ),
        },
        {
            title: 'Risk',
            dataIndex: 'risk',
            editable: true,
            key: 'risk',
            ...getColumnSearch(
                ['risk'], 
                (props) => <>{(props.val)}</>
            ),
        },
        {
            title: 'Advisory',
            dataIndex: 'advisory',
            editable: true,
            key: 'advisory',
            ...getColumnSearch(
                ['advisory'], 
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
          onCell: (record: IHazard) => ({
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
                <Table<IHazard> 
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

export default HazardTable;
