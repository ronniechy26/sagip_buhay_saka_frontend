import React from 'react'
import { 
    Container, 
    ImgBg, 
    Img,
    LogoWrapper,
    LogoImg,
    TextWrapper,
    Heading,
    Subtitle,
    Divider,
    BtnWrap,
    LinkButton,
    ArrowForward,
    ArrowRight,
} from './HeroLandingElements';

interface ILinkButton {
    to: string;
    onMouseEnter : (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onMouseLeave : (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface IScroll {
    smooth: boolean;
    duration: number;
    spy: boolean;
    exact : string;
    offset: number;
}

interface IHeroLandingComposition {
    ImgBg : React.FC;
    Img : React.FC<{src : string, alt : string}>;
    LogoWrapper : React.FC;
    LogoImg : React.FC<{src : string, alt : string}>;
    TextWrapper : React.FC;
    Heading : React.FC;
    Subtitle : React.FC;
    Divider : React.FC;
    BtnWrap : React.FC;
    LinkButton : React.FC<ILinkButton & IScroll>;
    ArrowForward : React.FC;
    ArrowRight : React.FC;
}


const HeroLanding : React.FC & IHeroLandingComposition = ({children,...restProps}) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default HeroLanding;

HeroLanding.ImgBg = ({children,...restProps}) =>{
    return <ImgBg {...restProps}>{children}</ImgBg>
}

HeroLanding.Img = ({children,...restProps}) =>{
    return <Img {...restProps}>{children}</Img>
}

HeroLanding.LogoWrapper = ({children,...restProps}) =>{
    return <LogoWrapper {...restProps}>{children}</LogoWrapper>
}

HeroLanding.LogoImg = ({children,...restProps}) =>{
    return <LogoImg {...restProps}>{children}</LogoImg>
}

HeroLanding.TextWrapper = ({children,...restProps}) =>{
    return <TextWrapper {...restProps}>{children}</TextWrapper>
}

HeroLanding.Heading = ({children,...restProps}) =>{
    return <Heading {...restProps}>{children}</Heading>
}

HeroLanding.Subtitle = ({children,...restProps}) =>{
    return <Subtitle {...restProps}>{children}</Subtitle>
}

HeroLanding.Divider = ({children,...restProps}) =>{
    return <Divider {...restProps}>{children}</Divider>
}

HeroLanding.BtnWrap = ({children,...restProps}) =>{
    return <BtnWrap {...restProps}>{children}</BtnWrap>
}

HeroLanding.LinkButton = ({children,...restProps}) =>{
    return <LinkButton {...restProps}>{children}</LinkButton>
}

HeroLanding.ArrowForward = ({children,...restProps}) =>{
    return <ArrowForward {...restProps}>{children}</ArrowForward>
}

HeroLanding.ArrowRight = ({children,...restProps}) =>{
    return <ArrowRight {...restProps}>{children}</ArrowRight>
}

