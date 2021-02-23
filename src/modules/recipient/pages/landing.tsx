import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {  Container, Table } from '../../../components';
import { Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import TableRecipient from '../components/TableRecipient';
import { IState } from '../../../ducks';
import { actionTypes, asyncActions } from '../../../ducks/ReicipientDuck';
import { getRecipientStatus } from '../../../selectors/RecipientSelector';
import { IRecipient } from '../../../models/RecipientModel';

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const RecipientLanding : React.FC<IProps> = ({
    fetch_recipients,
    read_recipient,
    deactivate_recipient,
    activate_recipient,
    data,
    list,
    status
}) => {
    
    const history = useHistory();

    useEffect(() => {
        fetch_recipients();
    }, [fetch_recipients, data])

    return (
        <Fragment>
            <Container>
                <Container.Card>
                    <Container.Header>
                        <Container.Title>Recipient</Container.Title>
                        <div>
                            <div>
                                <Container.TitleLabel>Globe :</Container.TitleLabel>
                                <Container.TitleValue>{'21589998 '}</Container.TitleValue>
                            </div>
                           <div>
                                <Container.TitleLabel>Cross Telco :</Container.TitleLabel>
                                <Container.TitleValue>{'225659998 '}</Container.TitleValue>
                           </div>
                        </div>
                    </Container.Header>
                    <Table.Header>
                        <Table.Title>
                            {`No. of Recipients :`}
                            <Table.Count> {list? list.length : 0}</Table.Count>
                        </Table.Title>
                        <Table.ButtonWrapper>
                            <Button 
                                onClick={() => history.push({
                                    pathname: `/sagip/recipient/add`,
                                })}
                                type="primary" 
                                size="middle"
                                icon={<PlusOutlined />}
                            >
                                Add Recipient
                            </Button>
                        </Table.ButtonWrapper>
                    </Table.Header>
                    <Table>
                        <TableRecipient 
                            list={list? list : []}
                            loading={status['RECIPIENT_FETCH_LIST'] ? status['RECIPIENT_FETCH_LIST'].fetching : false} 
                            read_recipient={read_recipient}
                            data={data as IRecipient}
                            status={status}
                            deactivate_recipient={deactivate_recipient}
                            activate_recipient={activate_recipient}
                        />
                    </Table>
                </Container.Card>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    list : state.RecipientReducer.list,
    status : getRecipientStatus(state, actionTypes.RECIPIENT_FETCH_LIST),
    data : state.RecipientReducer.data
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_recipients: asyncActions.fetch_recipients,
            read_recipient : asyncActions.read_recipient,
            deactivate_recipient : asyncActions.deactivate_recipient,
            activate_recipient : asyncActions.activate_recipient,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RecipientLanding);