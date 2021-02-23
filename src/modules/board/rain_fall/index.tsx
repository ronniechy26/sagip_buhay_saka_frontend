import React from 'react';
import Chart from './Chart';
import styled from 'styled-components/macro'
import {months} from '../../../constants';
import { Container} from '../../../components'

const RainFall = () => {
    return (
        <Container>
            <div style={{overflowY : "hidden"}}>
                <Container.Card minHeight="60vh">
                    <LabelSpan>Rainfall</LabelSpan>
                    <Chart data={temp()}/>
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

const temp = () =>{
    const data = months.map((item, index) =>{
       return{
            id: index,
            month: item.text,
            normal: Math.floor((Math.random() * 20) + 1),
            el_nino: Math.floor((Math.random() * 20) + 1),
            la_nina: Math.floor((Math.random() * 20) + 1),
            actual: Math.floor((Math.random() * 20) + 1),
            forecast: Math.floor((Math.random() * 20) + 1),
       }
    })

    return data;
}