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

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Landing : React.FC<IProps> = ({
    fetch_livelihoods, 
    add_livelihood, 
    update_livelihood,
    deactivate_livelihood,
    activate_livelihood,
    list, 
    status, 
    data
}) => {
    const childRef:any = useRef(null);
    const fetch_loading = (status['LIVELIHOOD_FETCH_LIST'] ? status['LIVELIHOOD_FETCH_LIST'].fetching : false);

    useEffect(() =>{
        fetch_livelihoods();
    }, [
            fetch_livelihoods, 
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
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_livelihoods: asyncActions.fetch_livelihoods,
            add_livelihood : asyncActions.add_livelihood,
            update_livelihood : asyncActions.update_livelihood,
            deactivate_livelihood : asyncActions.deactivate_livelihood,
            activate_livelihood : asyncActions.activate_livelihood,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
