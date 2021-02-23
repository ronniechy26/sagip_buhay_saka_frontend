import styled from 'styled-components/macro';
import { media } from '../MediaQueries';

export const Container = styled.div`
    overflow-y: auto;
    max-height: calc(100vh - 70px);
`

export const Card = styled.div<{minHeight? : string}>`
    background-color: #fff;
    margin: 10px 20px;
    padding: 20px 30px 10px 50px;
    box-shadow: 0px -1px 0 0 #e8e8e8 inset;
    border-radius: 8px;
    height: auto;
    min-height: ${({minHeight}) => (minHeight ? minHeight : '90vh') };
`

export const Header =  styled.div`
    display : flex;
    justify-content : space-between;
    align-items : center;
    flex-wrap : wrap;
    height : auto;
    min-height : 10vh;
`

export const HeaderTitle = styled.h1`
    color : #006064;
    font-weight : 900;
    font-size : 26px;

    ${media.tablet}{
        font-size : 20px;
    }

    ${media.phone}{
        font-size : 16px;
    }

`
export const HeaderTitle2 = styled.h1`
    color : #006064;
    font-weight : 900;
    font-size : 22px;

    ${media.tablet}{
        font-size : 18px;
    }

    ${media.phone}{
        font-size : 16px;
    }

`

export const HeaderTitleValue = styled.span`
    color : #006064;
    font-family: 'Montserrat';
    font-weight : 500;
    font-size : 18px;

    ${media.tablet}{
        font-size : 16px;
    }

    ${media.phone}{
        font-size : 14px;
    }

`

export const HeaderTitleLabel = styled.span`
    color : gray;
    font-family: 'Montserrat';
    font-weight : 500;
    font-size : 16px;
    margin-right : 10px;

    ${media.tablet}{
        font-size : 14px;
    }

    ${media.phone}{
        font-size : 14px;
    }

`