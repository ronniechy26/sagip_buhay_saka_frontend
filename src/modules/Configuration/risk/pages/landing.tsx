import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {  Container, Table } from '../../../../components';
import { Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import RiskTable from '../components/RiskTable';
import { IRisk } from '../../../../models/RiskModel';
import { IState } from '../../../../ducks';
import { asyncActions } from '../../../../ducks/RiskDucks';
import { getRiskStatus } from '../../../../selectors/RiskSelector'; 

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Landing : React.FC<IProps> = ({
    fetch_risks, 
    add_risk, 
    update_risk,
    deactivate_risk,
    activate_risk,
    list, 
    status, 
    data
}) => {
    const childRef:any = useRef(null);
    const fetch_loading = (status['RISK_FETCH_LIST'] ? status['RISK_FETCH_LIST'].fetching : false);

    useEffect(() =>{
        fetch_risks();
    }, [fetch_risks, data])

    return (
        <Fragment>
            <Container>
                <Container.Card>
                    <Container.Header>
                        <Container.Title>Configuration - Risk</Container.Title>
                    </Container.Header>
                    <Table.Header>
                        <Table.Title>
                            {`No. of Risk :`}
                            <Table.Count> {list? list.length : 0}</Table.Count>
                        </Table.Title>
                        <Table.ButtonWrapper>
                            <Button 
                                type="primary" 
                                size="middle"
                                icon={<PlusOutlined />}
                                onClick={() => { childRef.current.addNewRisk() }}
                            >
                                Add Risk
                            </Button>
                        </Table.ButtonWrapper>
                    </Table.Header>
                    <Table>
                        <RiskTable
                            list={list as Array<IRisk>}
                            ref={childRef}
                            loading={fetch_loading }
                            add_risk={add_risk}
                            update_risk={update_risk}
                            deactivate_risk={deactivate_risk}
                            activate_risk={activate_risk}
                            status={status}
                        />
                    </Table>
                </Container.Card>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    list : state.RiskReducer.list,
    status : getRiskStatus(state),
    data : state.RiskReducer.data
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_risks: asyncActions.fetch_risks,
            add_risk : asyncActions.add_risk,
            update_risk : asyncActions.update_risk,
            deactivate_risk : asyncActions.deactivate_risk,
            activate_risk : asyncActions.activate_risk
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
