import React from 'react'
import { Partners } from '../../components';
import { PartnersData} from '../../data/Partners';
import { motion } from "framer-motion";

const PartnersContainer : React.FC = () => {
    return (
        <Partners id="partners" >
            <Partners.SectionTitle>Our Partners and Sponsor</Partners.SectionTitle>
            <Partners.Pane>
                {
                    PartnersData.map((item) =>{
                        return (
                            <div 
                                key={item.id}
                                data-aos={"slide-up"}  
                                data-aos-easing="linear" 
                                data-aos-duration="1000"
                            >
                                <Partners.Card key={item.id}>
                                    <motion.div whileHover={{ scale: 1.2 }}>
                                        <Partners.ImageWrapper>
                                            <Partners.Image src={item.src} alt={item.alt}/>
                                        </Partners.ImageWrapper>
                                    </motion.div>
                                    {/* <Partners.CardTitle>{item.title}</Partners.CardTitle> */}
                                </Partners.Card>
                            </div>
                        )
                    })
                }
            </Partners.Pane>
        </Partners>
    )
}

export default PartnersContainer;
