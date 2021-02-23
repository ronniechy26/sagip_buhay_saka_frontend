import styled from 'styled-components/macro';
import { media } from '../MediaQueries';

export const TableWrapper = styled.div`
    .ant-table-content  {
        padding: 0px 0px 0px 0px;
    }
    .ant-table-thead > tr > th  {
        color: gray;
        background: #fff;
        font-size: 15px;
        font-weight: bold;
        color: '#838383';
        border-bottom: 1px solid #006064;
    }
    .ant-table-tbody > tr > td {
        color: #363739;
        font-size: 14px;
        font-family: 'Montserrat';
        font-weight : 500;
    }
    .ant-table .ant-table-tbody > tr:hover > td  {
      background-color: #DCEBD4;
    }

    .ant-pagination.ant-table-pagination  {
      margin-right: 30px;
    }
`

export const TableHeader = styled.div`
    display : flex;
    justify-content : space-between;
    align-items : center;
    flex-wrap : wrap;
    height : auto;
    min-height : 10vh;
`

export const TableHeaderTitle = styled.h1`
    color : #9BA9C0;
    font-weight : 500;
    font-size : 18px;

    ${media.tablet}{
        font-size : 14px;
    }

    ${media.phone}{
        font-size : 12px;
    }

`

export const TableCount = styled.span`
    color : #006064;
    font-weight : 900;
    font-size : 18px;
    margin-left : 10px;

    ${media.tablet}{
        font-size : 14px;
    }

    ${media.phone}{
        font-size : 12px;
    }
`

export const TableButtonWrapper = styled.div`
  .ant-btn-primary { 
    background: #006064;
    border-color: #006064;
    border-radius : 5px;
  
  }
  .ant-btn:hover {
    background: #519c2a;
    border-color: #519c2a;
  }

`