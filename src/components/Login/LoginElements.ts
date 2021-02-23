import styled from 'styled-components/macro';
import { Input, Button } from 'antd';
import { media } from '../MediaQueries';


export const Title = styled.h1`
    font-weight : 800;
    color : #006064;
    font-size : 32px;
    margin-bottom : 30px;

    ${media.tablet}{
        font-size : 24px;
    }

    ${media.phone}{
        font-size : 20px;
    }
`

export const Container = styled.div`
    display : flex;
    justify-content : space-around;
    align-items : center;
    flex-direction : row;
    flex-wrap : wrap;
    padding-top : 100px;
    padding-bottom : 100px;

    
    ${media.tablet}{
        padding-top : 70px;
        padding-bottom : 70px;
    }

    ${media.phone}{
        padding-top : 50px;
        padding-bottom : 50px;
    }
`

export const Column2 = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
`

export const Image = styled.img`
    max-width: 80%;
    height: 250px;

    ${media.phone}{
        display : none;
    }
`;

export const LoginInput = styled(Input)`
    font-family: 'Encode Sans Expanded';
    font-size : 24px;
    width : 100%;
    border-radius: 10px;

    ${media.tablet}{
        font-size : 20px;
    }

    ${media.phone}{
        font-size : 16px;
    }

`

export const LoginInputPassword = styled(Input.Password)`
    font-family: 'Encode Sans Expanded';
    font-size : 24px;
    width : 100%;
    border-radius: 10px;

    ${media.tablet}{
        font-size : 20px;
    }

    ${media.phone}{
        font-size : 16px;
    }

`

export const LoginButton : React.FC = styled(Button)`
    width: 100%;
    border-radius : 50px;
    background : #006064;
    white-space : nowrap;
    padding : 24px 64px;
    color : #fff;
    font-size : 18px;
    font-weight: 700;
    border : none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display : flex;
    justify-content : center;
    align-items: center;

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
        background : #519c2a;
        color : #fff;
    }

`