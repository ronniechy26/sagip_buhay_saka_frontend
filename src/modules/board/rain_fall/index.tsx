import React from 'react';
import Chart from './Chart';
import styled from 'styled-components/macro'
import { Container} from '../../../components'
import { IDashboardRainfall } from '../../../models/DashboardModel';

interface IProps  {
    data : Array<IDashboardRainfall>;
    status : any
}

const RainFall : React.FC<IProps> = ({ data , status}) => {
    // const fetch_loading = (status['GET_RAINFALL'] ? status['GET_RAINFALL'].fetching : false);

    return (
        <Container>
            <div style={{overflowY : "hidden"}}>
                <Container.Card minHeight="60vh">
                    <LabelSpan>Rainfall</LabelSpan>
                    <Chart data={data}/>
                </Container.Card>
            </div>
        </Container>
    )
}

export default RainFall

const LabelSpan = styled.span`
    font-size : 32px;
    font-weight : 700;
    color : gray;
`