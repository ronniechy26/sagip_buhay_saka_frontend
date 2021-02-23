import styled from 'styled-components/macro';
import {media} from '../MediaQueries';

export const PaneDiv= styled.div`
    margin-top : 10px;
    display : flex;
    justify-content: space-between;
    height : auto;
    background-color : #fff;
`

export const Column1 =  styled.div`
    width : 50%;
    height : auto;
    
`

export const Column2=  styled.div`
    width : 50%;
    height : auto;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    justify-items : center;
    
`

export const Image = styled.img`
    max-width: 80%;
    height: 350px;

    ${media.custom((1200))}{
        display : none;
    }
    ${media.tablet}{
        display : none;
    }
    ${media.phone}{
        display : none;
    }
`;