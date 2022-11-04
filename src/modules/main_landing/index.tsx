import React, {useState, useEffect, useCallback} from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { Layout, Menu, Avatar , Dropdown, Divider } from 'antd';
import { NavLink, Route, Switch, useParams, Redirect, useHistory} from 'react-router-dom';
import { isEmpty } from 'lodash';
import Axios from 'axios';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardFilled,
  UsergroupAddOutlined,
  SettingFilled,
  MessageFilled,
  WechatFilled,
  ReconciliationFilled,
  FundViewOutlined
} from '@ant-design/icons';
import Board from '../board';
import UserMngt from '../user_mngt/route';
import Recipient from '../recipient/route';
import Configuration from '../Configuration/route';
import Advisory from '../advisory/route';
import MyAccount from '../my_account/landing';
import Feedbacks from '../feedback/route';

import { Logo } from '../../components';
import SagipLogo from '../../Images/sagipLogo.png';
import useWindowDimension from '../../hooks/useWindowDimension';

import { render_name } from '../../selectors/UserSelector';
import { IState } from '../../ducks';
import { asyncActions, syncActions } from '../../ducks/UserDuck';

const { Header, Sider, Content } = Layout;


export type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

interface IParams {
    tab : string;
    sub : string;
}

const Main : React.FC<IProps> = ({user, logout, fetch_user, ...props}) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const toggle = () => setCollapsed(!collapsed);
    const {tab, sub} = useParams<IParams>();
    const [currentTab, setCurrentTab] = useState<string[]>(['board']);
    // const windowsDimension = useWindowDimension();
    const token = localStorage.getItem(process.env.REACT_APP_STORAGE_KEY_AUTH!);
    const user_id = localStorage.getItem(process.env.REACT_APP_STORAGE_KEY_USER!);
    const history = useHistory();

    const setSelectedKey = useCallback((selected : string) =>{
        if(selected === undefined) return;
        setCurrentTab([selected])
     },[setCurrentTab])
    
    useEffect(() => {
        if(sub && subs.includes(sub)){
            setSelectedKey(sub);
        }else{
            setSelectedKey(tab);
        }
    }, [tab, sub, setSelectedKey])

    // useEffect(() =>{
    //     if(windowsDimension.width < 1000){
    //         setCollapsed(true);
    //     }else{
    //         setCollapsed(false);
    //     }
    // }, [windowsDimension])

    const AccountMenu = (
        <Menu>
             <Menu.Item key="2">
                <span
                    style={{fontWeight : 'bold'}}
                    onClick={() =>{
                        history.push({
                            pathname: `/sagip/my_account`,
                        })
                    }}
                >
                    My Account
                </span>
            </Menu.Item>
            <Menu.Item key="1">
                <span onClick={() =>{
                        logout();
                    }}
                    style={{fontWeight : 'bold'}}
                >
                    Logout
                </span>
            </Menu.Item>
        </Menu>
    )

    const fetchUser = React.useCallback(
        async (userId: string) => {
            await fetch_user(userId);
        },
        [fetch_user]
    );

    React.useEffect(() =>{
        if (token) {
            Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        if (!user && token) {
            const userId = localStorage.getItem(
                process.env.REACT_APP_STORAGE_KEY_USER!
            );

            if (userId) {
                fetchUser(userId);
            }
        }
    }, [fetchUser, user, token])

   

    if((!token || !user_id) && isEmpty(user)){
        return <Redirect to='/' />
    }

    const handleClick = (e : any) => {
        setCurrentTab([e.key]);
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{width : '250px'}}>
                <Logo>
                    <Logo.LogoWrapper>
                        <Logo.Image src={SagipLogo} alt="SagipLogo"/>
                    </Logo.LogoWrapper>
                    <Logo.Title> Sagip </Logo.Title>
                    {/* <Divider style={{borderBottom : '1px solid #519c2a', paddingRight : '10px'}} /> */}
                </Logo>
                <Menu 
                    theme="dark" 
                    mode="inline" 
                    selectedKeys={currentTab} 
                    onClick={handleClick}
                >
                    {
                        MenuItem.map((item) =>{
                            if(!item.permission.includes(user ? user.role : '')) return;
                            if(item.subMenu && item.subMenu.length > 0){
                                return(
                                    <Menu.SubMenu 
                                        key={item.key} 
                                        icon={item.icon} 
                                        title={item.name} 
                                        style={{marginBottom : '10px'}}
                                    >
                                        {
                                            item.subMenu.map((sub) =>{
                                                return (
                                                    <Menu.Item key={sub.key} style={{marginBottom : '10px'}} >
                                                        <NavLink to={sub.link}>
                                                            <span>{sub.name}</span>
                                                        </NavLink> 
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </Menu.SubMenu>
                                )
                            }
                            return(
                                <Menu.Item key={item.key} style={{marginBottom : '10px'}} >
                                    <NavLink to={item.link}>
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </NavLink> 
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
                <div className={ collapsed ? "footer-hidden" : "footer"}>
                        &copy; 2020 - NULL TECHNOLOGY
                </div>
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: '10px 50px 20px 5px', background :'#00989f'}}>
                    <div style={{
                        display : 'flex',
                        justifyContent : 'space-between',
                        alignItems : 'center'
                    }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                        <Dropdown overlay={AccountMenu} placement="bottomCenter">
                            <Avatar size="large" style={AvatarStyle}>
                                { render_name(user) }
                            </Avatar>
                        </Dropdown>  
                    </div>
                </Header>
                <Content>
                    <Switch>
                        <Route path="/sagip/board" component={Board} />
                        <Route path="/sagip/users" component={UserMngt} />
                        <Route path="/sagip/recipient" component={Recipient} />
                        <Route path="/sagip/configuration" component={Configuration} />
                        <Route path="/sagip/advisory" component={Advisory} />
                        <Route path="/sagip/my_account" component={MyAccount} />
                        <Route path="/sagip/feedbacks" component={Feedbacks} />
                    </Switch>                        
                </Content>
            </Layout>
      </Layout>
    )
}


const mapStateToProps = (state: IState) => ({
    user : state.UserReducer.data,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_user: asyncActions.fetch_user,
            logout: syncActions.logout,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const iconstyle : React.CSSProperties | undefined ={
    fontSize: '28px', 
    paddingTop: '5px',
    float : 'left',
    marginRight : '20px'
}

const subs = [
    'livelihood',
    // 'production_stage',
    // 'risk',
    'planting',
    'seed','other',
    'climate_data',
    'hazard'
    // 'actualrainfall',
    // 'normalrainfall',
    // 'el_nino_rainfall',
    // 'la_nina_rainfall'
];

interface IMenu {
    id : string;
    key : string;
    name : string;
    link: string;
    icon : JSX.Element,
    subMenu? : Array<
        {
            id   : string
            key  : string
            name : string
            link :string
        }   
    >,
    permission : string[]
}

const MenuItem : IMenu[] = [
    {
        id : '0',
        key : "board",
        name : 'Board',
        link:'/sagip/board',
        icon : <DashboardFilled  style={iconstyle}/>,
        permission : ['R1', 'LGU']
    },
    {
        id : '1',
        key : "recipient",
        name : 'Recipient',
        link:'/sagip/recipient',
        icon : <MessageFilled style={iconstyle}/>,
        permission : ['R1', 'LGU']
    },
    {
        id : '2',
        key : "advisory",
        name : 'Advisory',
        link:'/sagip/advisory',
        icon : <ReconciliationFilled style={iconstyle}/>,
        permission : ['R1', 'LGU', 'PAGASA']
    },
    {
        id : '3',
        key : "feedbacks",
        name : 'Feedback',
        link:'/sagip/feedbacks',
        icon : <WechatFilled  style={iconstyle}/>,
        permission : ['R1', 'LGU', 'PAGASA']
    },
    {
        id : '4',
        key : "configuration",
        name : 'Configuration',
        link:'/sagip/configuration',
        icon : <SettingFilled style={iconstyle}/>,
        permission : ['R1', 'LGU'],
        subMenu : [
            // {
            //     id : '4-2',
            //     key : "production_stage",
            //     name : 'Production Stage',
            //     link:'/sagip/configuration/production_stage',
            // },
            // {
            //     id : '4-3',
            //     key : "risk",
            //     name : 'Risk',
            //     link:'/sagip/configuration/risk',
            // },
            {
                id : '4-1',
                key : "livelihood",
                name : 'Livelihood',
                link:'/sagip/configuration/livelihood',
            },
            {
                id : '4-4',
                key : "hazard",
                name : 'Hazard',
                link:'/sagip/configuration/hazard',
            },
            {
                id : '4-5',
                key : "seed",
                name : 'Best Seed to Use',
                link:'/sagip/configuration/seed',
            },
            {
                id : '4-6',
                key : "other",
                name : 'Other Advise',
                link:'/sagip/configuration/other',
            },
            {
                id : '4-7',
                key : "climate_data",
                name : 'Climate Data',
                link:'/sagip/configuration/climate_data',
            },
        ]
    },
    // {
    //     id : '5',
    //     key : "rainfall",
    //     name : 'Rainfall',
    //     link:'/sagip/configuration',
    //     icon : <FundViewOutlined style={iconstyle}/> ,
    //     permission : ['R1', 'LGU'],
    //     subMenu : [
    //         {
    //             id : '5-1',
    //             key : "actualrainfall",
    //             name : 'Actual Rainfall',
    //             link:'/sagip/configuration/actualrainfall',
    //         },
    //         {
    //             id : '5-2',
    //             key : "normalrainfall",
    //             name : 'Normal Rainfall',
    //             link:'/sagip/configuration/normalrainfall',
    //         },
    //         {
    //             id : '5-3',
    //             key : "el_nino_rainfall",
    //             name : 'El Niño Rainfall',
    //             link:'/sagip/configuration/el_nino_rainfall',
    //         },
    //         {
    //             id : '5-4',
    //             key : "la_nina_rainfall",
    //             name : 'La Niña Rainfall',
    //             link:'/sagip/configuration/la_nina_rainfall',
    //         }
    //     ]
    // },
    {
        id : '6',
        key : "users",
        name : 'User Management',
        link:'/sagip/users',
        icon : <UsergroupAddOutlined style={iconstyle}/> ,
        permission : ['R1'],
    },

]

const AvatarStyle : React.CSSProperties = {
    cursor : 'pointer', 
    background : '#fff', 
    fontWeight : 'bold',
    color : '#006064',
}