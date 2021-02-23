import styled from 'styled-components';

export const Container = styled.div`
    min-height : 900px;
    display :flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    background : #010606;
    height : auto;
`

export const Wrapper = styled.div`
    /* max-width : 1000px; */
    margin : 0 auto;
    display : grid;
    grid-template-columns : 1fr 1fr 1fr;
    align-items : center;
    grid-gap : 16px;
    padding : 0 10px;

    @media screen and (max-width : 1000px){
        grid-template-columns : 1fr 1fr;
    }

    @media screen and (max-width : 768px){
        grid-template-columns : 1fr;
        padding : 0 20px;
    }
`

export const Card= styled.div`
    background : #fff;
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
    align-items : center;
    border-radius : 10px;
    width : 400px;
    height : 600px;
    padding : 50px 30px 30px 30px;
    box-shadow : 0 1px 3px rgba(0,0,0,0.2);
    transition : all 0.2s ease-in-out;
    margin-bottom : 20px;

    &:hover{
        transform : scale(1.02);
        transition : all 0.2s ease-in-out;
        cursor: pointer;
    }
`

export const Icon = styled.img`
    height : 160px;
    width : 160px;
    margin-bottom : 10px;
`

export const H1 = styled.h1`
    font-size : 2.5rem;
    color : #fff;
    margin-bottom : 64px;
    font-weight : bold;

    @media screen and (max-width : 480px){
        font-size : 2rem;
    }
`
export const H2 = styled.h2`
    font-size : 1rem;
    margin-bottom : 10px;
    font-weight : bold;
`

export const P = styled.p`
    font-size : 13px;
    text-align : center;
    text-align : justify;
    
    @media screen and (max-width : 480px){
        font-size : 0.7rem;
    }
`