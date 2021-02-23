import React from 'react'
import {Drawer} from 'antd';
import styled from 'styled-components/macro';

interface IProps {
    visible : boolean;
    onClose : () => void;
}

const SeasonalDrawer : React.FC<IProps> = ({visible, onClose}) => {
    return (
        <StyledDrawer
            title={<TitleSpan>{`ENSO Forecast Reference`}</TitleSpan>}
            width={'50%'}
            onClose={onClose}
            visible={visible}
            destroyOnClose={true}
            maskClosable={false}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <LabelSpan>
                Based on PAGASA’s Memorandum Order No. 38, s. of 2019, the PAGASA ENSO Alert and Warning System 
                is hereby adopted to provide guidance in the preparation of sectoral contingency plans which will 
                serve as basis for actions before, during and after El Nino. 
            </LabelSpan>
            <LabelDiv marginTop="20px" >
               <u>Definition of Terms</u>
            </LabelDiv>
            <LabelSpan color="#006064">
                <b><u>Sea Surface Temperature Anomaly (SSTA)  </u></b> -
            </LabelSpan>
            <LabelSpan2>
                defined as the departure from the average sea surface temperature (SST) 
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>Nino 3.4 region </u></b> -
            </LabelSpan>
            <LabelSpan2>
                refers to the central and eastern equatorial Pacific (CEEP); 5"N-5'S, 120'-170"W 
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>Oceanic Nino lndex (ONI)* </u></b> -
            </LabelSpan>
            <LabelSpan2>
                defined as the 3-month running-mean average SST departures in the Nino 3.4 region based on a set 
                of improved homogeneous historical SST analyses [i.e., Extended Reconstructed SST - ERSST.v4 (Huang 
                et al. 2015, J. Climate)l; based on a threshold of +/- 0.5C for the 3-month running mean SSTAs in the
                Nino 3.4 region centered on 3O-year base periods updated every 5 years
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>El Nino </u></b> -
            </LabelSpan>
            <LabelSpan2>
                characterized by a positive ONI greater than or equal to +0.5 C 
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>La Nina</u></b> -
            </LabelSpan>
            <LabelSpan2>
                characterized by a negative ONI less than or equal to -0.5 C
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>El Nino Condition* </u></b> -
            </LabelSpan>
            <LabelSpan2>
                A one-month positive SSTA of 0.5'C or greater is observed in the Nino-3.4 region and an expectation that 
                the 3-month ONI threshold of 0.5'C or greater will be met (i.e, 3 overlapping 3-months; example: JFM, FMA, MAM).
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>El Nino Episode/Event </u></b> -
            </LabelSpan>
            <LabelSpan2>
                a minimum of 5 consecutive 3 overlapping months with ONI values of 0.5.C or greater is observed (i.e., 5 overlapping 3- months; 
                example:JFM,FMA,MAM,AMJ,MJJ) 
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>La Nina condition </u></b> -
            </LabelSpan>
            <LabelSpan2>
                A one-month SSTA of -0.5'C or less is observed in the Nino-3.4 region and an expectation that the 3-month ONI threshold of -0.5'C or 
                less will be met (i.e, 3 overlapping 3- months; example: JFM,FMA,MAM) 
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>La Nina Episode/Event </u></b> -
            </LabelSpan>
            <LabelSpan2>
                a minimum of 5 consecutive 3 overlapping months with ONI values of - 0.5'C or lower is observed (i.e., 5 overlapping 3- months; example:
                JFM,FMA,MAM,AMJ,MX)
            </LabelSpan2>
            <br/>
            <br/>
            <LabelSpan>
                <b><u>Types of Alert </u></b>
            </LabelSpan>
            <LabelDiv marginTop="20px" >
               <u>During an El Nino</u>
            </LabelDiv>
            <br/>
            <LabelSpan color="#006064">
                <b><u>El Nino Watch </u></b> -
            </LabelSpan>
            <LabelSpan2>
                lssued when conditions are favorable for the development of El Nino within the next six months and probability is 55% or more. 
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>EI Nino Alert </u></b> -
            </LabelSpan>
            <LabelSpan2>
                an upgrade from El Nino Watch; issued when ONI of +0.5.C or greater is forecasted to persist in the next 2 months or more and EI Nino
                is likely/probable by 70% or more*+ (to satisfy 5 ONI). 
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>El Nino Advisory  </u></b> -
            </LabelSpan>
            <LabelSpan2>
                an upgrade from El Nino Alert. lssued whenever El Nino is currently on-going and the 3-month Oceanic Nino lndex (ONI) threshold is 
                expected to persist during the forecast period. 
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>Final El Nino Advisory</u></b> -
            </LabelSpan>
            <LabelSpan2>
                issued whenever an ONI value is between  (0.5C to) -0.5"c or Neutral. 
            </LabelSpan2>
            <br/>
            <LabelDiv marginTop="20px" >
               <u>During a La Nina </u>
            </LabelDiv>
            <br/>
            <LabelSpan color="#006064">
                <b><u>La Nina Watch </u></b> -
            </LabelSpan>
            <LabelSpan2>
                issued when climate favours development of La Nina conditions within the next six months and probability is 55% or more.  
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>La Nina Alert  </u></b> -
            </LabelSpan>
            <LabelSpan2>
                an upgrade from La Nina Watch; issued when ONI of -0.5"C or less is forecasted to persist in the next 2 months or more and
                La Nina is likely/probable by 70% or more** (to satisfy 5 ONI).  
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>La Nina Advisory </u></b> -
            </LabelSpan>
            <LabelSpan2>
                an upgrade from La Nina Alert. Issued whenever a La Nina is currently on-going and the 3-month oceanic Nino lndex (ONl) 
                threshold is expected to persist during the forecast period.
            </LabelSpan2>
            <br/>
            <LabelSpan color="#006064">
                <b><u>Final La Nina Advisory </u></b> -
            </LabelSpan>
            <LabelSpan2>
                issued whenever an ONI value is between (0.5C to ) -0.5C or Neutral
            </LabelSpan2>
        </StyledDrawer>
    )
}

export default SeasonalDrawer

const TitleSpan = styled.span`
    font-size : 18px;
    font-weight : 700;
    color : #fff;
`
const LabelSpan = styled.span<{color? : string}>`
    font-size : 16px;
    font-weight : 700;
    color :  ${({color}) => color ?? 'gray' };
`
const LabelSpan2 = styled.span`
    font-size : 13px;
    font-weight : 700;
    color : gray;
`

const LabelDiv = styled.div<{marginTop? : string}>`
    font-size : 16px;
    font-weight : 700;
    color : gray;
    margin-top : ${({marginTop}) => marginTop ?? 0 };
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