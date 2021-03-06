import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {  Container, Table } from '../../../../components';
import { Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import LivelihoodTable from '../components/LivelihoodTable';
import { ILivelihood } from '../../../../models/LivelihoodModel';
import { IState } from '../../../../ducks';
import { asyncActions } from '../../../../ducks/LivelihoodDucks';
import { getLivelihoodStatus } from '../../../../selectors/LivelihoodSelector'; 
import { asyncActions as riskAsyncActions } from '../../../../ducks/RiskDucks';
import { asyncActions as prodStageAsyncActions } from '../../../../ducks/ProductionStageDucks';
import { IProductionStage } from '../../../../models/ProductionStageModel';
import { IRisk } from '../../../../models/RiskModel';

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Landing : React.FC<IProps> = ({
    fetch_livelihoods, 
    add_livelihood, 
    update_livelihood,
    deactivate_livelihood,
    activate_livelihood,
    fetch_risks,
    fetch_production_stage,
    list, 
    list_prod_stage,
    list_risk,
    status, 
    data
}) => {
    const childRef:any = useRef(null);
    const fetch_loading = (status['LIVELIHOOD_FETCH_LIST'] ? status['LIVELIHOOD_FETCH_LIST'].fetching : false);

    useEffect(() =>{
        fetch_livelihoods();
        fetch_risks();
        fetch_production_stage();
    }, [
            fetch_livelihoods, 
            fetch_risks,
            fetch_production_stage,
            data
        ]
    )

    return (
        <Fragment>
            <Container>
                <Container.Card>
                    <Container.Header>
                        <Container.Title>Configuration - Livelihood</Container.Title>
                    </Container.Header>
                    <Table.Header>
                        <Table.Title>
                            {`No. of Livelihood :`}
                            <Table.Count> {list? list.length : 0}</Table.Count>
                        </Table.Title>
                        <Table.ButtonWrapper>
                            <Button 
                                type="primary" 
                                size="middle"
                                icon={<PlusOutlined />}
                                onClick={() => { childRef.current.addNewLivelihood() }}
                            >
                                Add Livelihood
                            </Button>
                        </Table.ButtonWrapper>
                    </Table.Header>
                    <Table>
                        <LivelihoodTable
                            list={list as Array<ILivelihood>}
                            list_prod_stage = {  list_prod_stage as Array<IProductionStage>}
                            list_risk = { list_risk as Array<IRisk> }
                            ref={childRef}
                            loading={fetch_loading}
                            add_livelihood={add_livelihood}
                            update_livelihood={update_livelihood}
                            deactivate_livelihood={deactivate_livelihood}
                            activate_livelihood={activate_livelihood}
                            status={status}
                        />
                    </Table>
                </Container.Card>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    list : state.LivelihoodReducer.list,
    status : getLivelihoodStatus(state),
    data : state.LivelihoodReducer.data,
    list_prod_stage : state.ProductionStageReducer.list,
    list_risk : state.RiskReducer.list
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_livelihoods: asyncActions.fetch_livelihoods,
            add_livelihood : asyncActions.add_livelihood,
            update_livelihood : asyncActions.update_livelihood,
            deactivate_livelihood : asyncActions.deactivate_livelihood,
            activate_livelihood : asyncActions.activate_livelihood,
            fetch_risks : riskAsyncActions.fetch_risks,
            fetch_production_stage : prodStageAsyncActions.fetch_production_stage
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
