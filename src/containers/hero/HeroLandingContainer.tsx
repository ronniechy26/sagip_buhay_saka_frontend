import React from 'react'
import { HeroLanding } from '../../components'

import imgBg from '../../Images/ImgBg.jpg';

import logoImg from '../../Images/logoLanding.png'

const HeroLandingContainer : React.FC = () => {

    const [hover, setHover] = React.useState(false);
    const onHover : (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void =  React.useCallback(() =>{ setHover(!hover)}, [hover])

    return (
        <div data-aos="fade">
            <HeroLanding>
                <HeroLanding.ImgBg>
                    <HeroLanding.Img src={imgBg} alt="farmers"/>
                </HeroLanding.ImgBg>
                <HeroLanding.LogoWrapper>
                    <HeroLanding.LogoImg src={logoImg} alt="Sagip"/>
                </HeroLanding.LogoWrapper>
                <HeroLanding.TextWrapper>
                <HeroLanding.Heading>
                        What is Sagip
                </HeroLanding.Heading>
                <HeroLanding.Divider/>
                <HeroLanding.Subtitle>
                    Sagip Buhay at Saka is a short messaging service (sms) designed to communicate 
                    climate-based warnings to farmers, fishers and other community members. 
                    The warnings are generally from PAGASA and translated into agriculture risk management advisories 
                    by local government partners. The service is meant to help agriculture stakeholders manage 
                    climate risks and reduce damage and losses to life, livelihoods and other community assets.
                </HeroLanding.Subtitle>
                <HeroLanding.BtnWrap>
                        <HeroLanding.LinkButton 
                            to="howItWorks"
                            smooth={true}
                            duration={500}
                            spy={true}
                            exact='true'
                            offset={-80}
                            onMouseEnter={onHover} 
                            onMouseLeave={onHover}
                        >
                        Learn More { hover ? <HeroLanding.ArrowForward/> : <HeroLanding.ArrowRight/> }
                        </HeroLanding.LinkButton>
                </HeroLanding.BtnWrap>
                </HeroLanding.TextWrapper>
            </HeroLanding>
        </div>
    )
}

export default HeroLandingContainer;
