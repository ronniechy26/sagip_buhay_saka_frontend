import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Table, Switch, Form, notification} from 'antd';
import { ILivelihood } from '../../../../models/LivelihoodModel';
import { EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import  moment from 'moment';
import { StatusFilter } from '../../../../constants';
import useTableSearch from '../../../../hooks/useTableSearch';
import useTableFilterDate from '../../../../hooks/useTableFilterDate';
import useFocus from '../../../../hooks/useFocus';
import { Switch as SwitchWrapper, ActionButton, Tags } from '../../../../components/index'
import { EditableCell, isAdding, remove_row, isEditing } from '../components/LivelihoodEditableCells';

interface IProps {
    list : Array<ILivelihood>;
    loading : boolean;
    add_livelihood : (data : ILivelihood) => void;
    update_livelihood : (data : ILivelihood, id : string) => void;
    deactivate_livelihood : (id : string) => void;
    activate_livelihood : (id : string) => void;
    status : any
}

const LivelihoodTable = React.forwardRef((props : IProps, ref) => {
    const getColumnSearch = useTableSearch();
    const getColumnFilterDate = useTableFilterDate();
    const [ form ] = Form.useForm();
    const [ data, setData ] = useState<Array<ILivelihood>>([]);
    const [ editingKey, setEditingKey ] = useState('');
    const { nodeRef, setFocus } = useFocus(null);
    const [ flag, setFlag ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(1);

    useEffect(() => {
        if(props.list === undefined) return;
        const newData = props.list.map((item) => {
            return {
                ...item,
                risk : item.risk ?? [],
                production_stage : item.production_stage ?? [],
                hazard : item.hazard ?? [],
                advice : item.advice ?? []
            }
        });
        setData(newData)
    }, [props.list])
   
    useEffect(() => {
        setFocus();
    }, [editingKey, setFocus])

    useImperativeHandle(ref, () => ({
        addNewLivelihood : () => {
            if(editingKey === 'new'){
                return;
            }  
            //inserting the new object on top of current page
            let temp = [...data];
            temp.splice( currentPage * 10 - 10, 0, {
                is_active: true,
                livelihood_name: "",
                // risk : [],
                production_stage : [],
                id: 'new'
            })
            setData(temp);
            setEditingKey('new');
            form.resetFields();
        }
    }))

    useEffect(() => {
        const type = editingKey === 'new' ? 
            'LIVELIHOOD_ADD' : 'LIVELIHOOD_UPDATE';
        if(flag && props.status[type] ) {
            if (props.status[type].error === null) {
                notification.success({ 
                    message:  `Livelihood successfully 
                        ${editingKey === 'new' ? 'Added' : 'Modified'}!`
                })
            }
            setFlag(false);
        }
    }, [editingKey, props.status, flag]);

    const save = async () =>{
        try {
            setFlag(true);
            const data = (await form.validateFields()) as ILivelihood;
            if(editingKey === 'new'){
                props.add_livelihood(data);
            }else{
                props.update_livelihood(data, editingKey);
            }
            setEditingKey('');
        }catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const statusHandler  = async (status : boolean, id : string) =>{
        if(!status){
            await props.deactivate_livelihood(id);
            notification.success({ 
                message:  `Livelihood successfully deactivated`
            })
        }else {
            await props.activate_livelihood(id);
            notification.success({ 
                message:  `Livelihood successfully activated`
            })
        }
    }

    const edit = (record: ILivelihood) => {
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

    const render_tags = (val, rowData) =>{
        if( isAdding(rowData) || val === null ) return <span></span>;
        
        const slice_list = val.slice(0, 2); 
        return( 
            <Tags 
                list={val}
                length={val.length}
                id={rowData.id}
                slice_list={slice_list}
            />
        );
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
            title: 'Livelihood',
            dataIndex: 'livelihood_name',
            editable: true,
            key: 'livelihood_name',
            ...getColumnSearch(
                ['livelihood_name'], 
                (props) => <>{(props.val)}</>
            ),
        },
        {
            title: 'Production Stage',
            dataIndex: 'production_stage',
            editable: true,
            key: 'production_stage',
            render: (val : any, rowData : any) => render_tags(val, rowData),
        },
        // {
        //     title: 'Hazard',
        //     dataIndex: 'hazard',
        //     editable: true,
        //     key: 'hazard',
        //     render: (val : any, rowData : any) => render_tags(val, rowData),
        // },
        // {
        //     title: 'Risk',
        //     dataIndex: 'risk',
        //     editable: true,
        //     key: 'risk',
        //     render: (val : any, rowData : any) => render_tags(val, rowData),
        // },
        // {
        //     title: 'Advice',
        //     dataIndex: 'advice',
        //     editable: true,
        //     key: 'advice',
        //     render: (val : any, rowData : any) => render_tags(val, rowData),
        // },
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
          onCell: (record: ILivelihood) => ({
            record,
            dataIndex: column.dataIndex,
            title: column.title,
            editing: isEditing(record, editingKey),
            nodeRef,
            inputType : checkInputType(column.dataIndex)
          }),
        };
    });

    const TableOnChange = (pagination, filter, sorter) =>{
        setCurrentPage(pagination.current);
    }

    return (
        <React.Fragment>
            <Form form={form} component={false}>
                <Table<ILivelihood> 
                    scroll={{ x: 1500 }}
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

export default LivelihoodTable;

const checkInputType = (dataIndex) => {
    switch(dataIndex) {
        case 'livelihood_name':
            return 2;
        case 'production_stage':
            return 0;
        case 'hazard':
            return 0;
        case 'risk':
            return 0;
        case 'advice':
            return 0;
        default:
            return -1;
    }
}