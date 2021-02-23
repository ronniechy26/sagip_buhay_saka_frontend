import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {  Container, Table } from '../../../../components';
import { Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import ProductionStageTable from '../components/ProductionStageTable';
import { IProductionStage } from '../../../../models/ProductionStageModel';
import { IState } from '../../../../ducks';
import { asyncActions } from '../../../../ducks/ProductionStageDucks';
import { getProductionStageStatus } from '../../../../selectors/ProductionStageSelector'; 

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Landing : React.FC<IProps> = ({
    fetch_production_stage, 
    add_production_stage, 
    update_production_stage,
    deactivate_production_stage,
    activate_production_stage,
    list, 
    status, 
    data
}) => {
    const childRef:any = useRef(null);
    const fetch_loading = (status['PRODUCTION_STAGE_FETCH_LIST'] ? status['PRODUCTION_STAGE_FETCH_LIST'].fetching : false);

    useEffect(() =>{
        fetch_production_stage();
    }, [fetch_production_stage, data])

    return (
        <Fragment>
            <Container>
                <Container.Card>
                    <Container.Header>
                        <Container.Title>Configuration - Production Stage</Container.Title>
                    </Container.Header>
                    <Table.Header>
                        <Table.Title>
                            {`No. of Production-Stage :`}
                            <Table.Count> {list? list.length : 0}</Table.Count>
                        </Table.Title>
                        <Table.ButtonWrapper>
                            <Button 
                                type="primary" 
                                size="middle"
                                icon={<PlusOutlined />}
                                onClick={() => { childRef.current.addNewProductionStage() }}
                            >
                                Add Production Stage
                            </Button>
                        </Table.ButtonWrapper>
                    </Table.Header>
                    <Table>
                        <ProductionStageTable
                            list={list as Array<IProductionStage>}
                            ref={childRef}
                            loading={fetch_loading}
                            add_production_stage={add_production_stage}
                            update_production_stage={update_production_stage}
                            deactivate_production_stage={deactivate_production_stage}
                            activate_production_stage={activate_production_stage}
                            status={status}
                        />
                    </Table>
                </Container.Card>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    list : state.ProductionStageReducer.list,
    status : getProductionStageStatus(state),
    data : state.ProductionStageReducer.data
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_production_stage: asyncActions.fetch_production_stage,
            add_production_stage: asyncActions.add_production_stage,
            update_production_stage : asyncActions.update_production_stage,
            deactivate_production_stage : asyncActions.deactivate_production_stage,
            activate_production_stage : asyncActions.activate_production_stage
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
