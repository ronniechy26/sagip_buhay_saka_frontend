import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {  Container, Table } from '../../../../components';
import { Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';

import RainfallTable from '../components/RainfallTable';
import RainfallDrawer from '../components/RainfallDrawer';

import { IState } from '../../../../ducks';
import { asyncActions } from '../../../../ducks/ActualRainfallDucks';
import { IActualRainfall } from '../../../../models/ActualRainfallModel';
import { getActualRainfallStatus } from '../../../../selectors/ActualRainfallSeletors';

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const ActualForecastLanding : React.FC<IProps> = ({
    fetch_actual_rainfall,
    add_actual_rainfall,
    read_actual_rainfall,
    update_actual_rainfall,
    selected_data,
    list,
    status,
    data
}) => {
    const [visible, setVisible] = useState(false);
    const [action, setAction] =useState<'add' | 'edit'>('add');
    const fetch_loading = (status['ACTUALRAINFALL_FETCH_LIST'] ? status['ACTUALRAINFALL_FETCH_LIST'].fetching : false);

    useEffect(() => {
        fetch_actual_rainfall();
    }, [fetch_actual_rainfall, data])

    const setEdit = () =>{
        setVisible((prev) => !prev);
        setAction('edit');
    }

    return (
        <Fragment>
            <Container>
                <Container.Card>
                    <Container.Header>
                        <Container.Title>Configuration - Actual Rainfall</Container.Title>
                    </Container.Header>
                    <Table.Header>
                        <Table.Title>
                            {`No. of Year/s : `}
                            <Table.Count> {list ? list.length : '0'}</Table.Count>
                        </Table.Title>
                        <Table.ButtonWrapper>
                            <Button 
                                type="primary" 
                                size="middle"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    setVisible((prev) => !prev);
                                    setAction('add');
                                }}
                            >
                                Add RainFall
                            </Button>
                        </Table.ButtonWrapper>
                    </Table.Header>
                    <Table>
                        <RainfallTable
                            read_actual_rainfall={read_actual_rainfall}
                            data={list as IActualRainfall[]}
                            loading={fetch_loading}
                            setEdit={setEdit}
                        />
                    </Table>
                </Container.Card>
            </Container>
            <RainfallDrawer
                data={selected_data as IActualRainfall}
                status={status}
                add_actual_rainfall={add_actual_rainfall}
                update_actual_rainfall={update_actual_rainfall}
                action={action}
                visible={visible}
                onClose={() => setVisible((prev) => !prev)}
            />
        </Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    list : state.ActualRainfallReducer.list,
    status : getActualRainfallStatus(state),
    data : state.ActualRainfallReducer.data,
    selected_data : state.ActualRainfallReducer.selected_data
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_actual_rainfall: asyncActions.fetch_actual_rainfall,
            add_actual_rainfall : asyncActions.add_actual_rainfall,
            read_actual_rainfall : asyncActions.read_actual_rainfall,
            update_actual_rainfall : asyncActions.update_actual_rainfall
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ActualForecastLanding);
