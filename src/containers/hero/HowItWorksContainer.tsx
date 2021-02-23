import React from 'react';
import { Jumbotron } from '../../components/index';
import { HowItWorksData } from '../../data/HowItWorks';

const HowItWorksContainer : React.FC = () => {
    return (
        <Jumbotron.Container id="howItWorks" >
            {
                HowItWorksData.map((item) => (
                    <div 
                        key={item.id} 
                        data-aos={item.effect}
                    >
                        <Jumbotron key={item.id} direction={item.direction}>
                            <Jumbotron.Pane>
                                <Jumbotron.Title>{item.title}</Jumbotron.Title>
                                <Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
                            </Jumbotron.Pane>
                            <Jumbotron.Pane>
                                <Jumbotron.Image src={item.image} alt={item.alt} />
                            </Jumbotron.Pane>
                        </Jumbotron>
                    </div> 
                ))
            }
        </Jumbotron.Container>
    )
}

export default HowItWorksContainer
