import React from 'react';
import { 
    Nav, 
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavItem,
    NavMenu,
    NavLinkScroll,
    NavBtn,
    NavBtnLink
} from './NavbarElements';

interface IScroll {
    to : string;
    smooth: boolean;
    duration: number;
    spy: boolean;
    exact : string;
    offset: number;
}
interface INavbarComposition {
    Container : React.FC;
    MobileIcon : React.FC<{onClick : ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)}>;
    Item : React.FC;
    Menu : React.FC;
    LinkScroll : React.FC<IScroll>;
    Logo :  React.FC<{to:string ; onClick : () => void}>;
    BtnNav : React.FC;
    BtnLink :  React.FC<{onClick : (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void}>;
}

const Navbar : React.FC<{scrollNavFlag : boolean}> & INavbarComposition = ({children,scrollNavFlag,...restProps}) => {
    return (
        <Nav scrollNav={scrollNavFlag} {...restProps}>
            {children}
        </Nav>
    )
}
export default Navbar;

Navbar.Container = ({children,...restProps}) =>{
    return <NavbarContainer {...restProps} >
        {children}
    </NavbarContainer>
}

Navbar.MobileIcon = ({children,...restProps}) =>{
    return <MobileIcon {...restProps}>{children}</MobileIcon>
}

Navbar.Item = ({children,...restProps}) =>{
    return <NavItem {...restProps}>{children}</NavItem>
}

Navbar.Menu = ({children,...restProps}) =>{
    return <NavMenu {...restProps}>{children}</NavMenu>
}

Navbar.Logo = ({children,...restProps}) => {
    return <NavLogo {...restProps}>{children}</NavLogo>
};

Navbar.LinkScroll = ({children,...restProps}) =>{
    return <NavLinkScroll {...restProps}>{children}</NavLinkScroll>
}

Navbar.BtnNav = ({children,...restProps}) =>{
    return <NavBtn {...restProps}>{children}</NavBtn>
}

Navbar.BtnLink = ({children, ...restProps }) =>{
    return <NavBtnLink {...restProps}>{children}</NavBtnLink>
}