import React from 'react';
import { Table, Tag } from 'antd';
import  moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import styled from 'styled-components/macro';
import { IFeedback } from '../../../models/FeedbackModel';

import useTableSearch from '../../../hooks/useTableSearch';
import useTableFilterDate from '../../../hooks/useTableFilterDate';

interface IProps {
    list : Array<IFeedback>;
    loading : boolean;
}

const FeedbackTable : React.FC<IProps> = ({list, loading}) => {
    const getColumnSearch = useTableSearch();
    const getColumnFilterDate = useTableFilterDate();

    const columns : ColumnsType<IFeedback> = [
        {
            title: 'Date Received',
            dataIndex: 'date_received',
            key: 'date_received',
            sorter: (a, b) => moment(a.date_received).unix() - moment(b.date_received).unix(),
            ...getColumnFilterDate('date_received'),
            render: (val : any) => <>{val ? moment(val).format('YYYY-MM-DD h:mm:ss') : '-'}</>,
        },
        {
            title: 'Feedback',
            dataIndex: 'feedback',
            key: 'feedback',
            ...getColumnSearch(
                ['feedback'], 
                (props) => <>{(props.val)}</>
            ),
        },
        {
            title: 'Type of Feedback',
            dataIndex: 'type_of_feedback',
            key: 'type_of_feedback',
            ...getColumnSearch(
                ['type_of_feedback'], 
                (props) => <>{(<CustomTag>{props.val}</CustomTag>)}</>
            ),
        },
        {
            title: 'Region',
            dataIndex: 'province',
            key: 'province',
            ...getColumnSearch(
                ['province'], 
                (props) => <>{(props.val)}</>
            ),
        },
        {
            title: 'Province',
            dataIndex: 'municipality',
            key: 'municipality',
            ...getColumnSearch(
                ['municipality'], 
                (props) => <>{(props.val)}</>
            ),
        },
    ];


    return (
        <Table<IFeedback>
            rowKey="id"
            columns={columns} 
            dataSource={list} 
            loading={loading} 
        />
    )
}

export default FeedbackTable

const CustomTag = styled(Tag)`
    color: white;
    background-color: ${`#${Math.floor(Math.random()*16777215).toString(16)}`};
    border-radius: 10px;
    width: auto;
    height: 25px;
    display: inherit;
    text-align: center;
    padding-top: 3%;
`