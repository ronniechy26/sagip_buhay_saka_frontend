import styled from 'styled-components/macro';

export const SpanAddLivelihood = styled.span`
    cursor: pointer;
    color : #2E76CF;
    font-weight : 700;

    &:hover {
        color : #006064;
        font-weight : 700;
    }
`

export const HeaderDiv = styled.div`
    display : flex;
    justify-content : space-between;
    align-items : flex-start;
    margin-bottom : 10px;
`

export const SpanItalic = styled.span`
    font-style : italic;
    color: gray;
    font-size: 14px;
    font-family: 'Montserrat';
`

export const CharCount = styled.span<{count : number}>`
    font-style : italic;
    color: ${({count}) => (count > 160 ? 'red' : 'gray') };
    font-size: 14px;
    font-family: 'Montserrat';
`