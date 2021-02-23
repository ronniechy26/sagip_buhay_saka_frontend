import React from 'react'
import { Container, Inner, SectionTitle, Pane, Title, SubTitle , Image, Item} from './JumbotronElements';

interface IJumbotronComposition {
    SectionTitle : React.FC;
    Container : React.FC<{id : string}>;
    Pane : React.FC;
    Title : React.FC;
    SubTitle : React.FC;
    Image : React.FC<{src : string; alt : string}>;
}


const Jumbotron : React.FC<{direction : string}> & IJumbotronComposition = ({children, direction, ...restProps}) => {
    return (
       <Item {...restProps}>
            <Inner direction={direction}>{children}</Inner>
       </Item>
      )
}
export default Jumbotron;

Jumbotron.SectionTitle = ({children,...restProps}) =>{
    return <SectionTitle {...restProps}> {children} </SectionTitle>
}

Jumbotron.Container = ({ children, ...restProps }) =>{
    return <Container {...restProps}>{children}</Container>;
  };
  
Jumbotron.Pane = ({ children, ...restProps }) => {
    return <Pane {...restProps}>{children}</Pane>;
};
  
Jumbotron.Title = ({ children, ...restProps }) => {
    return <Title {...restProps}>{children}</Title>;
};
  
Jumbotron.SubTitle = ({ children, ...restProps }) =>{
    return <SubTitle {...restProps}>{children}</SubTitle>;
};
  
Jumbotron.Image = ({ ...restProps }) =>{
    return <Image {...restProps} />;
};
  