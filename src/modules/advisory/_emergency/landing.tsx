import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Row, Button , DatePicker, Form, Col, Input, notification} from 'antd';
import { SendOutlined, BarChartOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Container, ModalContainer, LandingHeader} from '../../../components';
import {CharCount, SpanItalic } from '../Styles'
import Header from '../_10_day_weather/components/Header';
import EmergencyDrawer from './components/EmergencyDrawer';

import { IState } from '../../../ducks';
import { asyncActions } from '../../../ducks/AdvisoryDucks';
import { getAdvisoryStatus } from '../../../selectors/AdvisorySeletors';
import useGetNumberOfRecipient from '../../../hooks/useGetNumberOfRecipient';

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const EmergencyLanding : React.FC<IProps> = ({add_emergency, advisory_status, user_log }) => {
    const [visible, setVisible] = useState(false);
    const history = useHistory();
    const [ form ] = Form.useForm();
    const [ smsOutput, setSmsIutput ] = useState('');
    const [ flag, setFlag ] = useState(false);
    const add_loading = (advisory_status['ADVISORIES_ADD_EMERGENCY'] ? advisory_status['ADVISORIES_ADD_EMERGENCY'].fetching : false);
    const [ count ] = useGetNumberOfRecipient();

    useEffect(() => {
        if (flag && advisory_status['ADVISORIES_ADD_EMERGENCY'] ) {
            if (advisory_status['ADVISORIES_ADD_EMERGENCY'].error === null) {
                notification.success({ 
                    message:  `Message successfully Sent!`
                })
                history.push({
                    pathname: `/sagip/advisory/emergency`,
                })
            }
            setFlag(false);
        }
    }, [flag, setFlag, advisory_status, history]);

    const sendMessage =  async () =>{
        if(smsOutput.length > 160){
            notification.warning({
                message : 'SMS character count exceeded!',
                description : 'SMS Output must be less than or equal to 160 characters'
            });
            return;
        }
        try {
            const data = await form.validateFields();
            const payload = { 
                ...data,
                sms_output : smsOutput
            }
            add_emergency(payload);
            setTimeout(() => setFlag(true), 500);
        }catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const onValuesChange = (changedFields, { 
        forecast_date,
        tropical_cyclone, 
        other_emergencies
     }) =>{
        if(!forecast_date) return;
        let sms_output = "";
        if(forecast_date){
            const date = forecast_date.format('MMM DD, YYYY');
            sms_output = `${sms_output} ${date}`
        }
        if(tropical_cyclone){
            sms_output = `${sms_output} Tropical Cyclone:${tropical_cyclone}/`
        }
        if(other_emergencies){
            sms_output = `${sms_output} Other Emergencies:${other_emergencies}`
        }
        setSmsIutput(sms_output);
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
                        <Container.Title2>{`Emergency`}</Container.Title2>
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
                    <Row>
                        <Col span={4}>
                            <ModalContainer.Label>Forecast Date:</ModalContainer.Label>
                        </Col>
                        <Col>
                            <Form.Item
                                name="forecast_date"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                                <DatePicker 
                                    format="YYYY-MM-DD"
                                    style={{width : '300px'}}
                                />
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row className="row-margin-bottom2">
                        <Col span={4}>
                            <ModalContainer.Label>Tropical Cyclone : </ModalContainer.Label>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="tropical_cyclone"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                                <Input.TextArea
                                    rows={3}
                                />
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <ModalContainer.Label>Other Advise : </ModalContainer.Label>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="other_emergencies"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                                <Input.TextArea
                                    rows={3}
                                />
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
                        <SpanItalic>{`**This will consume ${count} credit/s`}</SpanItalic>
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
            <EmergencyDrawer
                onClose={() => setVisible((prev) => !prev)}
                visible={visible}
            />
        </Container>
    )
}

const mapStateToProps = (state: IState) => ({
    user_log : state.UserReducer.data,
    advisory_status : getAdvisoryStatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            add_emergency : asyncActions.add_emergency
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyLanding);

const FlexDiv = styled.div`
    display : flex;
    justify-content : space-between;
`