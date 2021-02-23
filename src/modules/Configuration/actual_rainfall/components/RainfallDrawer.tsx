import React,  { useEffect, useState, useCallback } from 'react';
import { Drawer, Button, Form, Row , DatePicker, Table, InputNumber, notification} from 'antd';
import { Store } from "antd/lib/form/interface";
import styled from 'styled-components/macro';
import { ModalContainer, Table as TableWrapper } from '../../../../components';
import { months } from '../../../../constants';
import moment from 'moment';
import { IActualRainfall } from '../../../../models/ActualRainfallModel';


interface IProps { 
    visible : boolean;
    onClose : () => void;
    action : 'add' | 'edit';
    add_actual_rainfall : (data : IActualRainfall) => void;
    update_actual_rainfall : (id: string, data : IActualRainfall) => void;
    status : any;
    data : IActualRainfall;
}

const RainfallDrawer : React.FC<IProps> = ({
    visible, 
    onClose, 
    action, 
    add_actual_rainfall, 
    update_actual_rainfall, 
    status, 
    data
}) => {
    const [ form ] = Form.useForm(); 
    const [ flag, setFlag ] = useState(false);
    const [ dataSource, setDataSource] = useState<any>([]);
    const fetch_loading = (status['ACTUALRAINFALL_READ'] ? status['ACTUALRAINFALL_READ'].fetching : false);

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
                    year : moment(data.year)
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
            'ACTUALRAINFALL_ADD' : 'ACTUALRAINFALL_UPDATE';
        if(flag && status[type] ) {
            if (status[type].error === null) {
                notification.success({ 
                    message:  `Actual Rainfall successfully 
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
            year : moment(values.year).format('YYYY')
        }
        if(action === 'edit'){
            update_actual_rainfall(data.id, payload);
            setTimeout(() => setFlag(true), 500);
        }else{
            add_actual_rainfall(payload);
            setTimeout(() => setFlag(true), 500);
        }
    }, [setFlag, action, add_actual_rainfall,update_actual_rainfall,data]);

    return (
        <StyledDrawer
            title={<TitleSpan>{`${action === 'add' ? 'Add' : 'Edit'} Actual Rainfall`}</TitleSpan>}
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
                    <ModalContainer.Label>Year</ModalContainer.Label>
                </Row>
                <Row>
                    <Form.Item
                        name="year"
                        rules={[{ required: true, message: 'Please input required fields!' }]}
                    >
                        <DatePicker 
                            picker="year"
                            style={{width : '300px'}}
                         />
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

export default RainfallDrawer

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