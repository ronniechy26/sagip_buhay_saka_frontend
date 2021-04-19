import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {  Container, Table } from '../../../../components';
import { Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';

import { IState } from '../../../../ducks';
import ClimateDataTable from '../components/ClimateDataTable';
import ClimateDataDrawer from '../components/ClimateDataDrawer';
import { asyncActions } from '../../../../ducks/ClimateDataDucks';
import { getClimateDataStatus } from '../../../../selectors/ClimateDataSelectors';
import { IClimateData } from '../../../../models/ClimateDataModel';

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const ClimateDataLanding : React.FC<IProps> = ({
    fetch_climate_data,
    add_climate_data,
    read_climate_data,
    update_climate_data,
    selected_data,
    list,
    status,
    data,
    user
}) => {

    const [visible, setVisible] = useState(false);
    const [action, setAction] =useState<'add' | 'edit'>('add');
    const fetch_loading = (status['CLIMATEDATA_FETCH'] ? status['CLIMATEDATA_FETCH'].fetching : false);

    useEffect(() => {
        fetch_climate_data();
    }, [fetch_climate_data, data])

    const setEdit = () =>{
        setVisible((prev) => !prev);
        setAction('edit');
    }

    return (
        <Fragment>
            <Container>
                <Container.Card>
                    <Container.Header>
                        <Container.Title>Configuration - Climate Data</Container.Title>
                    </Container.Header>
                    <Table.Header>
                        <Table.Title>
                            {`No. of Climate Data: `}
                            <Table.Count> {list ? list.length : '0'} </Table.Count>
                        </Table.Title>
                        <Table.ButtonWrapper>
                            <Button 
                                type="primary" 
                                size="middle"
                                icon={<PlusOutlined />}
                                onClick={() =>{
                                    setVisible((prev) => !prev);
                                    setAction('add');
                                }}
                            >
                                Add Climate Data
                            </Button>
                        </Table.ButtonWrapper>
                    </Table.Header>
                    <Table>
                        <ClimateDataTable
                            read_climate_data={read_climate_data}
                            data={list as IClimateData[]}
                            loading={fetch_loading}
                            setEdit={setEdit}
                        />
                    </Table>
                </Container.Card>
            </Container>
            <ClimateDataDrawer
                data={selected_data as IClimateData}
                status={status}
                add_climate_data={add_climate_data}
                update_climate_data={update_climate_data}
                action={action}
                visible={visible}
                onClose={() => setVisible((prev) => !prev)}
                user={user}
            />
        </Fragment>
       
    )
}

const mapStateToProps = (state: IState) => ({
    list : state.ClimateDataReducer.list,
    status : getClimateDataStatus(state),
    data : state.ClimateDataReducer.data,
    selected_data : state.ClimateDataReducer.selected_data,
    user : state.UserReducer.data
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_climate_data: asyncActions.fetch_climate_data,
            add_climate_data : asyncActions.add_climate_data,
            read_climate_data : asyncActions.read_climate_data,
            update_climate_data : asyncActions.update_climate_data
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ClimateDataLanding);