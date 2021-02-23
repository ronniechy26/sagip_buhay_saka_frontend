import React from 'react'
import { LogoImg, LogoWrapper, Container, Title} from './LogoELements';

interface ILogoComposition {
    LogoWrapper : React.FC;
    Image : React.FC<{src : string, alt : string}>;
    Title : React.FC;
}


const Logo : React.FC & ILogoComposition = ({children,...restProps}) => {
    return <Container {...restProps}>{children}</Container>
}
export default Logo

Logo.LogoWrapper = ({children,...restProps}) =>{
    return <LogoWrapper {...restProps}>{children}</LogoWrapper>
}

Logo.Image = ({...restProps}) =>{
    return <LogoImg {...restProps}/>
}

Logo.Title = ({children,...restProps}) =>{
    return <Title {...restProps}>{children}</Title>
}