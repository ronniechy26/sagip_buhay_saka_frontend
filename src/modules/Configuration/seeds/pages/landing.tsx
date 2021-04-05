import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {  Container, Table } from '../../../../components';
import { Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import SeedTable from '../components/SeedTable';
import { ISeed } from '../../../../models/SeedModel';
import { IState } from '../../../../ducks';
import { asyncActions } from '../../../../ducks/SeedDucks';
import { getSeedStatus } from '../../../../selectors/SeedSelector'; 

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Landing : React.FC<IProps> = ({
    fetch_seeds, 
    add_seed, 
    update_seed,
    deactivate_seed,
    activate_seed,
    list, 
    status, 
    data
}) => {
    const childRef:any = useRef(null);
    const fetch_loading = (status['SEED_FETCH_LIST'] ? status['SEED_FETCH_LIST'].fetching : false);

    useEffect(() =>{
        fetch_seeds();
    }, [fetch_seeds, data])

    return (
        <Fragment>
            <Container>
                <Container.Card>
                    <Container.Header>
                        <Container.Title>Configuration - Best Seed to Use</Container.Title>
                    </Container.Header>
                    <Table.Header>
                        <Table.Title>
                            {`No. of Seed :`}
                            <Table.Count> {list? list.length : 0}</Table.Count>
                        </Table.Title>
                        <Table.ButtonWrapper>
                            <Button 
                                type="primary" 
                                size="middle"
                                icon={<PlusOutlined />}
                                onClick={() => { childRef.current.addNewSeed() }}
                            >
                                Add Seed
                            </Button>
                        </Table.ButtonWrapper>
                    </Table.Header>
                    <Table>
                        <SeedTable
                            list={list as Array<ISeed>}
                            ref={childRef}
                            loading={fetch_loading }
                            add_seed={add_seed}
                            update_seed={update_seed}
                            deactivate_seed={deactivate_seed}
                            activate_seed={activate_seed}
                            status={status}
                        />
                    </Table>
                </Container.Card>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    list : state.SeedReducer.list,
    status : getSeedStatus(state),
    data : state.SeedReducer.data
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_seeds: asyncActions.fetch_seeds,
            add_seed : asyncActions.add_seed,
            update_seed : asyncActions.update_seed,
            deactivate_seed : asyncActions.deactivate_seed,
            activate_seed : asyncActions.activate_seed
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
