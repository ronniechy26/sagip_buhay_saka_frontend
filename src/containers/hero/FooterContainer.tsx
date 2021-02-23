import React from 'react'
import { Footer } from '../../components';
import { animateScroll as scroll } from 'react-scroll';

const gotoTop = () =>{
    scroll.scrollToTop();
}

const FooterContainer : React.FC = () => {
    return (
        <Footer>
            <Footer.Pane>
                <Footer.Logo onClick={gotoTop}>
                    Sagip
                </Footer.Logo>
                <Footer.WebsiteRights>
                    Sagip © {new Date().getFullYear()} All rights reserved.
                </Footer.WebsiteRights>
                <Footer.Term href={`${process.env.REACT_APP_TERM_CONDITION_LINK}`} target="_blank">
                    Terms and Conditions
                </Footer.Term>
            </Footer.Pane>
        </Footer>
    )
}

export default FooterContainer
