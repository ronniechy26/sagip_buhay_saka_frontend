import styled from 'styled-components/macro';
import { FaTimes } from 'react-icons/fa';
import { Link as LinkScroll } from 'react-scroll';
import { media } from '../MediaQueries';

export const SidebarContainer = styled.aside<{isOpen : boolean}>`
    position : fixed;
    z-index : 999;
    width : 100%;
    height : 100%;
    background : #0d0d0d;
    display : grid;
    align-items : center;
    top : 0;
    left : 0;
    transition : 0.3s ease-in-out;
    opacity : ${({ isOpen }) => (isOpen ? '100%' : '0')};
    top : ${({isOpen}) => (isOpen ? '0' : '-100%')};
`

export const CloseIcon = styled(FaTimes)`
    color : #fff;

`
export const Icon = styled.div`
    position : absolute;
    top : 1.2rem;
    right : 1.5rem;
    background : transparent;
    font-size : 2rem;
    cursor: pointer;
    outline : none;
`

export const SidebarWrapper = styled.div`
    color : #fff;
`

export const SidebarLink : React.FC = styled(LinkScroll)`
    display : flex;
    align-items : center;
    justify-content : center;
    font-size : 1.5rem;
    text-decoration : none;
    list-style : none;
    transition : 0.2s ease-in-out;
    text-decoration : none;
    color : #fff;
    cursor: pointer;

    &:hover{
        color : #006064;
        transition : 0.2s ease-in-out;
    }
`

export const SidebarMenu = styled.ul `
    display : grid;
    grid-template-columns : 1fr;
    grid-template-rows : repeat(6, 10px);
    text-align : center;

    ${media.phone}{
        grid-template-rows : repeat(6, 10px);
    }
`  

export const SidebarBtnWrap = styled.div`
    display : flex;
    justify-content : center;
`

export const SidebarRoute : React.FC = styled.button`
    border-radius : 50px;
    background : #006064;
    white-space : nowrap;
    padding : 16px 64px;
    color : #fff;
    font-size : 16px;
    font-weight: 700;
    outline : none;
    border : none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration :  none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background : #fff;
        color : #010606;
    }

`