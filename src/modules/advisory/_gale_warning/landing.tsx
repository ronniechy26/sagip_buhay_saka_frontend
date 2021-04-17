import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Row, Button , DatePicker, Form, Col, Input, notification , InputNumber} from 'antd';
import { SendOutlined, BarChartOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Container, ModalContainer, LandingHeader } from '../../../components';
import { CharCount, SpanItalic } from '../Styles'
import Header from '../_10_day_weather/components/Header';
import GaleChartDrawer from './components/GaleChartDrawer';
import { IState } from '../../../ducks';
import { asyncActions } from '../../../ducks/AdvisoryDucks';
import { getAdvisoryStatus } from '../../../selectors/AdvisorySeletors';
import useGetNumberOfRecipient from '../../../hooks/useGetNumberOfRecipient';
import useGetProvince from '../../../hooks/useGetProvince';
import { getCreditCount } from '../Selector';

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const GaleWarningLanding : React.FC<IProps> = ({add_gale_warning, advisory_status, user_log}) => {
    const [visible, setVisible] = useState(false);
    const history = useHistory();
    const [ form ] = Form.useForm();
    const [ smsOutput, setSmsIutput ] = useState('');
    const [ flag, setFlag ] = useState(false);
    const add_loading = (advisory_status['ADVISORIES_ADD_GALE_WARNING'] ? 
                advisory_status['ADVISORIES_ADD_GALE_WARNING'].fetching : false);
    const [ count ] = useGetNumberOfRecipient();
    const [ province ] = useGetProvince();

    useEffect(() => {
        if (flag && advisory_status['ADVISORIES_ADD_GALE_WARNING'] ) {
            if (advisory_status['ADVISORIES_ADD_GALE_WARNING'].error === null) {
                notification.success({ 
                    message:  `Message successfully Sent!`
                })
                history.push({
                    pathname: `/sagip/advisory/gale_warning`,
                })
            }
            setFlag(false);
        }
    }, [flag, setFlag, advisory_status, history]);

    const sendMessage = async () =>{
        try {
            const data = await form.validateFields();
            const payload = { 
                ...data,
                sms_output : smsOutput,
                credit : getCreditCount(smsOutput.length, count)
            }
            if(user_log?.role !== 'LGU' && province){
                payload['province'] = province;
            }
            add_gale_warning(payload);
            setTimeout(() => setFlag(true), 500);
        }catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const onValuesChange = (changedFields, allFields) =>{
        if(!allFields.forecast_date) return;
        let sms_output = "";
        if(allFields.forecast_date){
            const date = allFields.forecast_date.format('MMM DD, YYYY');
            sms_output = `${sms_output} ${date}`
        }
        if(allFields.wind_speed){;
            sms_output = `${sms_output} WindSpeed:${allFields.wind_speed} ms/`
        }
        if(allFields.description){;
            sms_output = `${sms_output} Desc:${allFields.description}/`
        }
        if(allFields.wave){;
            sms_output = `${sms_output} Wave:${allFields.wave}/`
        }
        if(allFields.advisory){;
            sms_output = `${sms_output} Advisory:${allFields.advisory}`
        }
        setSmsIutput(sms_output);
    }
    
    const onFieldsChange = (changedFields) =>{
        if(changedFields.length > 0 && 
            changedFields[0].name[0] === 'wind_speed'){
            if(changedFields[0].value !== ""){
                const scale  = getGaleWarningScale(changedFields[0].value);
                form.setFieldsValue({
                    'description' : scale[0],
                    'wave' : scale[1]
                })
            }else{
                form.setFieldsValue({
                    'description' :'',
                    'wave' : ''
                })
            }
        }
    }

    return (
        <Container>
            <Header/>
            <Form
                form={form}
                onValuesChange={onValuesChange}
                onFieldsChange={onFieldsChange}
            >
                <Container.Card minHeight={'80vh'}>
                    <FlexDiv className="row-margin-bottom2">
                        <Container.Title2>{`Gale Warning`}</Container.Title2>
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
                            <ModalContainer.Label>Forecast Date :</ModalContainer.Label>
                        </Col>
                        <Col span={16}>
                            <Form.Item
                                name="forecast_date"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                                <DatePicker 
                                    format="YYYY-MM-DD"
                                    style={{width : '30%'}}
                                />
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <ModalContainer.Label>Wind Speed (m/s) :</ModalContainer.Label>
                        </Col>
                        <Col span={16}>
                            <Form.Item
                                name="wind_speed"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                               <InputNumber style={{width : '30%'}} maxLength={5} />
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <ModalContainer.Label>Description :</ModalContainer.Label>
                        </Col>
                        <Col span={16}>
                            <Form.Item
                                name="description"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                               <Input style={{width : '30%'}} disabled />
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <ModalContainer.Label>Wave :</ModalContainer.Label>
                        </Col>
                        <Col span={16}>
                            <Form.Item
                                name="wave"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                               <Input style={{width : '30%'}} disabled/>
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <ModalContainer.Label>Advisory :</ModalContainer.Label>
                        </Col>
                        <Col span={16}>
                            <Form.Item
                                name="advisory"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                               <Input.TextArea rows={3} style={{width : '50%'}} />
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row className="row-margin-top2">
                        <Col span={4}>
                            <ModalContainer.Label>SMS Output :</ModalContainer.Label>
                        </Col>
                        <Col span={12}>
                            <span>{smsOutput}</span>
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
            <GaleChartDrawer
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
            add_gale_warning : asyncActions.add_gale_warning
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(GaleWarningLanding);

const FlexDiv = styled.div`
    display : flex;
    justify-content : space-between;
`
const getGaleWarningScale = (ms : number) : [string, string] =>  {
    if(ms < 0.3){
        return ['Calm', 'Light Winds'];
    }else if(ms >= 0.3 && ms <= 1.5){
        return ['Light Air', 'Light Winds'];
    }else if(ms >= 1.6 && ms <= 3.3){
        return ['Light Breeze', 'Light Winds'];
    }else if(ms >= 3.4 && ms <= 5.5){
        return ['Gentle Breeze', 'Light Winds'];
    }else if(ms >= 5.6 && ms <= 7.9){
        return ['Moderate Breeze', 'Light Winds'];
    }else if(ms >= 8.0 && ms <= 10.7){
        return ['Fresh Breeze', 'High Winds'];
    }else if(ms >= 10.8 && ms <= 13.8){
        return ['Strong Breeze', 'High Winds'];
    }else if(ms >= 13.9 && ms <= 17.1){
        return ['Near Gale', 'High Winds'];
    }else if(ms >= 17.2 && ms <= 20.7){
        return ['Gale', 'Gale-Force'];
    }else if(ms >= 20.8 && ms <= 24.4){
        return ['Strong Gale', 'Gale-Force'];
    }else if(ms >= 24.5 && ms <= 28.4){
        return ['Storm', 'Storm-Force'];
    }else if(ms >= 28.5 && ms <= 32.6){
        return ['Violent Storm', 'Storm-Force'];
    }else {
        return ['Hurricane Force', 'Hurricane-Force'];
    }
}
