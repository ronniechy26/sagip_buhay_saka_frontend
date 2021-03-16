import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import Rainfall from './rain_fall/index';
import MinTemp from './min_temp/index';

import { IState } from '../../ducks';
import { asyncActions } from '../../ducks/DashboardDucks';
import { getDashboardStatus } from '../../selectors/DashboardSelectors';
import { IDashboardRainfall } from '../../models/DashboardModel';


type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Board : React.FC<IProps> = ({ 
    rainfall, 
    status, 
    get_dashboard_rainfall 
}) => {

    useEffect(() => {
        get_dashboard_rainfall();
    }, [get_dashboard_rainfall])

    return (
        <Fragment>
            <div style={scrollDiv}>
                <Rainfall 
                    status={status} 
                    data={ rainfall as IDashboardRainfall[] }
                />  
                <MinTemp/>  
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    rainfall : state.DashboardReducer.rainfall,
    status : getDashboardStatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            get_dashboard_rainfall : asyncActions.get_dashboard_rainfall
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Board);

const scrollDiv : React.CSSProperties = {
    overflowY: 'auto', 
    maxHeight: 'calc(100vh - 100px)',
    boxSizing: "border-box"
}