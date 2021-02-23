import React from 'react';
import { Table } from 'antd';
import  moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import useTableSearch from '../../../hooks/useTableSearch';
import useTableFilterDate from '../../../hooks/useTableFilterDate'
import { IAdvisory } from '../../../models/AdvisoryModel';

interface IProps { 
    list : IAdvisory[];
    loading : boolean;
    type : string
}

const AdvisoryTable : React.FC<IProps> = ({list, loading, type}) => {
    const getColumnSearch = useTableSearch();
    const getColumnFilterDate = useTableFilterDate();

    const columns : ColumnsType<any> = [
        {
            title: 'Date Sent',
            dataIndex: `${type === 'other_weather_system' || type === 'tropical_cyclone' ? 'created_at' : 'forecast_date' }`,
            key: `${type === 'other_weather_system' || type === 'tropical_cyclone' ? 'created_at' : 'forecast_date' }`,
            width: '15%',
            sorter: (a, b) => moment(a.forecast_date).unix() - moment(b.forecast_date).unix(),
            ...getColumnFilterDate(`${type === 'other_weather_system' || type === 'tropical_cyclone' ? 'created_at' : 'forecast_date' }`),
            render: (val : any) => <>{val ? moment(val).format('YYYY-MM-DD') : '-'}</>,
        },
        {
            title: 'Message',
            dataIndex: 'sms_output',
            key: 'sms_output',
            width: '65%',
            ...getColumnSearch( ['sms_output'], 
                (props) => <>{props.val}</>
            ),
        },
        {
            title: 'Moderator',
            dataIndex: 'moderator',
            key: 'moderator',
            width: '20%',
            ...getColumnSearch(
                ['sent_by_first_name', 'sent_by_last_name'], 
                (props) => <>{`${props.record.sent_by_first_name} ${props.record.sent_by_last_name} `}</>
            ),
        },
    ];

    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={list}
            loading={loading}
        />
    )
}

export default AdvisoryTable
