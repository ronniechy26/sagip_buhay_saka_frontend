import React from 'react'
import { Sidebar } from '../../components/index'

interface ISidebarContainer {
    isOpen : boolean;
    toggle : ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    toggleVisible : (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const SidebarContainer : React.FC<ISidebarContainer> = ({toggle, isOpen, toggleVisible}) => {
    return (
        <Sidebar isOpen={isOpen} onClick={toggle}>
            <Sidebar.Icon onClick={toggle}>
                <Sidebar.CloseIcon/>
            </Sidebar.Icon>
            <Sidebar.Wrapper>
                <Sidebar.Menu>
                    <Sidebar.LinkScroll
                        to="howItWorks" 
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        onClick={toggle}
                    > 
                        How it Works
                    </Sidebar.LinkScroll>
                </Sidebar.Menu>
                <Sidebar.Menu>
                    <Sidebar.LinkScroll
                        to="infoSection" 
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        onClick={toggle}
                    > 
                        Info Section
                    </Sidebar.LinkScroll>
                </Sidebar.Menu>
                <Sidebar.Menu>
                    <Sidebar.LinkScroll 
                        to="partners" 
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        onClick={toggle}
                    > 
                        Our Partners & Sponsors
                    </Sidebar.LinkScroll>
                </Sidebar.Menu>
                <Sidebar.BtnWrap>
                    <Sidebar.LinkRoute onClick={toggleVisible}>
                        Log in
                    </Sidebar.LinkRoute>
                </Sidebar.BtnWrap>
            </Sidebar.Wrapper>
        </Sidebar>
    )
}

export default SidebarContainer;