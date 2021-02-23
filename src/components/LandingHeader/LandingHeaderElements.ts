import styled from 'styled-components/macro';
import {media} from '../MediaQueries';


export const Header = styled.div`
    background-color: #fff;
    min-height : 10vh;
    height : auto;
    width : auto;
    display : flex;
    justify-content : space-between;
    align-items : center;
    background-color : #fff;
    padding: 10px 40px;
    border-bottom: solid 2px #E5E5E5;
`

export const HeaderTitle = styled.h1`
    color : #676767;
    font-size : 24px;
    font-weight : 700;

    ${media.tablet}{
        font-size : 20px;
    }

    ${media.phone}{
        font-size : 16px;
    }
`

export const HeaderButtonWrapper = styled.div`
  .ant-btn.ant-btn-primary { 
    background: #006064;
    border-color: #006064;
    border-radius : 5px;
  
  }
  .ant-btn.ant-btn-primary:hover {
    background: #519c2a;
    border-color: #519c2a;
  }

`