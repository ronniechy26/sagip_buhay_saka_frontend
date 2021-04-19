import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ActionButton } from '../../../../components';

import useTableFilterDate from '../../../../hooks/useTableFilterDate';
import useTableSearch from '../../../../hooks/useTableSearch';
import { IClimateData } from '../../../../models/ClimateDataModel';

interface IProps {
    data : IClimateData[];
    loading : boolean;
    read_climate_data  : (id : string) => void;
    setEdit : () => void;
}

const ClimateDataTable : React.FC<IProps> = ({ data, loading, read_climate_data, setEdit}) => {

    const getColumnFilterDate = useTableFilterDate();
    const getColumnSearch = useTableSearch();

    const columns : ColumnsType<any> = [
        {
            title: 'LGU',
            dataIndex: 'lgu_id',
            key: 'lgu_id',
            width : '20%',
            ...getColumnSearch(
                [
                    'created_by_first_name',
                    'created_by_last_name',
                ], 
                (props) => <>{(
                    `
                        ${props.record.created_by_first_name ?? ''}
                        ${props.record.created_by_last_name ?? ''}
                    `
                )}</>
            ),
        },
        {
            title: 'Weather Parameter',
            dataIndex: 'weather_parameter',
            key: 'weather_parameter',
            width : '20%',
            ...getColumnSearch(
                ['weather_parameter'], 
                (props) => <>{(props.val)}</>
            ),
        },
        {
            title: 'Data Input',
            dataIndex: 'data_input',
            key: 'data_input',
            width : '20%',
            ...getColumnSearch(
                ['data_input'], 
                (props) => <>{(props.val)}</>
            ),
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at',
            width : '20%',
            sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
            ...getColumnFilterDate('created_at'),
            render: (val : any) => <>{val ? moment(val).format('YYYY-MM-DD h:mm:ss') : '-'}</>,
        },
        {
            title: '',
            key: 'action',
            fixed: 'right',
            width: 150,
            align : 'center',
            render: (value, record) => {
                return (
                    <ActionButton>
                        <EditOutlined onClick={() => {
                           read_climate_data(record.id);
                           setEdit();
                        }}/>
                    </ActionButton>
                )
            },
          },
    ];

    return (
        <Table<any> 
            rowKey="id"
            columns={columns} 
            loading={loading}
            dataSource={data} 
        />
    )
}

export default ClimateDataTable;
