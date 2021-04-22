import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Select } from 'antd';
import Icon from '@ant-design/icons';

import Rainfall from './rain_fall/index';
import MinTemp from './min_temp/index';

import { IState } from '../../ducks';
import { asyncActions } from '../../ducks/DashboardDucks';
import { asyncActions as UserAsyncActions} from '../../ducks/UserDuck';
import { getDashboardStatus } from '../../selectors/DashboardSelectors';
import { IDashboardRainfall } from '../../models/DashboardModel';
import { IUser } from '../../models/UserModel';


type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Board : React.FC<IProps> = ({ 
    rainfall, 
    min_temp,
    mean_temp,
    max_temp,
    status, 
    get_dashboard_rainfall,
    get_dashboard_max_temp,
    get_dashboard_mean_temp,
    get_dashboard_min_temp,
    get_all_user,
    user,
    users 
}) => {

    const [selectedId, setSelectedId] = useState<number>(1);

    useEffect(() => {
        get_all_user({});
    }, [get_all_user])
    
    useEffect(() => {
        if(user && user.role === 'LGU' && user.id){
            call(parseInt(user?.id ?? 1));
        }
        if(selectedId && user && user.role === 'R1'){
            call(selectedId);
        }
        function call(id){
            get_dashboard_rainfall(id);
            get_dashboard_max_temp(id);
            get_dashboard_mean_temp(id);
            get_dashboard_min_temp(id);
        }
    },[
        get_dashboard_rainfall, 
        get_dashboard_max_temp,
        get_dashboard_mean_temp,
        get_dashboard_min_temp,
        user,
        selectedId
    ]);
    
    return (
        <Fragment>
            <div style={scrollDiv}>
                <div style={{margin : '10px 20px'}} > 
                    <div style={{display : 'flex', justifyContent: 'space-between'}}>
                        <div style={{display : 'flex', textAlign : 'center', justifyContent : 'space-between'}}>
                            <span>
                                <Icon component={maleSvg} style={{textAlign: 'center', marginRight : '10px'}}/> 
                            </span>
                            <span style={welcomeStyle}>{`Welcome ${user?.first_name ?? '' }!`}</span>
                        </div>
                        <div>
                            {
                               user && user.role === 'R1' ? 
                               (
                                    <Select
                                        style={{width : '250px'}}
                                        onChange={(val) =>{
                                            setSelectedId(val as number);
                                        }}
                                    >
                                        {
                                        users && users.filter(x => x.role === 'LGU').map((item : IUser, index) => {
                                                return (
                                                    <Select.Option value={parseInt(item.id)} key={item.id}>
                                                        {`${item.first_name} ${item.last_name}`}
                                                    </Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                               ) 
                               : 
                               '' 
                            }
                        </div>
                    </div>
                </div>
                <Rainfall 
                    status={status} 
                    data={ rainfall as IDashboardRainfall[] }
                />  
                <MinTemp
                    status={status}
                    data={ min_temp as IDashboardRainfall[] }
                />  
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    rainfall : state.DashboardReducer.rainfall,
    min_temp : state.DashboardReducer.min_temp,
    mean_temp : state.DashboardReducer.mean_temp,
    max_temp : state.DashboardReducer.max_temp,
    status : getDashboardStatus(state),
    user : state.UserReducer.data,
    users : state.UserReducer.list
    
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            get_dashboard_rainfall : asyncActions.get_dashboard_rainfall,
            get_dashboard_min_temp : asyncActions.get_dashboard_min_temp,
            get_dashboard_mean_temp : asyncActions.get_dashboard_mean_temp,
            get_dashboard_max_temp : asyncActions.get_dashboard_max_temp,
            get_all_user : UserAsyncActions.fetch_users
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Board);

const scrollDiv : React.CSSProperties = {
    overflowY: 'auto', 
    maxHeight: 'calc(100vh - 100px)',
    boxSizing: "border-box"
}

const welcomeStyle :  React.CSSProperties = {
    fontSize : '18px',
    fontWeight: 'bold',
    letterSpacing: "0.58px",
    color: "#676767",
    opacity: 1,
}

const maleSvg = () =>(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.87 29.88" width="30px" height="30px">
        <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
        <g id="Group_3886" data-name="Group 3886">
        <g id="Path_2655" data-name="Path 2655">
            <path d="M21,1.31l-.11,0-.1-.07A1.06,1.06,0,0,1,21,1.31Z" fill="#676767"/>
        </g>
        <g id="Path_2656" data-name="Path 2656">
            <path d="M22.81,13l.38.32.18.15A5,5,0,0,1,22.81,13Zm0,0,.38.32.18.15A5,5,0,0,1,22.81,13Zm0,0,.38.32.18.15A5,5,0,0,1,22.81,13Zm0,0,.38.32.18.15A5,5,0,0,1,22.81,13Z"/>
        </g>
        <g id="Path_2657" data-name="Path 2657">
            <path d="M21.13,1.37,21,1.31l-.11,0-.1-.07-.11-.05,0,0A14.7,14.7,0,0,0,15,0h-.07A14.86,14.86,0,0,0,0,14.41v.05A4.18,4.18,0,0,0,0,15a14.94,14.94,0,0,0,29.87,0v-.17A14.91,14.91,0,0,0,21.13,1.37ZM14.94,27.88A13,13,0,0,1,2,15.69l.72.11.73.08c.23,0,.47,0,.71,0l.75,0H5c.38,0,.75,0,1.13,0s.73-.06,1.09-.11h0c.37-.05.73-.11,1.09-.19s.71-.15,1.06-.25.55-.15.82-.24c0,0,0,0,.05,0a2.83,2.83,0,0,0,.41-.14,7.47,7.47,0,0,0,.79-.29l1-.45c.24-.11.48-.24.71-.37l0,0,.42-.24c.29-.17.57-.34.85-.54s.49-.33.73-.51h0c.22-.16.44-.34.65-.52l.24-.21a8.8,8.8,0,0,0,.72-.65,15.56,15.56,0,0,0,1.53-1.71c.19-.24.38-.49.55-.75s.44-.64.64-1a.42.42,0,0,0,0,.1,7.92,7.92,0,0,0,.28.82,9.28,9.28,0,0,0,.37.86A11.41,11.41,0,0,0,22.81,13l.38.32.18.15.21.16a7.52,7.52,0,0,0,.82.57c.22.14.44.27.67.39l.21.11c.23.12.46.22.69.32a7.67,7.67,0,0,0,.84.32c.28.1.58.18.87.26l.17,0A12.94,12.94,0,0,1,14.94,27.88Z" fill="#676767"/>
            <path d="M27.68,15.56c-.29-.08-.59-.16-.87-.26A7.67,7.67,0,0,1,26,15c-.23-.1-.46-.2-.69-.32l-.21-.11c-.23-.12-.45-.25-.67-.39a7.52,7.52,0,0,1-.82-.57l-.21-.16a5,5,0,0,1-.56-.47A11.41,11.41,0,0,1,20.2,9.49a9.28,9.28,0,0,1-.37-.86,7.92,7.92,0,0,1-.28-.82.42.42,0,0,1,0-.1c-.2.34-.41.66-.64,1s-.36.51-.55.75a15.56,15.56,0,0,1-1.53,1.71,8.8,8.8,0,0,1-.72.65l-.24.21c-.21.18-.43.36-.65.52h0c-.24.18-.48.35-.73.51s-.56.37-.85.54l-.42.24,0,0c-.23.13-.47.26-.71.37l-1,.45a7.47,7.47,0,0,1-.79.29,2.83,2.83,0,0,1-.41.14s0,0-.05,0c-.27.09-.54.17-.82.24s-.7.18-1.06.25-.72.14-1.09.19h0c-.36,0-.73.08-1.09.11S5.36,16,5,16H4.93l-.75,0c-.24,0-.48,0-.71,0l-.73-.08L2,15.69a12.93,12.93,0,0,0,25.83-.08ZM10.43,21a2.14,2.14,0,1,1,2.13-2.14A2.14,2.14,0,0,1,10.43,21ZM20,21a2.14,2.14,0,1,1,2.14-2.14A2.14,2.14,0,0,1,20,21Z" fill="#fff"/>
        </g>
        <g id="Ellipse_1047" data-name="Ellipse 1047">
            <path d="M12.56,18.9a2.14,2.14,0,1,1-2.13-2.14A2.13,2.13,0,0,1,12.56,18.9Z" fill="#676767"/>
        </g>
        <g id="Ellipse_1048" data-name="Ellipse 1048">
            <path d="M22.18,18.9A2.14,2.14,0,1,1,20,16.76,2.14,2.14,0,0,1,22.18,18.9Z" fill="#676767"/>
        </g></g></g></g>
    </svg>
)