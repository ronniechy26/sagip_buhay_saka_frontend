import React, {Fragment, useEffect, useState, useCallback} from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Select } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import { Container, Table } from '../../../components'
import AdvisoryTable from '../components/AdvisoryTable';
// import ProvinceModal from '../components/ProvinceModal';
import ProvinceModalCheckbox from '../components/ProviceModalCheckbox';

import { IState } from '../../../ducks';
import { asyncActions } from '../../../ducks/AdvisoryDucks';
import { getAdvisoryStatus } from '../../../selectors/AdvisorySeletors';
import { asyncActions as  UserAsyncActions } from '../../../ducks/UserDuck';
 
type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

interface IParams {
    tab : string;
}

const Landing : React.FC<IProps> = ({fetch_advisories, read_user, list, status, user}) => {
    const history = useHistory();
    const { tab } = useParams<IParams>();
    const [selected, setSelected] = useState(getAdvisoryByRole(user?.role)[0].key);
    const [visible, setVisible] = useState(false);

    const fetch_loading = (status['ADVISORIES_FETCH_LIST'] ? status['ADVISORIES_FETCH_LIST'].fetching : false);

    useEffect(() => {
        fetch_advisories(selected);
    }, [fetch_advisories, selected])
  
    useEffect(() => {
        const userId = localStorage.getItem(
            process.env.REACT_APP_STORAGE_KEY_USER!
        );
        if(userId){
            read_user(userId);
        }
    }, [read_user])

    useEffect(() => {
        if(tab) setSelected(tab);
    }, [tab, setSelected])

    const onClick = useCallback(
        () => {
            if(user && user.role === 'LGU'){
                history.push({
                    pathname: `/sagip/advisory/add/${selected}`,
                })
            }else{
                setVisible(true);
            }
        },
        [history, selected, user],
    )
    
    const SelectOnchange = useCallback(
        (e) => {
            history.push({
                pathname: `/sagip/advisory/${e}`,
            })
            setSelected(e);
        },
        [setSelected, history],
    )

    return (
        <Fragment>
            <Container>
                <Container.Card>
                    <Container.Header>
                        <Container.Title>Advisory</Container.Title>
                    </Container.Header>
                    <Table.Header>
                        <Table.Title>
                            {`No. of Advisory :`}
                            <Table.Count> {list ? list.length : 0}</Table.Count>
                        </Table.Title>
                        <Table.ButtonWrapper>
                            <Select 
                                style={SelectStyle} 
                                value={selected}
                                onChange={SelectOnchange}
                            >
                                {
                                    getAdvisoryByRole(user?.role).map((item)=>{
                                        return (
                                            <Select.Option value={item.key} key={item.key}>
                                                {item.title}
                                            </Select.Option>
                                        )
                                    })
                                }
                            </Select>
                            <Button 
                                type="primary" 
                                size="middle"
                                icon={<PlusOutlined />}
                                onClick={onClick}
                            >
                                Add Advisory
                            </Button>
                        </Table.ButtonWrapper>
                    </Table.Header>
                    <Table>
                        <AdvisoryTable
                            list={list ? list : []}
                            loading={fetch_loading}
                            type={selected}
                        />
                    </Table>
                </Container.Card>
            </Container>
            {/* <ProvinceModal
                visible={visible}
                setVisible={setVisible}
                type={selected}
            /> */}
            <ProvinceModalCheckbox
                visible={visible}
                setVisible={setVisible}
                type={selected}
            />
        </Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    list : state.AdvisoryReducer.list,
    status : getAdvisoryStatus(state),
    user : state.UserReducer.data
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_advisories: asyncActions.fetch_advisories,
            read_user : UserAsyncActions.fetch_user
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

const SelectStyle : React.CSSProperties= {
    marginRight : '10px',
    width : '200px',
    borderRadius: '5px'
}

const getAdvisoryByRole = (role : string ="R1") => {
    return Advisories.filter(x =>  x.user.includes(role));
}

interface IAdvisories {
    id : number,
    title : string,
    key : string,
    user : string[]
}

const Advisories : Array<IAdvisories> = [
    {
        id : 1,
        title : '10 day Weather advisory',
        key : '10_day_weather',
        user : ['R1', 'LGU']
    },
    {
        id : 2,
        title : 'Seasonal',
        key : 'seasonal',
        user : ['R1', 'LGU']
    },
    {
        id : 3,
        title : 'Gale Warning',
        key : 'gale_warning',
        user : ['R1', 'LGU']
    },
    {
        id : 4,
        title : 'Emergency',
        key : 'emergency',
        user : ['R1', 'LGU']
    },
    {
        id : 5,
        title : 'Tropical Cyclone',
        key : 'tropical_cyclone',
        user : ['R1', 'PAGASA']
    },
    {
        id : 6,
        title : 'Other Weather System',
        key : 'other_weather_system',
        user : ['R1', 'PAGASA']
    },
];
