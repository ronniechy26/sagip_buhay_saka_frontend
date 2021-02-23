import styled from 'styled-components/macro';

export const Wrapper = styled.div<{statusColor:string}>`
    .ant-badge-status-dot {
        height: 10px;
        width : 10px;
        top: -2px;
    }

    .ant-badge-status-text {
        color: ${({statusColor}) => (statusColor ? statusColor : '#000') };
    }

    .ant-badge-status-dot.ant-badge-status-green  {
        border: 1px solid orange;
        color: red;
    }
`