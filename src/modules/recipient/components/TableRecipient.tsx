import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Table, Switch, notification, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { IRecipient } from '../../../models/RecipientModel';
import { ActionButton, BadgeWrapper, Switch as SwitchWrapper } from '../../../components';
import useTableSearch from '../../../hooks/useTableSearch';
import useTableFilterDate from '../../../hooks/useTableFilterDate';
import { render_table_name } from '../../../selectors/UserSelector';
import { StatusFilter, SubscriberFilter } from '../../../constants';
import useLocalStorage from '../../../hooks/useLocalStorage';
import ModalViewRecipient from './ModalViewRecipient';

const { confirm } = Modal;

type IProps = {
    list: IRecipient[];
    loading: boolean;
    read_recipient: (id: string) => void;
    data: IRecipient;
    status: any;
    deactivate_recipient: (id: string) => void;
    activate_recipient: (id: string) => void;
    delete_recipient: (id: string) => void;
};

const TableRecipient: React.FC<IProps> = ({
    list,
    loading,
    read_recipient,
    activate_recipient,
    deactivate_recipient,
    delete_recipient,
    data,
    status
}) => {
    const getColumnSearch = useTableSearch();
    const getColumnFilterDate = useTableFilterDate();
    const history = useHistory();
    const [currentPage, setCurrentPage] = useLocalStorage('recipientCP', 1);
    const [showModal, setShowModal] = useState(false)
    const [flag, setFlag] = useState(false);

    const TableOnChange = (pagination, filter, sorter) => {
        setCurrentPage(pagination.current);
        localStorage.setItem('recipientCP', pagination.current);
    }

    const render_view_recipient = (visible: boolean) => {
        return (
            visible ?
                <ModalViewRecipient
                    showModal={showModal}
                    setShowModal={setShowModal}
                    data={data}
                    status={status}
                />
                : null
        )
    }

    const statusHandler = async (status: boolean, id: string) => {
        if (!status) {
            await deactivate_recipient(id);
            notification.success({
                message: `Recipient successfully deactivated`
            })
        } else {
            await activate_recipient(id);
            notification.success({
                message: `Recipient successfully activated`
            })
        }
    }

    useEffect(() => {
        if (flag && status['RECIPIENT_DELETE']) {
            if (status['RECIPIENT_DELETE'].error === null) {
                notification.success({
                    message: `Recipient successfully deleted!`
                });
            }
            setFlag(false);
        }
    }, [flag, setFlag, status]);

    const onDelete = React.useCallback((id: string) => {
        setFlag(true);
        delete_recipient(id)
    }, [setFlag, delete_recipient]);


    const showConfirm = (data: IRecipient) => {
        if (data.is_active === true) {
            notification.error({
                message: `Error on deleting receipient!`,
                description: 'Please deactivate receipient before deleting!'
            });
            return;
        }
        confirm({
            title: 'Do you want to delete these receipient?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                onDelete(data.id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    const columns: ColumnsType<IRecipient> = [
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
            title: 'Subscriber',
            dataIndex: 'is_subscribe',
            key: 'is_subscribe',
            filters: SubscriberFilter,
            filterMultiple: false,
            onFilter: (value: any, record: any) => record['is_subscribe'] === value,
            render: (val) => BadgeWrapper.render_badge({ value: val, textIfTrue: 'Subscriber', textIffalse: 'Not Subscriber' })
        },
        {
            title: 'Mobile Number',
            dataIndex: 'contact_number',
            key: 'contact_number',
            ...getColumnSearch(['contact_number'],
                (props) => <>+63{props.val}</>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            filters: StatusFilter,
            filterMultiple: false,
            onFilter: (value: any, record: any) => record['is_active'] === value,
            render: (val: boolean, record: any) => {
                return (
                    <SwitchWrapper>
                        <Switch checked={val} onChange={(status) => statusHandler(status, record.id)} />
                    </SwitchWrapper>
                )
            }
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at',
            ...getColumnFilterDate('created_at'),
            render: (val: any) => <>{val ? moment(val).format('YYYY-MM-DD h:mm:ss') : '-'}</>,
        },
        {
            title: '',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (value, record) => {
                return (
                    <ActionButton>
                        <DeleteOutlined onClick={() => showConfirm(record)} />
                        <EditOutlined onClick={() => {
                            history.push({
                                pathname: `/sagip/recipient/edit/${record.id}`,
                            })
                        }} />
                    </ActionButton>
                )
            },
        },
    ];

    return (
        <React.Fragment>
            <Table<IRecipient>
                rowKey="id"
                columns={columns}
                dataSource={list}
                loading={loading}
                onChange={TableOnChange}
                onRow={(record, rowIndex) => {
                    return {
                        onDoubleClick: event => {
                            read_recipient(record.id)
                            setShowModal(true);
                        },
                    };
                }}
                pagination={{
                    position: ['bottomRight'],
                    defaultPageSize: 10,
                    showSizeChanger: false,
                    current: parseInt(currentPage)
                }}
            />
            {
                render_view_recipient(showModal)
            }
        </React.Fragment>
    )
}

export default TableRecipient
