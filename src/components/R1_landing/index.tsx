import React from 'react'
import { Container, ImgWrapper, Title , Pane} from './R1LandingElements';

interface IR1LandingComposition {
    ImgWrapper : React.FC;
    Title : React.FC;
    Pane : React.FC;
}

const R1Landing : React.FC & IR1LandingComposition = ({children,...restProps}) => {
    return (<Container {...restProps}>{children}</Container> )
}

export default R1Landing;

R1Landing.ImgWrapper = ({children,...restProps}) =>{
    return <ImgWrapper {...restProps}> {children}</ImgWrapper>
}

R1Landing.Title = ({children,...restProps}) =>{
    return <Title {...restProps}> {children}</Title>
}

R1Landing.Pane = ({children,...restProps}) =>{
    return <Pane {...restProps}> {children}</Pane>
}