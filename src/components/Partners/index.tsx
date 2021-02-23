import React from 'react'
import  { Container, SectionTitle, Pane, Card , CardTitle , Image, ImgWrapper} from './PartnersElements';

interface IPartnersComposition {
    SectionTitle : React.FC;
    Pane : React.FC;
    Card : React.FC;
    CardTitle : React.FC;
    Image : React.FC<{src : string, alt : string}>;
    ImageWrapper : React.FC;
}

const Partners : React.FC<{id : string}> & IPartnersComposition = ({children, id,...restProps}) => {
    return (<Container id={id} >{children}</Container>)
}

export default Partners;

Partners.SectionTitle = ({children,...restProps}) =>{
    return <SectionTitle {...restProps}>{children}</SectionTitle>
}

Partners.Pane = ({children,...restProps}) =>{
    return <Pane {...restProps}>{children}</Pane>
}

Partners.Card = ({children,...restProps}) =>{
    return <Card {...restProps}>{children}</Card>
}

Partners.CardTitle = ({children,...restProps}) =>{
    return <CardTitle {...restProps}>{children}</CardTitle>
}

Partners.ImageWrapper = ({children,...restProps}) =>{
    return <ImgWrapper {...restProps}>{children}</ImgWrapper>
}

Partners.Image = ({children,...restProps}) =>{
    return <Image {...restProps}>{children}</Image>
}