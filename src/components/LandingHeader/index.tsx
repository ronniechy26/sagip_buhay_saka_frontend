import React from 'react';
import { Header, HeaderTitle, HeaderButtonWrapper } from './LandingHeaderElements';

interface ILandingHeaderComposition {
    Title : React.FC;
    ButtonWrapper : React.FC;
}

const LandingHeader : React.FC & ILandingHeaderComposition= ({children, ...restProps}) => {
    return (
        <Header {...restProps}>
            {children}
        </Header>
    )
}
export default LandingHeader

LandingHeader.Title = ({children, ...restProps}) =>{
    return <HeaderTitle {...restProps}>{children}</HeaderTitle>
}

LandingHeader.ButtonWrapper = ({children, ...restProps}) =>{
    return <HeaderButtonWrapper {...restProps}>{children}</HeaderButtonWrapper>
}