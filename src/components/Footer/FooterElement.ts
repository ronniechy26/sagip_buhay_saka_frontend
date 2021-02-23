import styled from 'styled-components/macro';

export const Container = styled.div`
    height : auto;
    min-height : 150px;
    width: 100%;
    background-color : #006064;
    padding-top : 30px;
`;

export const Pane = styled.div`
    display : flex;
    justify-content : space-between;
    align-items : center;
    align-content : center;
    margin : 0px 60px 0 60px;

    @media screen and  (max-width : 820px){
        flex-direction : column;
    }

`

export const Logo = styled.div`
    color : #fff;
    justify-content : start;
    cursor: pointer;
    text-decoration : none;
    font-size: 1.5rem;
    display :flex;
    align-items : center;
    margin-bottom : 16px;
    font-weight : bold;

`

export const WebsiteRights = styled.small`
    color : #fff;
    margin-bottom : 16px;
`


export const TermAndCondition = styled.a`
    color : #fff;
    font-size : 20px;
    margin-bottom : 30px;
`