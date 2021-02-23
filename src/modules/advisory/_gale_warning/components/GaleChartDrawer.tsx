import React from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components/macro';
import GaleChart from '../../../../Images/gale_warning_chart.jpg';

interface IProps {
    visible : boolean;
    onClose : () => void;
}

const GaleChartDrawer  : React.FC<IProps> = ({ visible,  onClose, }) => {
    return (
        <StyledDrawer
            title={<TitleSpan>{`Gale Warning Chart`}</TitleSpan>}
            width={'50%'}
            onClose={onClose}
            visible={visible}
            destroyOnClose={true}
            maskClosable={false}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <StyledImg alt="galechart" src={GaleChart} />
        </StyledDrawer>
    )
}

export default GaleChartDrawer

const TitleSpan = styled.span`
    font-size : 18px;
    font-weight : 700;
    color : #fff;
`
const StyledDrawer = styled(Drawer)`
    .ant-drawer-header { 
        background :rgb(0, 152, 159);
    }
    .anticon.anticon-close {
        color : #fff;
        font-size : 18px;
    }
`

const StyledImg = styled.img`
    max-width: 100%;
    height: 500px;
    object-fit : scale-down
`