import styled from "styled-components/macro";

export const ActionButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;

  .anticon.anticon-edit {
    color: gray;
    opacity: 0.7;
    font-size: 16px;
  }

  .anticon.anticon-edit:hover {
    color: #006064;
  }

  .anticon.anticon-check {
    color: rgba(146, 230, 136, 1);
    font-size: 16px;
  }

  .anticon.anticon-check:hover {
    color: #006064;
  }

  .anticon.anticon-close {
    color: red;
    font-size: 16px;
  }

  .anticon.anticon-close:hover {
    color: #006064;
  }

  .anticon.anticon-delete {
    color: gray;
    font-size: 16px;
  }

  .anticon.anticon-delete:hover {
    color: #006064;
  }

  .anticon.anticon-credit-card {
    color: gray;
    font-size: 16px;
  }

  .anticon.anticon-credit-card:hover {
    color: #006064;
  }

  .anticon.anticon-user-switch {
    color: gray;
    font-size: 16px;
  }

  .anticon.anticon-user-switch:hover {
    color: #006064;
  }
`;

export const BackButtonWrapper = styled.div`
  .ant-btn {
    border-radius: 30px;
    color: #006064;
    font-weight: 700;
    border: 1px solid #006064;
  }

  .ant-btn:hover {
    background: #519c2a;
    border-color: #519c2a;
    color: #fff;
  }
`;
