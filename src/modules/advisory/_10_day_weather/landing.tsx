import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
// import reactComponentDebounce from 'react-component-debounce';
import { Row, Col, DatePicker, Input, Button, Form, notification } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import { Container, ModalContainer, Table, LandingHeader, ActionButton } from '../../../components';
import { CharCount, SpanItalic, HeaderDiv, SpanAddLivelihood } from '../Styles';
import Header from './components/Header';
import DatesTable from './components/DatesTable';
import LivelihoodList from './components/LivelihoodList';

import { IState } from '../../../ducks';
import { asyncActions as LAsyncAction } from '../../../ducks/LivelihoodDucks';
import { ILivelihood } from '../../../models/LivelihoodModel';
import { getLivelihoodActiveStatus } from '../../../selectors/LivelihoodSelector';
import { asyncActions as AdvisoryAction } from '../../../ducks/AdvisoryDucks';
import { asyncActions as HazardAction } from '../../../ducks/HazardDucks';
import { IAdvisory } from '../../../models/AdvisoryModel';
import { getAdvisoryStatus } from '../../../selectors/AdvisorySeletors';
import useGetNumberOfRecipient from '../../../hooks/useGetNumberOfRecipient';
import useGetProvince from '../../../hooks/useGetProvince';
import { getCreditCount } from '../Selector';
import { IHazard } from '../../../models/HazardModel';

// const TextArea = reactComponentDebounce(150, 200)(Input.TextArea);

export interface IDates {
    id: string;
    date: string,
    rainfall: string;
    min_temp: string;
    max_temp: string;
    mean_temp: string;
}

export interface ILivelihoodList {
    id: number;
    livelihood: string;
    production_stage: string;
    hazard: string;
    risk: string;
    advisory: string;
    other_advisory: string;
}

