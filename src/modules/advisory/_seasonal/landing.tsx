import React, { useState, useRef, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Row, Button , Form, Col, Select, Input, notification } from 'antd';
import { SendOutlined, PlusOutlined, BarChartOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components/macro';

import { Container, ModalContainer, Table, LandingHeader } from '../../../components';
import { CharCount, SpanItalic } from '../Styles'
import Header from '../_10_day_weather/components/Header';
import SeasonalTable from './components/SeasonalTable';
import SeasonalDrawer from './components/SeasonalDrawer';
import { enso_forecast } from '../../../constants'
import { asyncActions as SeedAsyncActions } from '../../../ducks/SeedDucks';
import { IState } from '../../../ducks';
import { getSeedActiveStatus } from '../../../selectors/SeedSelector';
import { getAdvisoryStatus } from '../../../selectors/AdvisorySeletors';
import { asyncActions } from '../../../ducks/AdvisoryDucks';
import useGetNumberOfRecipient from '../../../hooks/useGetNumberOfRecipient';
import useGetProvince from '../../../hooks/useGetProvince';
import { getCreditCount } from '../Selector';

interface IMonthTable {
    id : string;
    month : string;
    value : string;
}

const init = {
    id : 'new',
    month : '',
    value : ''
}

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const SeasonalLanding : React.FC<IProps> = ({best_seed, fetch_seeds, add_seasonal, status, user_log}) => {
    const [ form ] = Form.useForm();
    const history = useHistory();
    const childRef:any = useRef(null);
    const [ data, setData ] = useState< Array<IMonthTable> >([init]);
    const [ editingKey, setEditingKey ] = useState('new');
    const [ smsOutput, setSmsOutput ] = useState('');
    const [ flag, setFlag ] = useState(false);
    const add_loading = (status['ADVISORIES_ADD_SEASONAL'] ? 
                status['ADVISORIES_ADD_SEASONAL'].fetching : false);
    const [visible, setVisible] = useState(false);
    const [ count ] = useGetNumberOfRecipient();
    const [ province ] = useGetProvince();

    useEffect(() => {
        fetch_seeds()
    }, [fetch_seeds])

    const memoEditingKey = useMemo(() => editingKey, [ editingKey ])

    useEffect(() => {
        if (flag && status['ADVISORIES_ADD_SEASONAL'] ) {
            if (status['ADVISORIES_ADD_SEASONAL'].error === null) {
                notification.success({ 
                    message:  `Message successfully Sent!`
                })
                history.push({
                    pathname: `/sagip/advisory/seasonal`,
                })
            }
            setFlag(false);
        }
    }, [flag, setFlag, status, history]);

    const sendMessage = async () =>{
        if(data.length === 1){
            notification.warning({
                message : 'Rainfall data missing',
                description : 'Input data on table!'
            });
            return;
        }

        try {
            const rowData = await form.validateFields();
            const payload = { 
                ...rowData,
                sms_output : smsOutput,
                forecast_date : moment().format('MM-DD-YYYY'),
                forecast_data : data,
                credit : getCreditCount(smsOutput.length, count)
            }
            if(user_log?.role !== 'LGU' && province){
                payload['province'] = province;
            }
            add_seasonal(payload);
            setTimeout(() => setFlag(true), 500);
        }catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const onValuesChange = (changedFields, allFields) =>{
        let sms_output = "";
        if(allFields.enso_forecast){;
            sms_output = `${sms_output} ENSO Forecast:${allFields.enso_forecast}/`
        }
        if(allFields.best_seed){;
            sms_output = `${sms_output} Best seed to use:${allFields.best_seed}/`
        }
        if(allFields.advisory){;
            sms_output = `${sms_output} Advisory:${allFields.advisory}`
        }
        setSmsOutput(sms_output);
    }

    return (
        <Container>
            <Header/>
            <Form
                form={form}
                onValuesChange={onValuesChange}
            >
                <Container.Card minHeight={'80vh'}>
                    <FlexDiv className="row-margin-bottom2">
                        <Container.Title2>{`Seasonal Forecast`}</Container.Title2>
                        <LandingHeader.ButtonWrapper>
                            <Button
                                type="primary" 
                                icon={<BarChartOutlined/>}
                                onClick={() => setVisible(true)}
                            >
                                View Reference
                            </Button>
                        </LandingHeader.ButtonWrapper>
                    </FlexDiv>

                    <div style={{display : 'flex', justifyContent : 'flex-end'}}>
                        <div>
                            <Container.Title3>{`Click link below to access relevant PAGASA forecast product/s`}</Container.Title3> 
                        </div>
                      
                    </div>

                    <div style={{display : 'flex', justifyContent : 'flex-end'}}>
                        <a href="http://bagong.pagasa.dost.gov.ph/climate/climate-monthly-monitoring-products" target="_blank">
                            http://bagong.pagasa.dost.gov.ph/climate/climate-monthly-monitoring-products
                        </a>
                      
                    </div>
                    
                    <div style={{display : 'flex', justifyContent : 'flex-end'}} className="row-margin-bottom2">
                        <a href="http://bagong.pagasa.dost.gov.ph/climate" target="_blank">
                            http://bagong.pagasa.dost.gov.ph/climate
                        </a>       
                    </div>

                    <Table.Header>
                        <ModalContainer.Label><i>{`Forecast Rainfall for 6 months`}</i></ModalContainer.Label>
                        <Table.ButtonWrapper>
                            <Button 
                                type="primary" 
                                size="middle"
                                icon={<PlusOutlined />}
                                onClick={() => { childRef.current.addNewMonth() }}
                            >
                                Add Month
                            </Button>
                        </Table.ButtonWrapper>
                    </Table.Header>
                    <Table>
                        <SeasonalTable 
                            ref={childRef}
                            data={data}
                            editingKey={memoEditingKey}
                            setEditingKey={setEditingKey}
                            setData={setData}
                        />
                    </Table>
                    <Row style={{marginTop : '40px'}}>
                        <Col span={5}>
                            <ModalContainer.Label>ENSO Forecast : </ModalContainer.Label>
                        </Col>
                        <Col span={7}>
                            <Form.Item
                                name="enso_forecast"
                                rules={[{ required: false, message: 'Please input required fields!' }]}
                            >
                                <Select allowClear={true}>
                                    {enso_forecast.map((item, index ) =>{
                                        return (
                                            <Select.Option value={item.text} key={index}>
                                                {item.value}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={5}>
                            <ModalContainer.Label>Best Seed to Use : </ModalContainer.Label>
                        </Col>
                        <Col span={7}>
                            <Form.Item
                                name="best_seed"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                                <Select>
                                    {best_seed && best_seed.map((item, index ) =>{
                                        return (
                                            <Select.Option value={item.seed_name} key={item.id}>
                                                {item.seed_name}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={5}>
                            <ModalContainer.Label>Farm Management Advise :  </ModalContainer.Label>
                        </Col>
                        <Col span={7}>
                            <Form.Item
                                name="advisory"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                                <Input.TextArea rows={3}/>
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row className="row-margin-top2">
                        <Col span={4}>
                            <ModalContainer.Label>SMS Output :</ModalContainer.Label>
                        </Col>
                        <Col span={12}>
                            <span style={{ wordBreak: 'break-all'}}>{smsOutput}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                           <CharCount count={smsOutput.length}>  Character count : {smsOutput.length}</CharCount>
                        </Col>
                    </Row> 
                    <Row className="row-margin-top4">
                        <SpanItalic>{`*There are ${count} recipient/s`}</SpanItalic>
                    </Row>
                    <Row className="row-margin-top row-margin-bottom2">
                        <SpanItalic>{`**This will consume ${getCreditCount(smsOutput.length, count)} credit/s`}</SpanItalic>
                    </Row>
                    <LandingHeader.ButtonWrapper>
                        <Button 
                            type="primary" 
                            size="large"
                            icon={<SendOutlined />}
                            onClick={sendMessage}
                            loading={add_loading}
                        >
                            Send Advisory
                        </Button>
                    </LandingHeader.ButtonWrapper>
                    <div style={{marginBottom : '100px'}}/>
                </Container.Card>
            </Form>
            <SeasonalDrawer
                visible={visible}
                onClose={() => setVisible((prev) => !prev)}
            />
        </Container>
    )
}


const mapStateToProps = (state: IState) => ({
    user_log : state.UserReducer.data,
    best_seed : getSeedActiveStatus(state),
    status : getAdvisoryStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_seeds: SeedAsyncActions.fetch_seeds,
            add_seasonal : asyncActions.add_seasonal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SeasonalLanding);

const FlexDiv = styled.div`
    display : flex;
    justify-content : space-between;
`