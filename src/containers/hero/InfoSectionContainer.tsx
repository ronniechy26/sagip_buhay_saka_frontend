import React from 'react';
import { InfoSection } from '../../components';

import Icon1 from '../../Images/webdev.svg';
import Icon2 from '../../Images/weatherNotif.svg';
import Icon3 from '../../Images/cost.svg';


const InfoSectionContainer : React.FC = () => {
    return (
        <InfoSection id="infoSection">
            <InfoSection.H1>Info Section</InfoSection.H1>
            <InfoSection.Wrapper>
                <div data-aos="fade-right">
                    <InfoSection.Card>
                        <InfoSection.Icon src={Icon1} alt="webdev" />
                        <InfoSection.H2>Credits</InfoSection.H2>
                        <InfoSection.Paragraph>
                            The development of this SAGIP Buhay at Saka SMS was first commissioned by Greenpeace for R1. 
                            The SAGIP Buhay at Saka name was coined by R1. R1 further developed the system 
                            using a newer  computer coding platform and negotiated with Globe telecoms 
                            as the new sending platform. This was made possible through the support of the Department of 
                            Agriculture Regional Field Office Western Visayas (DA RFO 6) and the Bureau of Agricultural Research (BAR).
                        </InfoSection.Paragraph>
                    </InfoSection.Card>
                </div>
                <div data-aos="fade-up">
                    <InfoSection.Card>
                        <InfoSection.Icon src={Icon3} alt="cost" />
                        <InfoSection.H2>Costs of Operation</InfoSection.H2>
                        <InfoSection.Paragraph>
                            Each message sent by LGU and PAGASA is deducted to the number of credits that the LGU has. One text is 
                            equivalent to 140 characters. Messages that are beyond this limit will be considered multiple messages. 
                        </InfoSection.Paragraph>
                    </InfoSection.Card>
                </div>
                <div data-aos="fade-left">
                    <InfoSection.Card>
                        <InfoSection.Icon src={Icon2} alt="weatherNotif" />
                        <InfoSection.H2>Early Warning Communication System</InfoSection.H2>
                        <InfoSection.Paragraph>
                            The SMS is just one of the many ways to communicate warnings and advise. Under the LGU’s 
                            Climate Information Services (CIS) they also use weather boards in places frequented by farmers, 
                            organize Climate Forum/Fora, the use of posters and other forms communication to disseminate warnings and advisories. 
                        </InfoSection.Paragraph>
                    </InfoSection.Card>
                </div>
            </InfoSection.Wrapper>
        </InfoSection>
    )
}

export default InfoSectionContainer
