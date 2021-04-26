import React from 'react';
import Chart from './../min_temp/Chart';
import styled from 'styled-components/macro';
import {Spin} from 'antd';
import { Container} from '../../../components'
import { IDashboardRainfall } from '../../../models/DashboardModel';
import { ModifyData } from '../Selectors';

interface IProps  {
    data : Array<IDashboardRainfall>;
    status : any
}

const MaxTemp : React.FC<IProps> = ({data, status}) => {
    const fetch_loading = (status['GET_MAX_TEMP'] ? status['GET_MAX_TEMP'].fetching : false);
    return (
        <Container>
            <Spin tip="Loading..." spinning={fetch_loading}>
                <div style={{overflowY : "hidden"}}>
                    <Container.Card minHeight="60vh">
                        <LabelSpan>Max Temperature</LabelSpan>
                        <Chart data={ModifyData(data)}/>
                    </Container.Card>
                </div>
            </Spin>
        </Container>
    )
}

export default MaxTemp;

const LabelSpan = styled.span`
    font-size : 32px;
    font-weight : 700;
    color : gray;
`