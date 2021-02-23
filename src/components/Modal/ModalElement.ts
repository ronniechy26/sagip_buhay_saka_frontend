import styled from 'styled-components/macro';
import { media } from '../MediaQueries';

export const ModalContainer = styled.div`
    display : flex;
    justify-content : space-around;
    align-items : center;
    flex-direction : row;
    flex-wrap : wrap;
    padding-top : 40px;
    padding-bottom : 40px;

    ${media.tablet}{
        padding-top : 25px;
        padding-bottom : 25px;
    }

    ${media.phone}{
        padding-top : 15px;
        padding-bottom : 15px;
    }
    .ant-input {
        border-radius : 5px;
    }

`

export const Column = styled.div`
    display : flex;
    justify-content : center;
    flex-direction : column;
    width : 50%;

    ${media.tablet}{
        width : 100%;
    }
    ${media.phone}{
        width : 100%;
    }

`

export const Image = styled.img`
    max-width: 80%;
    height: 250px;

    ${media.tablet}{
        display : none;
    }
    ${media.phone}{
        display : none;
    }
`;

export const Title = styled.h1`
    font-weight : 800;
    color : #006064;
    font-size : 24px;
    margin-bottom : 15px;

    ${media.tablet}{
        font-size : 20px;
    }

    ${media.phone}{
        font-size : 18px;
    }
`

export const Label = styled.h1`
    color: gray;
    font-size: 16px;
    font-family: 'Montserrat';
    font-weight : 500;

    ${media.tablet}{
        font-size : 12px;
    }

    ${media.phone}{
        font-size : 12px;
    }
`