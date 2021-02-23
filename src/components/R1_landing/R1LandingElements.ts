import styled from 'styled-components/macro';
import {media} from '../MediaQueries';

export const Container = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-around;
    align-items : center;
    flex-wrap : wrap;
    width : 100%;
    min-height : 900px;
    height : auto;
    text-align : center;
    background-color : #fff;
` 

export const Pane = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`


export const ImgWrapper = styled.div`
    width: 480px;
    z-index : 3;
    display: block;
    margin-bottom : 10px;

     ${media.tablet}{
        width: 400px;
    }

    ${media.phone}{
        width: 300px;
    }
`

export const Title = styled.h1`
    font-size : 36px;
    line-height : 1.1;
    font-weight: 600;
    color : #000;

    ${media.tablet}{
        font-size : 30px;
    }

    ${media.phone}{
        font-size : 22px;
    }
`