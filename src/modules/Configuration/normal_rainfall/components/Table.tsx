import React from 'react'
import { Table, Form, InputNumber } from 'antd';

interface IProps {
    data : any;
    loading : boolean;
}

const NormalRainfallTable : React.FC<IProps> = ({ data, loading}) => {

    const columns = [
        {
            title: 'Month',
            dataIndex: 'month',
            key: 'month'
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render : (val, row, index) => {
                return(
                    <Form.Item
                        name={`${row.month.toLowerCase()}`}
                        rules={[{ required: true, message: 'Please input required fields!' }]}
                        initialValue={val}
                    >
                        <InputNumber 
                            style={{width : '200px'}}
                        />
                    </Form.Item>
                )
            }
        },
    ]

    return (
        <Table
            loading={loading}
            rowKey="month"
            columns={columns}
            size="small"
            dataSource={data}
            pagination={false}
        />
    )
}

export default NormalRainfallTable
