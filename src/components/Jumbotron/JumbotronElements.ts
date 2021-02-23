import styled from 'styled-components/macro';

export const Item = styled.div`
    display: flex;
    border-bottom: 3px solid #006064;
    padding: 50px 5%;
    color: white;
    overflow: hidden;
    height : auto;
`;

export const Container = styled.div`
    height : auto;
    width: 100%;
    background-color : #dddddd;
`;

export const Inner = styled.div<{direction : string}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: ${({ direction }) => direction};

    @media (max-width: 1000px) {
        flex-direction: column;
    }
` 

export const SectionTitle = styled.h1`
    color : #006064;

`

export const Pane = styled.div`
    width: 50%;
    margin-right : 30px;
    margin-bottom : 30px;

    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 45px;
        text-align: center;
    }
`;

export const Title = styled.h1`
    font-size: 24px;
    line-height: 1.1;
    margin-bottom: 8px;
    color : #006064;

    @media (max-width: 600px) {
        font-size: 20px;
    }
`;

export const SubTitle = styled.h2`
    font-size: 18px;
    font-weight: normal;
    line-height: normal;
    color : #006064;
    text-align : justify;

    @media (max-width: 600px) {
        font-size: 14px;
    }
`;


export const Image = styled.img`
    max-width: 100%;
    height: 400px;
`;

