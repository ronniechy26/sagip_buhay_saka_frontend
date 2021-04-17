import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Row, Button , Form, Col, Input, notification, Select, InputNumber} from 'antd';
import { SendOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Container, ModalContainer, LandingHeader} from '../../../components';
import {CharCount, SpanItalic } from '../Styles'
import Header from '../_10_day_weather/components/Header';
import { TropicalCycloneCategory } from '../../../constants';

import { IState } from '../../../ducks';
import { asyncActions } from '../../../ducks/AdvisoryDucks';
import { getAdvisoryStatus } from '../../../selectors/AdvisorySeletors';
import useGetNumberOfRecipient from '../../../hooks/useGetNumberOfRecipient';
import useGetProvince from '../../../hooks/useGetProvince';
import { getCreditCount } from '../Selector';

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const TropicalCycloneLanding : React.FC<IProps> = ({add_tropical_cyclone, advisory_status, user_log}) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [ smsOutput, setSmsIutput ] = useState('');
    const [ flag, setFlag ] = useState(false);
    const add_loading = (advisory_status['ADVISORIES_ADD_TROPICAL_CYCLONE'] ? advisory_status['ADVISORIES_ADD_TROPICAL_CYCLONE'].fetching : false);
    const [ count ] = useGetNumberOfRecipient();
    const [ province ] = useGetProvince();

    useEffect(() => {
        if (flag && advisory_status['ADVISORIES_ADD_TROPICAL_CYCLONE'] ) {
            if (advisory_status['ADVISORIES_ADD_TROPICAL_CYCLONE'].error === null) {
                notification.success({ 
                    message:  `Message successfully Sent!`
                })
                history.push({
                    pathname: `/sagip/advisory/tropical_cyclone`,
                })
            }
            setFlag(false);
        }
    }, [flag, setFlag, advisory_status, history]);

    const onValuesChange = (changedFields, { 
        name,
        category, 
        km_per_hour,
        path,
        advisory
     }) =>{
        if(!name) return;
        let sms_output = "";
        if(name){
            sms_output = `${sms_output} Name:${name}/`
        }
        if(category){
            sms_output = `${sms_output} Category:${category}/`
        }
        if(km_per_hour){
            sms_output = `${sms_output} KMP:${km_per_hour}/`
        }
        if(path){
            sms_output = `${sms_output} Path:${path}/`
        }
        if(advisory){
            sms_output = `${sms_output} Advise:${advisory}`
        }
        setSmsIutput(sms_output);
    }

    const sendMessage =  async () =>{
        try {
            const data = await form.validateFields();
            const payload = { 
                ...data,
                sms_output : smsOutput,
                province,
                credit : getCreditCount(smsOutput.length, count) 
            }
            add_tropical_cyclone(payload);
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
                    <Row className="row-margin-bottom2">
                        <Container.Title2>{`Tropical Cyclone`}</Container.Title2>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <ModalContainer.Label>Name of Tropical Cylone :</ModalContainer.Label>
                        </Col>
                        <Col>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                                <Input style={{width : '250px'}}/>
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <ModalContainer.Label>Category :</ModalContainer.Label>
                        </Col>
                        <Col>
                            <Form.Item
                                name="category"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                                <Select
                                    style={{width : '250px'}}
                                >
                                    {TropicalCycloneCategory.map((item) =>{
                                        return(
                                            <Select.Option value={item.text} key={item.id}>
                                                {item.text}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <ModalContainer.Label>Kilometer Per Hour (kpm) :</ModalContainer.Label>
                        </Col>
                        <Col>
                            <Form.Item
                                name="km_per_hour"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                                <InputNumber style={{width : '250px'}}/>
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <ModalContainer.Label>Path :</ModalContainer.Label>
                        </Col>
                        <Col>
                            <Form.Item
                                name="path"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                                <Input style={{width : '250px'}}/>
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row className="row-margin-bottom2">
                        <Col span={4}>
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
            add_tropical_cyclone : asyncActions.add_tropical_cyclone
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(TropicalCycloneLanding);