import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Button, DatePicker, Form, notification, Modal, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components/macro';
import moment from 'moment';
import { Container, Table } from '../../../../components';
import { months } from '../../../../constants';
import NormalRainfallTable from '../components/Table';

import { IState } from '../../../../ducks';
import { asyncActions } from '../../../../ducks/NormalRainfallDucks';
import { INormalRainfall } from '../../../../models/NormalRainfallModel';
import { getNormalRainfallStatus } from '../../../../selectors/NormalRainfallSelector';

const { confirm } = Modal;

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const NormalRainfallLanding : React.FC<IProps> = ({read_normal_rainfall, update_normal_rainfall, data, status}) => {
    const fetch_loading = (status['NORMALRAINFALL_READ'] ? status['NORMALRAINFALL_READ'].fetching : false);
    const update_loading = (status['NORMALRAINFALL_UPDATE'] ? status['NORMALRAINFALL_UPDATE'].fetching : false);
    const [ form ] = Form.useForm();
    const [ dataSource, setDataSource] = useState<any>([]);
    const [ flag, setFlag ] = useState(false);

    useEffect(() => {
        read_normal_rainfall();
    }, [read_normal_rainfall])

    useEffect(() => {
        const foo = months.map((item) => {
            return{
                month : item.text,
                value : 0
            }
        })
        setDataSource(foo);
        if(data){
            form.setFieldsValue({
                ...data,
                start_year : moment(data.start_year),
                end_year : moment(data.end_year),
            });
        }
    }, [form, data])

    useEffect(() => {
        if(flag && status['NORMALRAINFALL_UPDATE'] ) {
            if (status['NORMALRAINFALL_UPDATE'].error === null) {
                notification.success({ 
                    message:  `Normal Rainfall Data successfully Modified!`
                })
            }
            setFlag(false);
        }
    }, [status, flag]);

    const onSave = async () =>{
        try {
            const data = await form.validateFields();
            if(data.start_year > data.end_year){
                notification.error({
                    message : 'Date Error',
                    description : 'End year must be greater than start year!'
                });  return;
            }
            confirm({
                title: `Update Normal Rainfall`, 
                content: `Are you sure you want to update Normal Rainfall Data ?`,
                okText:'Yes',
                cancelText:'No',
                onOk : async () => {
                    setFlag(true);
                    update_normal_rainfall(data as INormalRainfall);
                },
                onCancel() { }
            })
        }catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    return (
        <Fragment>
            <Container>
                <Container.Card>
                    <Form
                        form={form}
                    >
                        <Container.Header>
                            <Container.Title>Configuration - Normal Rainfall Data</Container.Title>
                        </Container.Header>
                        <Table.Header>
                            <Spin spinning={update_loading}>
                                <StyledDiv>
                                    <Form.Item
                                        style={{marginRight : '20px'}}
                                        label={<StyledLabel>Start Year</StyledLabel>}
                                        name="start_year"
                                        rules={[{ required: true, message: 'Please input required fields!' }]}
                                    >
                                        <DatePicker picker="year" style={{width : '250px'}} />
                                    </Form.Item>
                                    <Form.Item
                                        label={<StyledLabel>End Year</StyledLabel>}
                                        name="end_year"
                                        rules={[{ required: true, message: 'Please input required fields!' }]}
                                    >
                                        <DatePicker picker="year" style={{width : '250px'}} />
                                    </Form.Item>
                                </StyledDiv>
                            </Spin>
                            
                            <Table.ButtonWrapper>
                                <Button 
                                    type="primary" 
                                    size="middle"
                                    icon={<PlusOutlined />}
                                    onClick={onSave}
                                >
                                    {'Save'}
                                </Button>
                            </Table.ButtonWrapper>
                        </Table.Header>
                        <Table>
                            <NormalRainfallTable
                                data={dataSource}
                                loading={fetch_loading || update_loading}
                            />
                        </Table>
                    </Form>
                </Container.Card>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    data : state.NormalRainfallReducer.data,
    status : getNormalRainfallStatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            read_normal_rainfall : asyncActions.read_normal_rainfall,
            update_normal_rainfall : asyncActions.update_normal_rainfall
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(NormalRainfallLanding);

const StyledDiv = styled.div`
    margin-top : 20px;
    display : flex;
    justify-content : center;
    align-items : center;
`
const StyledLabel = styled.span`
    color: gray;
    font-size: 16px;
    font-family: 'Montserrat';
    font-weight : 500;
`