import React from 'react';
import { Navbar } from '../../components/index'
import { FaBars } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';

interface INavbarContainer { 
    toggle : ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void);
    toggleVisible : (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const NavbarContainer : React.FC<INavbarContainer> = ({ toggle, toggleVisible }) => {

    const [scrollNav, setScrollNav] = React.useState<boolean>(false);

    const changeNav = () => {
        if(window.scrollY >= 80){
            setScrollNav(true)
        }else{
            setScrollNav(false)
        }
    }
    
    React.useEffect(() => {
        window.addEventListener('scroll', changeNav)

        return  ()=>{
            window.removeEventListener('scroll', changeNav);
        }
    }, [])

    const gotoTop = () =>{
        scroll.scrollToTop();
    }

    return (
        <>
            <Navbar scrollNavFlag={scrollNav}>
                <Navbar.Container>
                    <Navbar.Logo to="" onClick={gotoTop}>Sagip</Navbar.Logo>
                    <Navbar.MobileIcon onClick={ toggle }>
                        <FaBars/>
                    </Navbar.MobileIcon>
                    <Navbar.Menu>
                        <Navbar.Item>
                            <Navbar.LinkScroll
                                to="howItWorks"
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact='true'
                                offset={-80}
                            >
                                How it Works
                            </Navbar.LinkScroll>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Navbar.LinkScroll
                                to="infoSection"
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact='true'
                                offset={-80}
                            >
                                Info Section
                            </Navbar.LinkScroll>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Navbar.LinkScroll
                                to="partners"
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact='true'
                                offset={-80}
                            >
                                Our Partners & Sponsors
                            </Navbar.LinkScroll>
                        </Navbar.Item>
                    </Navbar.Menu>
                    <Navbar.BtnNav>
                        <Navbar.BtnLink onClick={toggleVisible}>Log In</Navbar.BtnLink>
                    </Navbar.BtnNav>
                </Navbar.Container>
            </Navbar>
        </>
    )
}

export default NavbarContainer;
