import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {  Container, Table } from '../../../../components';
import { Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import HazardTable from '../components/HazardTable';
import { IHazard } from '../../../../models/HazardModel';
import { IState } from '../../../../ducks';
import { asyncActions } from '../../../../ducks/HazardDucks';
import { getHazardStatus } from '../../../../selectors/HazardSelector'; 

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Landing : React.FC<IProps> = ({
    fetch_hazards, 
    add_hazard, 
    update_hazard,
    deactivate_hazard,
    activate_hazard,
    list, 
    status, 
    data
}) => {
    const childRef:any = useRef(null);
    const fetch_loading = (status['HAZARD_FETCH_LIST'] ? status['HAZARD_FETCH_LIST'].fetching : false);

    useEffect(() =>{
        fetch_hazards();
    }, [fetch_hazards, data])

    return (
        <Fragment>
            <Container>
                <Container.Card>
                    <Container.Header>
                        <Container.Title>Configuration - Hazard</Container.Title>
                    </Container.Header>
                    <Table.Header>
                        <Table.Title>
                            {`No. of Hazard :`}
                            <Table.Count> {list? list.length : 0}</Table.Count>
                        </Table.Title>
                        <Table.ButtonWrapper>
                            <Button 
                                type="primary" 
                                size="middle"
                                icon={<PlusOutlined />}
                                onClick={() => { childRef.current.addNewHazard() }}
                            >
                                Add Hazard
                            </Button>
                        </Table.ButtonWrapper>
                    </Table.Header>
                    <Table>
                        <HazardTable
                            list={list as IHazard[]}
                            ref={childRef}
                            loading={fetch_loading}
                            add_hazard={add_hazard}
                            update_hazard={update_hazard}
                            deactivate_hazard={deactivate_hazard}
                            activate_hazard={activate_hazard}
                            status={status}
                        />
                    </Table>
                </Container.Card>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    list : state.HazardReducer.list,
    status : getHazardStatus(state),
    data : state.HazardReducer.data
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_hazards: asyncActions.fetch_hazards,
            add_hazard : asyncActions.add_hazard,
            update_hazard : asyncActions.update_hazard,
            deactivate_hazard : asyncActions.deactivate_hazard,
            activate_hazard : asyncActions.activate_hazard
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
