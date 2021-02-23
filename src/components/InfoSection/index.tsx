import React from 'react';
import { Container,Card,H1, Icon, H2, P, Wrapper} from './InfoSectionElements';

interface IInfoSectionComposition {
    Card : React.FC;
    H1 : React.FC;
    Wrapper : React.FC;
    H2 : React.FC;   
    Paragraph : React.FC;
    Icon : React.FC<{src : string; alt : string}>;
}

const InfoSection : React.FC<{id : string}> & IInfoSectionComposition = ({id, children, ...restProps}) => {
    return (
        <Container id={id} {...restProps}>
            {children}
        </Container>
    )
}
export default InfoSection

InfoSection.Card = ({children,...restProps}) =>{
    return <Card {...restProps}> {children} </Card>
}

InfoSection.Wrapper = ({children,...restProps}) =>{
    return <Wrapper {...restProps}> {children} </Wrapper>
}

InfoSection.H1 = ({children,...restProps}) =>{
    return <H1 {...restProps}> {children} </H1>
}

InfoSection.H2 = ({children,...restProps}) =>{
    return <H2 {...restProps}> {children} </H2>
}

InfoSection.Paragraph = ({children,...restProps}) =>{
    return <P {...restProps}> {children} </P>
}

InfoSection.Icon = ({ ...restProps }) =>{
    return <Icon {...restProps} />;
};
  