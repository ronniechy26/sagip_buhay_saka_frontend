import React from 'react'
import {Container, Pane , Logo , WebsiteRights, TermAndCondition} from './FooterElement';

interface ITermAndCondition { 
    href : string; 
    target : string;
}

interface IFooterComposition {
    Pane : React.FC;
    Logo : React.FC<{onClick : () =>void }>;
    WebsiteRights : React.FC;
    Term : React.FC<ITermAndCondition>
}

const Footer : React.FC & IFooterComposition = ({children,  ...restProps}) => {
    return ( <Container { ...restProps}> { children} </Container> )
}
export default Footer

Footer.Pane = ({children,  ...restProps}) =>{
    return<Pane {...restProps}>{children}</Pane>
}

Footer.Logo = ({children,  ...restProps}) =>{
    return<Logo {...restProps}>{children}</Logo>
}

Footer.WebsiteRights = ({children,  ...restProps}) =>{
    return<WebsiteRights {...restProps}>{children}</WebsiteRights>
}

Footer.Term = ({children,  ...restProps}) =>{
    return <TermAndCondition {...restProps}>{children}</TermAndCondition>
}