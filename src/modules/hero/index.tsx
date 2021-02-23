import React from 'react';
import AOS from "aos";
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import NavbarContainer  from '../../containers/hero/NavbarContainer';
import SidebarContainer from '../../containers/hero/SidebarContainer';
import HeroContainer from '../../containers/hero/HeroLandingContainer';
import R1LandingContainer from '../../containers/hero/R1LandingContainer';
import HowItWorksContainer from '../../containers/hero/HowItWorksContainer';
import PartnersContainer from '../../containers/hero/PartnersContainer';
import FooterContainer from '../../containers/hero/FooterContainer';
import LoginContainer from '../../containers/Login/LoginContainer';
import InfoSection from '../../containers/hero/InfoSectionContainer';

import { IState } from '../../ducks';
import { asyncActions } from '../../ducks/UserDuck';

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Hero : React.FC<IProps> = ({ login , fetch_user,...props }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [visible, setVisible] = React.useState<boolean>(false);
    const toggle : ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) = () =>  setIsOpen(!isOpen);
    const toggleVisible : (e: React.MouseEvent<HTMLElement, MouseEvent>) => void = () =>  setVisible(!visible);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        AOS.init({
            duration : 2000
        })
        AOS.refresh();
    }, [] )
    const token = localStorage.getItem(process.env.REACT_APP_STORAGE_KEY_AUTH!);

    React.useEffect(() => {
        if (token) {
            Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [props.data, token]);

    const render_login  = (visible : boolean) => {
        return(
            visible ? 
                <LoginContainer 
                    visible={visible} 
                    toggleVisible={toggleVisible}
                    LoginUser={LoginUser}
                /> 
                : null
        )
    }

    const LoginUser = React.useCallback(async (data : { username : string, password : string}) =>{
        await login(data)
    }, [login])

    const fetchUser = React.useCallback(
        async (userId: string) => {
            setLoading(true);
            await fetch_user(userId);
            setLoading(false);
        },
        [fetch_user, setLoading]
    );

    React.useEffect(() =>{
        if (!props.data && token) {
            const userId = localStorage.getItem(
                process.env.REACT_APP_STORAGE_KEY_USER!
            );

            if (userId) {
                fetchUser(userId);
            }
        } else {
            setLoading(false);
        }
    }, [fetchUser, props.data , token])

    if (token && props.data) {
        return <Redirect to={'/sagip/board'} />
    }

    return (
        <React.Fragment>
            <NavbarContainer    
                toggle={toggle}
                toggleVisible={toggleVisible}
            />
            <div style={{overflow : 'hidden'}}>
                <SidebarContainer
                    isOpen={isOpen} 
                    toggle={toggle}
                    toggleVisible={toggleVisible}
                />
                <HeroContainer/>
                <R1LandingContainer/>
                <HowItWorksContainer/>
                <InfoSection/>
                <PartnersContainer/>
                <FooterContainer/>
            </div>
            { render_login(visible) }
        </React.Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    data: state.UserReducer.data,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
    {
        login : asyncActions.login,
        fetch_user : asyncActions.fetch_user
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Hero);