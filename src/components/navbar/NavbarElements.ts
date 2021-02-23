import React from 'react'
import styled from 'styled-components/macro';
import { Link as LinkScroll } from 'react-scroll';
import { media } from '../MediaQueries';

export const Nav = styled.nav<{scrollNav : boolean}>`
    background : ${({scrollNav}) => (scrollNav ? '#006064' : 'transparent') };
    height : 80px;
    margin-top : -80px;
    display : flex;
    justify-content : space-between;
    align-items : center;
    font-size : 1rem;
    position : sticky;
    top : 0;
    z-index: 20;
    
    ${media.desktop}{
        transition : 0.8s all ease;
    }
`

export const NavbarContainer = styled.div`
    display :flex;
    justify-content : space-between;
    height : 1;
    z-index : 1;
    width : 100%;
    padding : 0 32px;
    max-width : 1890px;
`;

export const NavLogo : React.FC = styled(LinkScroll)`
    color :#fff;
    justify-self : flex-start;
    cursor: pointer; 
    font-size : 1.5rem;
    display : flex;
    align-items : center;
    margin-left : 24px;
    font-weight : bold;
    text-decoration : none;

    &:hover{
        color : #519c2a;
    }
`;

export const MobileIcon = styled.div`
    display : none;

    ${media.tablet}{
        display : block;
        position : absolute;
        top: 0;
        right: 0;
        transform : translate(-100%, 60%);
        font-size : 1.8rem;
        cursor: pointer;
        color : #fff;
    }
`

export const NavMenu = styled.ul`
    display : flex;
    align-items : center;
    list-style : none;
    text-align : center;
    margin-right : -22px;

    ${media.tablet}{
        display : none;
    }
`

export const NavItem = styled.li`
    height : 80px;
`

export const NavLinkScroll : React.FC = styled(LinkScroll)`  
    color : #fff;
    display :flex;
    align-items : center;
    text-decoration : none;
    padding : 0 1rem;
    height : 100%;
    cursor: pointer;

    &.active{
        border-bottom : 5px solid #519c2a;
    }

    &:hover{
        color : #519c2a;
        border-bottom : 3px solid #519c2a;
    }

`

export const NavBtn = styled.nav`
    display : flex;
    align-items : center;

    @media screen and (max-width : 768px){
        display : none;
    }
`

export const NavBtnLink : React.FC = styled.button`
    border-radius : 50px;
    background : #519c2a;
    white-space : nowrap;
    padding : 10px 22px;
    color : #fff;
    font-size : 16px;
    font-weight: 700;
    outline : none;
    border : #fff;
    cursor : pointer;
    transition : all 0.2s ease-in-out;
    text-decoration :  none;

    &:hover {
        transition : all 0.2s ease-in-out;
        background : #fff;
        color : #006064;
    }

`