const init: ILivelihoodList = {
    id: 0,
    livelihood: "",
    production_stage: "",
    hazard: "",
    risk: "",
    advisory: "",
    other_advisory: "",
}

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Landing: React.FC<IProps> = ({
    livelihood_list,
    fetch_livelihoods,
    user_log,
    add_10_day,
    advisory_status,
    fetch_hazard_by_id,
    hazards
}) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [forecastDate, setForecastDate] = useState();
    const [dates, setDates] = useState<IDates[]>([]);
    // const [ potentialHazzard, setPotentialHazzard ] = useState('');
    const [livelihoodList, setLivelihoodList] = useState<Array<ILivelihoodList>>([init]);
    const [smsOutput, setSmsOutput] = useState('');
    const add_loading = (advisory_status['ADVISORIES_ADD_10DAY'] ? advisory_status['ADVISORIES_ADD_10DAY'].fetching : false);
    const [flag, setFlag] = useState(false);
    const [count] = useGetNumberOfRecipient();
    const [province] = useGetProvince();

    useEffect(() => {
        fetch_livelihoods();
    }, [fetch_livelihoods])

    const dateOnChange = (date, dateString: string) => {
        if (dateString === '') {
            setForecastDate(undefined);
            setDates([]);
            return;
        }

        setForecastDate(date);
        const endDate = moment(date).add(6, 'days');
        const dates = getDates(date, endDate);
        const arrayOfDates = dates.map((item, index) => {
            return {
                id: (index + 1).toString(),
                date: item,
                rainfall: '',
                min_temp: '',
                max_temp: '',
                mean_temp: '',
            }
        });
        setDates(arrayOfDates);
    }

    const InputTableChange = React.useCallback((value, index, column) => {
        const cloneDates = cloneDeep(dates);
        cloneDates[index][column] = value;
        setDates(cloneDates);
    }, [dates, setDates])

    const LivelihoodListChange = (value, index, column) => {
        const cloneLivelihood = cloneDeep(livelihoodList);
        if (column === 'livelihood') {        
            cloneLivelihood[index][column] = value;
            cloneLivelihood[index]['risk'] = "";
            cloneLivelihood[index]['production_stage'] = "";
            cloneLivelihood[index]['hazard'] = "";
            cloneLivelihood[index]['advisory'] = "";
            cloneLivelihood[index]['other_advisory'] = "";        
        } else {
            cloneLivelihood[index][column] = value;
        }
        console.log(cloneLivelihood)
        setLivelihoodList(cloneLivelihood);
    }
    
    const hazardChange = React.useCallback(( index, hazard, risk, advisory ) => {
        const cloneLivelihood = cloneDeep(livelihoodList);
       
        cloneLivelihood[index]['risk'] = risk;
        cloneLivelihood[index]['hazard'] = hazard;
        cloneLivelihood[index]['advisory'] = advisory;
        
        setLivelihoodList(cloneLivelihood);
    }, [livelihoodList, setLivelihoodList])

    const addLivelihood = React.useCallback(() => {
        const lastIndexObj = livelihoodList[livelihoodList.length - 1];
        const newList = [...livelihoodList, {
            livelihood: "",
            production_stage: "",
            hazard: "",
            risk: "",
            advisory: "",
            other_advisory: "",
            id: lastIndexObj.id + 1
        }];
        setLivelihoodList(newList)
    }, [livelihoodList, setLivelihoodList])

    const removeLivelihood = React.useCallback((id: number) => {
        if (livelihoodList.length <= 1) return;
        const filteredList = livelihoodList.filter(x => x.id !== id);
        setLivelihoodList(filteredList)
    }, [setLivelihoodList, livelihoodList])

    const render_sms = React.useCallback((startdate: moment.Moment | undefined, livelihoodList: ILivelihoodList[]) => {  // potentialHazzard : string
        if (startdate === undefined) return '';
        let sms_output = `${user_log?.first_name} ${user_log?.last_name}`;
        sms_output = `${sms_output} ${startdate.format('MM/DD')}-${moment(startdate).add(6, 'days').format('DD/YY')}/`
        // sms_output = `${sms_output} Potential Hazzard:${potentialHazzard}/`
        const finalSmsOutput = livelihoodList.reduce((acc, curr) => {
            let temp = `${getValueInList(curr.livelihood, livelihood_list, 'livelihood_name')}/`
            if (curr.production_stage !== '') {
                temp = temp + `${curr.production_stage}/`;
            }
            if (curr.hazard !== '') {
                temp = temp + `Hazard:${curr.hazard}/`;
            }
            if (curr.risk !== '') {
                temp = temp + `Risk:${curr.risk}/`;
            }
            if (curr.advisory !== '') {
                temp = temp + `Advisory:${curr.advisory}/`
            }
            temp = temp + `Other Advisory:${curr.other_advisory}`
            return `${acc}${temp}`;
        }, sms_output)

        return finalSmsOutput;

    }, [livelihood_list, user_log])

    useEffect(() => {
        const output = render_sms(forecastDate, livelihoodList); // potentialHazzard
        setSmsOutput(output);
    }, [forecastDate, livelihoodList, setSmsOutput, render_sms]); //potentialHazzard

    useEffect(() => {
        if (flag && advisory_status['ADVISORIES_ADD_10DAY']) {
            if (advisory_status['ADVISORIES_ADD_10DAY'].error === null) {
                notification.success({
                    message: `Message successfully Sent!`
                })
                history.push({
                    pathname: `/sagip/advisory/10_day_weather`,
                })
            }
            setFlag(false);
        }
    }, [flag, setFlag, advisory_status, history]);

    const sendAdvisory = async () => {
        try {
            const data = await form.validateFields();
            const payload = {
                sms_output: smsOutput,
                forecast_date: data.forecast_date,
                forecast_data: dates,
                credit: getCreditCount(smsOutput.length, count)
            }
            if (user_log?.role !== 'LGU' && province) {
                payload['province'] = province;
            }
            add_10_day(payload);
            setTimeout(() => setFlag(true), 500);
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    return (
        <Container>
            <div style={{ position: "relative", zIndex: 1 }}>
                <Header />
            </div>
            <div style={{ position: 'relative', zIndex: 0 }}>
                <Form
                    form={form}
                >
                    <Container.Card minHeight={'80vh'}>
                        <div className="row-margin-bottom2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Row >
                                <Container.Title2>{`10 day Weather Advisory`}</Container.Title2>
                            </Row>
                            <div>
                                <div>
                                    <Container.Title3>{`Click link below to access relevant PAGASA forecast product/s`}</Container.Title3>
                                </div>

                                <a href="http://bagong.pagasa.dost.gov.ph/climate/climate-prediction/10-day-climate-forecast" target="_blank">
                                    http://bagong.pagasa.dost.gov.ph/climate/climate-prediction/10-day-climate-forecast
                                </a>
                            </div>
                        </div>

                        <Row>
                            <Col span={3}>
                                <ModalContainer.Label>Forecast Date:</ModalContainer.Label>
                            </Col>
                            <Col>
                                <Form.Item
                                    name="forecast_date"
                                    rules={[{ required: true, message: 'Please input required fields!' }]}
                                >
                                    <DatePicker
                                        format="YYYY-MM-DD"
                                        value={forecastDate}
                                        onChange={dateOnChange}
                                        style={{ width: '300px' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Table>
                            <DatesTable
                                form={form}
                                data={dates}
                                onChange={InputTableChange}
                            />
                        </Table>
                        {/* <div className="row-margin-top2" >
                            <span className="display-inline-block" style={{margin : '10px 50px 0 0'}}>
                                <ModalContainer.Label>Potential Hazzard:</ModalContainer.Label>
                            </span>
                            <span>
                                <Form.Item
                                    style={{display : 'inline-block', width : '40%',  marginTop : '10px'}}
                                    name="potential_hazzard"
                                    rules={[{ required: true, message: 'Please input required fields!' }]}
                                >
                                    <TextArea 
                                        rows={1} 
                                        value={potentialHazzard}
                                        onChange={(e) => setPotentialHazzard(e)}
                                    />
                                </Form.Item> 
                            </span>
                        </div> */}
                        <div className="row-margin-top2">
                            {
                                livelihoodList.map((item, index) => {
                                    return (
                                        <LivelihoodList
                                            fetch_hazard_by_id={fetch_hazard_by_id}
                                            form={form}
                                            key={index}
                                            index={index}
                                            livelihood_list={livelihood_list as Array<ILivelihood>}
                                            item={item}
                                            removeLivelihood={removeLivelihood}
                                            LivelihoodListChange={LivelihoodListChange}
                                            hazards={hazards}
                                            hazardChange={hazardChange}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="row-margin-top2">
                            <SpanAddLivelihood
                                onClick={addLivelihood}
                            >
                                +Add Livelihood
                            </SpanAddLivelihood>
                        </div>
                        <Row className="row-margin-top2">
                            <Col span={3}>
                                <ModalContainer.Label>SMS Output :</ModalContainer.Label>
                            </Col>
                            <Col span={15}>
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
                                onClick={sendAdvisory}
                                loading={add_loading}
                            >
                                Send Advisory
                            </Button>
                        </LandingHeader.ButtonWrapper>
                        <div style={{ marginBottom: '100px' }} />
                    </Container.Card>
                </Form>
            </div>
        </Container>
    )
}

const mapStateToProps = (state: IState) => ({
    livelihood_list: getLivelihoodActiveStatus(state),
    user_log: state.UserReducer.data,
    advisory_status: getAdvisoryStatus(state),
    hazards : state.HazardReducer.list
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_livelihoods: LAsyncAction.fetch_livelihoods,
            add_10_day: AdvisoryAction.add_10_day,
            fetch_hazard_by_id: HazardAction.fetch_hazards_by_id
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

const getValueInList = (id: string, data: Array<any> = [], column: string) => {
    const item = data.find(x => x.id === id);
    if (item === undefined) return '';
    return item[column];
}

const getDates = (startDate: moment.Moment, stopDate: moment.Moment) => {
    let dateArray: string[] = [];
    let currentDate = moment(startDate);
    while (currentDate <= stopDate) {
        dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}
