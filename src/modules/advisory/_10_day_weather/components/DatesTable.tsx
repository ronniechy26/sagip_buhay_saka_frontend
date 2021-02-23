import React from 'react';
import { Table, Input , Select, Form } from 'antd';
import { ColumnsType } from 'antd/lib/table'
import { IDates } from '../landing';
import { RainFall } from '../../../../constants'
import { FormInstance } from 'antd/lib/form';

interface IProps {
    data : Array<IDates>;
    onChange : (value, index, column) => void;
    form : FormInstance<any>;
}

const DatesTable : React.FC<IProps> = ({data, onChange}) => {
    
    const columns : ColumnsType<IDates> = [
        {
            title: 'Day',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            render : (val : any) =>  `Day ${val}`
        },
        {
            title: 'Dates',
            dataIndex: 'date',
            key: 'date',
            width: '10%',
            render : (val : any) =>  val
        
        },
        {
            title: 'Rain Fall',
            dataIndex: 'rainfall',
            key: 'rainfall',
            width: '15%',
            render : (val : any, rowData : any, index : any) =>  {
                return (
                    <Form.Item
                        name={`dates[${index}].rainfall`}
                        rules={[{ required: true, message: 'Please input required fields!' }]}
                    >
                        <Select 
                            value={val} 
                            onChange={(value) => onChange(value, index, 'rainfall')} 
                            style={{width : '200px'}}
                        >
                            {
                                RainFall.map((item) =>{
                                    return(
                                        <Select.Option value={item.text} key={item.id}>
                                            {item.text}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                )
            }
        },
        {
            title: 'Minimum Temperature',
            dataIndex: 'min_temp',
            key: 'min_temp',
            width: '15%',
            render : (val : any, rowData : any, index : any) =>  {
                return (
                    <Form.Item
                        name={`dates[${index}].min_temp`}
                        rules={[{ required: true, message: 'Please input required fields!' }]}
                    >
                        <Input value={val} onChange={(e) => onChange(e.target.value, index, 'min_temp')} />
                    </Form.Item>
                )
            }
        },
        {
            title: 'Maximum Temperature',
            dataIndex: 'max_temp',
            key: 'max_temp',
            width: '15%',
            render : (val : any, rowData : any, index : any) =>  {
                return ( 
                    <Form.Item
                        name={`dates[${index}].max_temp`}
                        rules={[{ required: true, message: 'Please input required fields!' }]}
                    >
                        <Input value={val} onChange={(e) => onChange(e.target.value, index, 'max_temp')} />
                    </Form.Item>
                )
            }
        },
        {
            title: 'Mean Temperature',
            dataIndex: 'mean_temp',
            key: 'mean_temp',
            width: '15%',
            render : (val : any, rowData : any, index : any) =>  {
                return (
                    <Form.Item
                        name={`dates[${index}].mean_temp`}
                        rules={[{ required: true, message: 'Please input required fields!' }]}
                    >
                        <Input value={val} onChange={(e) => onChange(e.target.value, index, 'mean_temp')} />
                    </Form.Item>
                )
            }
        },
       
    ];

    return (
        <Table<IDates>
            size="small"
            rowKey="id"
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    )
}

export default DatesTable
