import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ActionButton } from '../../../../components';
import useTableFilterDate from '../../../../hooks/useTableFilterDate';
import { IActualRainfall } from '../../../../models/ActualRainfallModel';

interface IProps { 
    data : IActualRainfall[];
    loading : boolean;
    read_actual_rainfall  : (id : string) => void;
    setEdit : () => void;
}
const RainfallTable : React.FC<IProps>  = ({data = [], loading, read_actual_rainfall, setEdit}) => {
    const getColumnFilterDate = useTableFilterDate();

    const columns : ColumnsType<any> = [
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            width : '40%',
            sorter: {
                compare: (a, b) => a.year - b.year,
                multiple: 1,
            },
            render : (val) => val
        },
 
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at',
            width : '40%',
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
                            read_actual_rainfall(record.id);
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

export default RainfallTable
