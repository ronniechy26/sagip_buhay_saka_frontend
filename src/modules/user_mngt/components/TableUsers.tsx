import React from 'react'
import { Table, Switch, notification} from 'antd';
import { EditOutlined, CreditCardOutlined, UserSwitchOutlined  } from '@ant-design/icons';
import  moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { IUser } from '../../../models/UserModel';
import {render_table_name} from '../../../selectors/UserSelector';
import { Switch as SwitchWrapper, ActionButton } from '../../../components'
import useTableSearch from '../../../hooks/useTableSearch';
import useTableFilterDate from '../../../hooks/useTableFilterDate';
import { UserRoles, StatusFilter } from '../../../constants';
import { IAction } from '../pages/landing';

type IProps = {
    list : IUser[];
    loading: boolean;
    deactivate_user : (id: string) => void;
    activate_user : (id: string) => void;
    fetch_users : (params : any) => void;
    setAction : React.Dispatch<React.SetStateAction<IAction>>;
    setVisible : React.Dispatch<React.SetStateAction<boolean>>;
    setVisibleCredit : React.Dispatch<React.SetStateAction<boolean>>;
    setChangePasswordVisible : React.Dispatch<React.SetStateAction<boolean>>;
    fetch_user : (id : string) => void;
};

const TableUsers : React.FC<IProps> = ({ 
    deactivate_user, 
    activate_user, 
    fetch_users, 
    setAction,
    setVisible,
    fetch_user,
    setVisibleCredit,
    setChangePasswordVisible,
    list, 
    loading, 
    ...props
}) => {
    const getColumnSearch = useTableSearch();
    const getColumnFilterDate = useTableFilterDate();

    const statusHandler  = async (status : boolean, id : string) =>{
        if(!status){
            await deactivate_user(id);
            notification.success({ 
                message:  `User Account successfully deactivated`
            })
        }else {
            await activate_user(id);
            notification.success({ 
                message:  `User Account successfully activated`
            })
        }
        await fetch_users({});
    }

    const onEdit = async (id : string) =>{
        await fetch_user(id);
        setAction('edit');
        setVisible(true);
    }

    const onEditCredit = async (id : string) =>{
        await fetch_user(id);
        setVisibleCredit(true);
    }

    const onChangePassword = async (id : string) => {
        await fetch_user(id);
        setChangePasswordVisible(true);
    }

    const columns : ColumnsType<IUser> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearch(
                ['first_name', 'middle_name', 'last_name'], 
                (props) => <>{render_table_name(props.record)}</>
            ),
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            ...getColumnSearch(['username'], (props) => <>{props.val}</>),
        },
        {
            title: 'Credit',
            dataIndex: 'credit_count',
            key: 'credit_count',
            render: (val : any) => <>{val}</>,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            filters : UserRoles,
            onFilter : (value : any, record : any) => record['role'].toLowerCase() === value.toLowerCase(),
            render: (val : any) => <>{val}</>,
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at',
            ...getColumnFilterDate('created_at'),
            render: (val : any) => <>{val ? moment(val).format('YYYY-MM-DD h:mm:ss') : '-'}</>,
        },
        {
            title: 'Modified',
            dataIndex: 'updated_at',
            key: 'updated_at',
            ...getColumnFilterDate('updated_at'),
            render: (val : any) => <>{val ? moment(val).format('YYYY-MM-DD h:mm:ss'): '-'}</>,
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            filters : StatusFilter,
            filterMultiple : false,
            onFilter : (value : any, record : any) => record['is_active'] === value,
            render: (val : boolean, record : any) => {
                return (
                    <SwitchWrapper>
                        <Switch checked={val} onChange={(status) => statusHandler(status, record.id)}/>
                    </SwitchWrapper>
                )
            }
        },
        {
            title: '',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (value : any, record : any) => {
                return (
                    <ActionButton>
                        <UserSwitchOutlined onClick={() => onChangePassword(record.id)}/>
                        <CreditCardOutlined onClick={() => onEditCredit(record.id)} />
                        <EditOutlined onClick={() => onEdit(record.id)}/>
                    </ActionButton>
                )
            },
          },
    ];

    return (
            <Table<IUser> 
                rowKey="id"
                columns={columns} 
                dataSource={list} 
                loading={loading} 
            />
        )
}

export default TableUsers;
