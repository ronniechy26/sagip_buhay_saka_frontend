import React from 'react';
import Chart from './Chart';
import styled from 'styled-components/macro';
import {Spin} from 'antd';
import { Container} from '../../../components'
import { IDashboardRainfall } from '../../../models/DashboardModel';
import { ModifyData } from '../Selectors';

interface IProps  {
    data : Array<IDashboardRainfall>;
    status : any
}

const RainFall : React.FC<IProps> = ({data, status}) => {
    const fetch_loading = (status['GET_MIN_TEMP'] ? status['GET_MIN_TEMP'].fetching : false);
    return (
        <Container>
            <Spin tip="Loading..." spinning={fetch_loading}>
                <div style={{overflowY : "hidden"}}>
                    <Container.Card minHeight="60vh">
                        <LabelSpan>Min Temperature</LabelSpan>
                        <Chart data={ModifyData(data)}/>
                    </Container.Card>
                </div>
            </Spin>
        </Container>
    )
}

export default RainFall

const LabelSpan = styled.span`
    font-size : 32px;
    font-weight : 700;
    color : gray;
`