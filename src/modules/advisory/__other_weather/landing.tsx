import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Row, Button , Form, Col, Input, notification} from 'antd';
import { SendOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Container, ModalContainer, LandingHeader} from '../../../components';
import {CharCount, SpanItalic } from '../Styles'
import Header from '../_10_day_weather/components/Header';
import useGetNumberOfRecipient from '../../../hooks/useGetNumberOfRecipient';

import { IState } from '../../../ducks';
import { asyncActions } from '../../../ducks/AdvisoryDucks';
import { getAdvisoryStatus } from '../../../selectors/AdvisorySeletors';

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const OtherWeatherLanding : React.FC<IProps> = ({advisory_status, add_other_weather, user_log}) => {
    const history = useHistory();
    const [ form ] = Form.useForm();
    const [ smsOutput, setSmsIutput ] = useState('');
    const [ flag, setFlag ] = useState(false);
    const [ count ] = useGetNumberOfRecipient();

    useEffect(() => {
        if (flag && advisory_status['ADVISORIES_ADD_OTHER_WEATHER'] ) {
            if (advisory_status['ADVISORIES_ADD_OTHER_WEATHER'].error === null) {
                notification.success({ 
                    message:  `Message successfully Sent!`
                })
                history.push({
                    pathname: `/sagip/advisory/other_weather_system`,
                })
            }
            setFlag(false);
        }
    }, [flag, setFlag, advisory_status, history]);

    const onValuesChange = (changedFields, { 
        advisory,
     }) =>{
        if(!advisory) return;
        let sms_output = "";
        if(advisory){
            sms_output = `${sms_output} Advisory : ${advisory}`
        }
        setSmsIutput(sms_output);
    }

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
            console.log(payload);
            add_other_weather(payload);
            setTimeout(() => setFlag(true), 500);
        }catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    return (
        <Container>
            <Header/>
            <Form
                form={form}
                onValuesChange={onValuesChange}
            >
                <Container.Card minHeight={'80vh'}>
                    <Row className="row-margin-bottom4">
                        <Container.Title2>{`Other Weather System`}</Container.Title2>
                    </Row>
                    <Row className="row-margin-bottom2">
                        <Col span={3}>
                            <ModalContainer.Label>Advisory : </ModalContainer.Label>
                        </Col>
                        <Col span={12}>
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
                        <SpanItalic>{`**This will consume ${count} credit/s`}</SpanItalic>
                    </Row>
                    <LandingHeader.ButtonWrapper>
                        <Button 
                            type="primary" 
                            size="large"
                            icon={<SendOutlined />}
                            onClick={sendMessage}
                            loading={false}
                        >
                            Send Advisory
                        </Button>
                    </LandingHeader.ButtonWrapper>
                    <div style={{marginBottom : '100px'}}/>
                </Container.Card>
            </Form>
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
            add_other_weather : asyncActions.add_other_weather
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OtherWeatherLanding);