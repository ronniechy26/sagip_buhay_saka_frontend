import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {  Container, Table } from '../../../../components';
import { Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import StartPlantingTable from '../components/StartPlantingTable';
import { IStartPlanting } from '../../../../models/StartPlantingModel';
import { IState } from '../../../../ducks';
import { asyncActions } from '../../../../ducks/StartPlantingDucks';
import { getStartPlantingStatus } from '../../../../selectors/StartPlantingSelector'; 

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Landing : React.FC<IProps> = ({
    fetch_start_plantings, 
    add_start_planting, 
    update_start_planting,
    deactivate_start_planting,
    activate_start_planting,
    list, 
    status, 
    data
}) => {
    const childRef:any = useRef(null);
    const fetch_loading = (status['START_PLANTING_FETCH_LIST'] ? status['START_PLANTING_FETCH_LIST'].fetching : false);

    useEffect(() =>{
        fetch_start_plantings();
    }, [fetch_start_plantings, data])

    return (
        <Fragment>
            <Container>
                <Container.Card>
                    <Container.Header>
                        <Container.Title>Configuration - Start Planting</Container.Title>
                    </Container.Header>
                    <Table.Header>
                        <Table.Title>
                            {`No. of Start-Planting :`}
                            <Table.Count> {list? list.length : 0}</Table.Count>
                        </Table.Title>
                        <Table.ButtonWrapper>
                            <Button 
                                type="primary" 
                                size="middle"
                                icon={<PlusOutlined />}
                                onClick={() => { childRef.current.addNewStartPlanting() }}
                            >
                                Add Start-Planting
                            </Button>
                        </Table.ButtonWrapper>
                    </Table.Header>
                    <Table>
                        <StartPlantingTable
                            list={list as Array<IStartPlanting>}
                            ref={childRef}
                            loading={fetch_loading }
                            add_start_planting={add_start_planting}
                            update_start_planting={update_start_planting}
                            deactivate_start_planting={deactivate_start_planting}
                            activate_start_planting={activate_start_planting}
                            status={status}
                        />
                    </Table>
                </Container.Card>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    list : state.StartPlantingReducer.list,
    status : getStartPlantingStatus(state),
    data : state.StartPlantingReducer.data
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_start_plantings: asyncActions.fetch_start_plantings,
            add_start_planting : asyncActions.add_start_planting,
            update_start_planting : asyncActions.update_start_planting,
            deactivate_start_planting : asyncActions.deactivate_start_planting,
            activate_start_planting : asyncActions.activate_start_planting
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
