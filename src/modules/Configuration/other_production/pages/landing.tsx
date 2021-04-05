import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {  Container, Table } from '../../../../components';
import { Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import PreProductionTable from '../components/PreProductionTable';
import { IPreProduction } from '../../../../models/PreProductionModel';
import { IState } from '../../../../ducks';
import { asyncActions } from '../../../../ducks/PreProductionDucks';
import { getPreProductionStatus } from '../../../../selectors/PreProductionSelector'; 

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Landing : React.FC<IProps> = ({
    fetch_pre_productions, 
    add_pre_production, 
    update_pre_production,
    deactivate_pre_production,
    activate_pre_production,
    list, 
    status, 
    data
}) => {
    const childRef:any = useRef(null);
    const fetch_loading = (status['PRE_PRODUCTION_FETCH_LIST'] ? status['PRE_PRODUCTION_FETCH_LIST'].fetching : false);

    useEffect(() =>{
        fetch_pre_productions();
    }, [fetch_pre_productions, data])

    return (
        <Fragment>
            <Container>
                <Container.Card>
                    <Container.Header>
                        <Container.Title>Configuration -  Other Advise</Container.Title>
                    </Container.Header>
                    <Table.Header>
                        <Table.Title>
                            {`No. of PreProduction :`}
                            <Table.Count> {list? list.length : 0}</Table.Count>
                        </Table.Title>
                        <Table.ButtonWrapper>
                            <Button 
                                type="primary" 
                                size="middle"
                                icon={<PlusOutlined />}
                                onClick={() => { childRef.current.addNewPreProduction() }}
                            >
                                Add Other Advise
                            </Button>
                        </Table.ButtonWrapper>
                    </Table.Header>
                    <Table>
                        <PreProductionTable
                            list={list as Array<IPreProduction>}
                            ref={childRef}
                            loading={fetch_loading}
                            add_pre_production={add_pre_production}
                            update_pre_production={update_pre_production}
                            deactivate_pre_production={deactivate_pre_production}
                            activate_pre_production={activate_pre_production}
                            status={status}
                        />
                    </Table>
                </Container.Card>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    list : state.PreProductionReducer.list,
    status : getPreProductionStatus(state),
    data : state.PreProductionReducer.data
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_pre_productions: asyncActions.fetch_pre_productions,
            add_pre_production : asyncActions.add_pre_production,
            update_pre_production : asyncActions.update_pre_production,
            deactivate_pre_production : asyncActions.deactivate_pre_production,
            activate_pre_production : asyncActions.activate_pre_production
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
