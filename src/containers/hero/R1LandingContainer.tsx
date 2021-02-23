import React from 'react'
import { R1Landing, HeroLanding } from '../../components';

import RiceWatch from '../../Images/R1.png';

const R1LandingContainer : React.FC = () => {
    return (
        <R1Landing>
            <R1Landing.Pane>
                <div data-aos="fade">
                    <R1Landing.ImgWrapper>
                        <HeroLanding.Img src={RiceWatch} alt="rice watch"/>
                    </R1Landing.ImgWrapper>
                </div>
                <div data-aos="fade-up">
                    <R1Landing.Title>
                        Rice Watch Action Network
                    </R1Landing.Title>
                </div>
            </R1Landing.Pane>
        </R1Landing>
    )
}

export default R1LandingContainer
