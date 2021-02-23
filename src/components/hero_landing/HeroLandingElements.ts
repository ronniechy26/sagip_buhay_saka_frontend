import styled from 'styled-components/macro';
import { Link as LinkScroll} from 'react-scroll';
import {
    MdArrowForward,
    MdKeyboardArrowRight
} from 'react-icons/md';

import {media} from '../MediaQueries';

export const Container = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : center;
    width : 100%;
    height : 950px;
    text-align : center;
    align-items : center;
    z-index : 1;
    position : relative;
    
    :before{
        content : '';
        position : absolute;
        top: 0;
        left :0;
        right :0;
        bottom : 0;
        z-index : 2;
    }

    ${media.tablet}{
        justify-content : center;
    }

    ${media.phone}{
        justify-content : center;
    }
` 


export const ImgBg = styled.div`
    position : absolute;
    top : 0;
    right : 0;
    bottom : 0;
    left : 0;
    width : 100%;
    height : 100%;
    overflow : hidden;
`

export const Img : React.FC = styled.img`
    width : 100%;
    height : 100%;
    object-fit : cover;
`

export const LogoWrapper = styled.div`
    width: 600px;
    z-index : 3;
    display: block;
 
`
export const LogoImg : React.FC = styled.img`
    width : 70%;
    height : 80%;
    object-fit : fill;
    background-color: #519c2a;
    border-radius: 200px;
`

export const TextWrapper = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : left;
    align-items : left;
    width: 600px;
    z-index : 3;
    display: block;
`

export const Heading = styled.h1`
    margin-bottom : 8px;
    text-align : justify;
    font-size : 40px;
    line-height : 1.1;
    font-weight: 600;
    color : #f7f8f8;

    ${media.tablet}{
        font-size : 32px;
    }

    ${media.phone}{
        font-size : 24px;
    }
`

export const Divider = styled.div`
    border-bottom : 3px solid #fff;
    width : 150px;
    margin-bottom : 24px;

    ${media.phone}{
        border-bottom : 2px solid #fff;
        width : 80px;
        margin-bottom : 16px;
    }
`

export const Subtitle = styled.p`
    text-align : justify;
    max-width : 440px;
    margin-bottom : 35px;
    font-size : 20px;
    line-height : 24px;
    color : #fff;

    ${media.tablet}{
        max-width : 400px;
        margin-bottom : 28px;
        font-size : 14px;
        line-height : 20px;
    }

    ${media.phone}{
        max-width : 360px;
        margin-bottom : 22px;
        font-size : 13px;
        line-height : 16px;
    }
`

export const BtnWrap = styled.div`
    display : flex;
    justify-content : left;
    margin-left : 50px;
    align-items : center;

    ${media.tablet}{
       margin-left : 40px;
    }

    ${media.phone}{
        margin-left : 30px;
    }

`

export const LinkButton : React.FC = styled(LinkScroll)`
    border-radius : 50px;
    background : #006064;
    white-space : nowrap;
    padding : 16px 64px;
    color : #fff;
    font-size : 14px;
    font-weight: 700;
    border : none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration :  none;
    outline : none;
    display : flex;
    justify-content : center;
    align-items: center;
    transition : all 0.2s ease-in-out;

    ${media.tablet}{
        padding : 14px 56px;
        font-size : 12px;
    }

    ${media.phone}{
        padding : 12px 48px;
        font-size : 10px;
    }

    &:hover{
        transition: all 0.2s ease-in-out;
        background : #fff;
        color : #010606;
    }
`

export const ArrowForward : React.FC =  styled(MdArrowForward)`
    font-size : 20px;
    margin-left : 8px;

    ${media.phone}{
        font-size : 16px;
    }

`

export const ArrowRight : React.FC =  styled(MdKeyboardArrowRight)`
    font-size : 20px;
    margin-left : 8px;
   
    ${media.phone}{
        font-size : 16px;
    }
`