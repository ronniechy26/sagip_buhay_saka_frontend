import styled from 'styled-components/macro';
import {media} from '../MediaQueries';

export const Container = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
    align-items : center;
    width : 100%;
    height : auto;
    min-height : 100vh;
    background-color : #212529;
`

export const SectionTitle = styled.h1`
    font-size : 42px;
    color : #fff; 
    line-height: 1.1;
    margin-top : 50px;
    margin-bottom: 80px;

    ${media.tablet}{
        font-size : 32px;
    }

    ${media.phone}{
        font-size : 22px;
    }
`

export const Pane = styled.div`
    display : flex;
    flex-wrap : wrap;
    justify-content : space-around;
    align-content : space-around;
    align-items : center;
    width : 100%;
    gap: 30px;
    margin-bottom : 100px;
`

export const Card = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;

    background-color : #fff;
    border-radius : 30px;
    box-shadow: 3px 5px #006064;
    height : 370px;
    width : 370px;

    ${media.desktop}{
        height : 300px;
        width : 300px;
    }

    ${media.tablet}{
        height : 300px;
        width : 300px;
    }
`

export const CardTitle = styled.h2`
    font-size : 18px;
    color : #006064; 
    line-height: 1.1;

    ${media.desktop}{
        font-size : 16px;
    }

    ${media.tablet}{
        font-size : 14px;
    }

    ${media.phone}{
        font-size : 14px;
    }
`

export const ImgWrapper = styled.div`
    text-align : center;
    width: 300px;
    z-index : 3;
    display: block;
`

export const Image = styled.img`
    width : 70%;
    height : 80%;
    object-fit : fill;

`