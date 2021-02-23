import React from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components/macro';
import RainfallEmergency from '../../../../Images/rainfall_emergency.png';
import FloodEmergency from '../../../../Images/flood_emergency.png';
import Cyclone1 from '../../../../Images/cyclone1.png';
import Cyclone2 from '../../../../Images/cyclone2.png';
import Cyclone3 from '../../../../Images/cyclone3.png';

interface IProps {
    visible : boolean;
    onClose : () => void;
}


const EmergencyDrawer : React.FC<IProps>= ({  visible , onClose}) => {
    return (
        <StyledDrawer
            title={<TitleSpan>{`Emergency Reference `}</TitleSpan>}
            width={'50%'}
            onClose={onClose}
            visible={visible}
            destroyOnClose={true}
            maskClosable={false}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <div>
                <LabelSpan>Rainfall Warning Guideline (Source: PAGASA)</LabelSpan>
                <StyledImg objFit= "scale-down" height="400px" alt="RainfallEmergency" src={RainfallEmergency} />
            </div>
            
            <div>
                <LabelSpan>Tropical Cyclone Warning Guideline (Source: PAGASA)</LabelSpan>
                <StyledImg objFit= "fill" height="400px" alt="Cyclone1" src={Cyclone1} style={{width : '80%'}} />
                <StyledImg objFit= "fill" height="400px" alt="Cyclone2" src={Cyclone2} style={{width : '80%'}} />
                <StyledImg objFit= "fill"  height="400px" alt="Cyclone3" src={Cyclone3} style={{width : '80%'}} />
            </div>
            
            <div>
                <LabelSpan>Flood Advisory (Source: PAGASA)</LabelSpan>
                <StyledImg objFit="scale-down" height="300px" alt="FloodEmergency" src={FloodEmergency} />
            </div>
           
    </StyledDrawer>
    )
}

export default EmergencyDrawer

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

const StyledImg = styled.img<{height : string; objFit : string}>`
    max-width: 100%;
    height: ${({height}) => height };
    object-fit : ${({objFit}) => objFit };
`

const LabelSpan = styled.span`
    font-size : 18px;
    font-weight : 700;
    color : gray;
`