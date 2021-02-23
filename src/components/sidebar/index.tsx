import React from 'react'
import { 
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SidebarBtnWrap,
    SidebarRoute,
} from './SidebarElements';

interface IOnClick  {
    onClick : ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void);
}

interface IScroll extends IOnClick{
    to : string;
    smooth: boolean;
    duration: number;
    spy: boolean;
    exact : string;
    offset: number;
} 

interface ISidebarComposition {
    Icon : React.FC<IOnClick>;
    CloseIcon : React.FC;
    Wrapper : React.FC;
    Menu : React.FC;
    LinkScroll : React.FC<IScroll>;
    BtnWrap : React.FC;
    LinkRoute : React.FC<{onClick : (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void}>;
}

interface ISidebar extends IOnClick{
    isOpen :  boolean;
}

const Sidebar : React.FC<ISidebar> & ISidebarComposition = ({children, isOpen, ...restProps}) => {
    return (
        <SidebarContainer isOpen={isOpen} {...restProps}>
            {children}
        </SidebarContainer>
    )
}

export default Sidebar

Sidebar.Icon = ({children,...restProps}) =>{
    return <Icon {...restProps}>{children}</Icon>
}

Sidebar.CloseIcon = ({children,...restProps}) =>{
    return <CloseIcon {...restProps}>{children}</CloseIcon>
}

Sidebar.Wrapper = ({children,...restProps}) =>{
    return <SidebarWrapper {...restProps}>{children}</SidebarWrapper>
}

Sidebar.Menu = ({children,...restProps}) =>{
    return <SidebarMenu {...restProps}>{children}</SidebarMenu>
}

Sidebar.LinkScroll = ({children,...restProps}) =>{
    return <SidebarLink {...restProps}>{children}</SidebarLink>
}

Sidebar.BtnWrap = ({children,...restProps}) =>{
    return <SidebarBtnWrap {...restProps}>{children}</SidebarBtnWrap>
}

Sidebar.LinkRoute = ({children,...restProps}) =>{
    return <SidebarRoute {...restProps}>{children}</SidebarRoute>
}