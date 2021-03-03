import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Button, DatePicker, Form, notification, Modal, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components/macro';
import moment from 'moment';
import { Container, Table } from '../../../../components';
import { months } from '../../../../constants';
import NormalRainfallTable from '../../normal_rainfall/components/Table';

import { IState } from '../../../../ducks';
import { asyncActions } from '../../../../ducks/ElNinoRainfallDucks';
import { IElNinoRainfall } from '../../../../models/ElNinoRainfallModel';
import { getElNinoRainfallStatus } from '../../../../selectors/ElNinoRainfallSelector';

const { confirm } = Modal;

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const El_nino_rainfall : React.FC<IProps> = ({
    data, 
    status,
    read_el_nino_rainfall,
    update_el_nino_rainfall
}) => {

    const fetch_loading = (status['ELNINO_RAINFALL_READ'] ? status['ELNINO_RAINFALL_READ'].fetching : false);
    const update_loading = (status['ELNINO_RAINFALL_UPDATE'] ? status['ELNINO_RAINFALL_UPDATE'].fetching : false);
    const [ form ] = Form.useForm();
    const [ dataSource, setDataSource] = useState<any>([]);
    const [ flag, setFlag ] = useState(false);

    useEffect(() => {
        read_el_nino_rainfall();
    }, [read_el_nino_rainfall]);

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
    }, [form, data]);

    useEffect(() => {
        if(flag && status['ELNINO_RAINFALL_UPDATE'] ) {
            if (status['ELNINO_RAINFALL_UPDATE'].error === null) {
                notification.success({ 
                    message:  `La Niña Rainfall Data successfully Modified!`
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
                title: `Update El Niño Rainfall`, 
                content: `Are you sure you want to update El Niño Rainfall Data ?`,
                okText:'Yes',
                cancelText:'No',
                onOk : async () => {
                    setFlag(true);
                    update_el_nino_rainfall(data as IElNinoRainfall);
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
                            <Container.Title>Configuration - El Niño Rainfall Data</Container.Title>
                        </Container.Header>
                        <Table.Header>
                            <Spin spinning={fetch_loading || update_loading}>
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
    data : state.ElNinoRainfallReducer.data,
    status : getElNinoRainfallStatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            read_el_nino_rainfall : asyncActions.read_el_nino_rainfall,
            update_el_nino_rainfall : asyncActions.update_el_nino_rainfall
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(El_nino_rainfall);

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