import React,  { useEffect, useState, useCallback } from 'react';
import { Drawer, Button, Form, Row , Select, Table, InputNumber, notification} from 'antd';
import { Store } from "antd/lib/form/interface";
import styled from 'styled-components/macro';
import { ModalContainer, Table as TableWrapper } from '../../../../components';
import { months } from '../../../../constants';
import { data_input, weather_parameter} from '../../../../constants/ClimateDataConstant';

import { IClimateData } from '../../../../models/ClimateDataModel';
import { IUser } from '../../../../models/UserModel';

interface IProps { 
    visible : boolean;
    onClose : () => void;
    action : 'add' | 'edit';
    add_climate_data : (data : IClimateData) => void;
    update_climate_data : (id: string, data : IClimateData) => void;
    status : any;
    data : IClimateData;
    user? : IUser;
}

const ClimateDataDrawer : React.FC<IProps> = ({
    visible, 
    onClose, 
    action, 
    add_climate_data, 
    update_climate_data, 
    status, 
    data,
    user
}) => {

    const [ form ] = Form.useForm(); 
    const [ flag, setFlag ] = useState(false);
    const [ dataSource, setDataSource] = useState<any>([]);
    const fetch_loading = (status['CLIMATEDATA_READ'] ? status['CLIMATEDATA_READ'].fetching : false);

    useEffect(() => {
        const foo = months.map((item) => {
            return{
                month : item.text,
                value : 0
            }
        })
        if(action === 'edit' ){
            if(data){
                form.setFieldsValue({
                    ...data, 
                  
                });
            }
        }
        setDataSource(foo);
    }, [action, data, form])

    const resetClose = useCallback(() => {
        form.resetFields();
        onClose();
    }, [form, onClose])

    useEffect(() => {
        const type = action === 'add' ? 
            'CLIMATEDATA_ADD' : 'CLIMATEDATA_UPDATE';
        if(flag && status[type] ) {
            if (status[type].error === null) {
                notification.success({ 
                    message:  `Climate Data successfully 
                        ${action === 'add' ? 'Added' : 'Modified'}!`
                })
                resetClose();
            }
            setFlag(false);
        }
    }, [action, status, flag, onClose, resetClose]);

    const FooterButtons = () =>{
        return (
            <FooterDiv>
                <Button 
                    loading={flag}
                    onClick={form.submit} 
                    type="primary" 
                    style={{ marginRight: 8 }}
                >
                    Save
                </Button>
                <Button  
                    loading={flag} 
                    onClick={resetClose}
                >
                    Cancel
                </Button>
            </FooterDiv>
        )
    }

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

    const onFinish = React.useCallback(( values: Store)  => {
        const payload = {
            ...values,
        }
        if(user?.role === 'LGU'){
            payload['lgu_id'] = parseInt(user.id ?? '');
        }
        if(action === 'edit'){
            update_climate_data(data.id, payload);
            setTimeout(() => setFlag(true), 800);
        }else{
            add_climate_data(payload);
            setTimeout(() => setFlag(true), 800);
        }
    }, [setFlag, action, add_climate_data,update_climate_data,data,user]);

    return (
        <StyledDrawer
            title={<TitleSpan>{`${action === 'add' ? 'Add' : 'Edit'} Climate Data`}</TitleSpan>}
            width={'30%'}
            onClose={resetClose}
            visible={visible}
            destroyOnClose={true}
            maskClosable={false}
            bodyStyle={{ paddingBottom: 80 }}
            footer={<FooterButtons/>}
        >
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Row>
                    <ModalContainer.Label>Weather Parameter</ModalContainer.Label>
                </Row>
                <Row>
                    <Form.Item
                        name="weather_parameter"
                        rules={[{ required: true, message: 'Please input required fields!' }]}
                    >
                        <Select style={{width : '250px'}}>
                            {
                                weather_parameter.map((item : string, index : any) => {
                                    return (
                                        <Select.Option value={item} key={index}> {item}</Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Row>

                <Row>
                    <ModalContainer.Label>Data Input</ModalContainer.Label>
                </Row>
                <Row>
                    <Form.Item
                        name="data_input"
                        rules={[{ required: true, message: 'Please input required fields!' }]}
                    >
                        <Select style={{width : '250px'}}>
                            {
                                data_input.map((item : string, index : any) => {
                                    return (
                                        <Select.Option value={item} key={index}> {item}</Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Row>

                <TableWrapper>
                    <Table
                        loading={fetch_loading}
                        rowKey="month"
                        columns={columns}
                        size="small"
                        dataSource={dataSource}
                        pagination={false}
                    />
                </TableWrapper>
            </Form>
        </StyledDrawer>
    )
}

export default ClimateDataDrawer

const FooterDiv = styled.div`
    text-align: left;
`
const TitleSpan = styled.span`
    font-size : 18px;
    font-weight : 700;
    color : #fff;
`
const StyledDrawer = styled(Drawer)`
    .ant-drawer-header { 
        background :rgb(0, 152, 159);
    }
    .anticon.anticon-close {
        color : #fff;
        font-size : 18px;
    }
`