import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {  Container, Table } from '../../../components';
import { Button} from 'antd'
import { PlusOutlined} from '@ant-design/icons';
import TableUsers  from '../components/TableUsers';
import { IState } from '../../../ducks';
import { actionTypes, asyncActions , syncActions} from '../../../ducks/UserDuck';
import { getUserStatus } from '../../../selectors/UserSelector';
import AddEditUserModal from './AddEditUser';
import UpdateCreditModal from '../components/UpdateCreditModal';
import { IUser } from '../../../models/UserModel';

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export type IAction = 'add' | 'edit';

const UserMngt : React.FC<IProps> = ({
    fetch_users,
    deactivate_user, 
    activate_user, 
    add_user,
    fetch_user,
    update_user,
    remove_user_selected,
    update_credit,
    selected_user,
    list, 
    status, 
    user,
    ...props
}) => {
    const [visible, setVisible] = useState(false);
    const toggleVisible : (e: React.MouseEvent<HTMLElement, MouseEvent>) => void = () =>  setVisible(!visible);
    const [action, setAction ] = useState<IAction>('add');
    const [visibleCredit, setVisibleCredit] = useState(false);

    React.useEffect(() =>{
        fetch_users({});
    }, [fetch_users, selected_user]);

    const render_login  = (visible : boolean, action : IAction) => {
        return(
            visible ? 
                <AddEditUserModal 
                    selected_user={selected_user as IUser}
                    remove_user_selected={remove_user_selected}
                    setVisible={setVisible}
                    visible={visible} 
                    toggleVisible={toggleVisible}
                    add_user={add_user}
                    update_user={update_user}
                    request_status={status} 
                    action={action}
                /> 
                : null
        )
    }
    
    return (
        <React.Fragment>
            <Container>
                <Container.Card>
                    <Container.Header>
                        <Container.Title>Users Management</Container.Title>
                    </Container.Header>
                        <Table.Header>
                            <Table.Title>
                                {`No. of Users :`}
                                <Table.Count>
                                    {list? list.length : 0} 
                                </Table.Count>
                            </Table.Title>
                            <Table.ButtonWrapper>
                                <Button
                                    onClick={() =>{
                                        setAction('add');
                                        setVisible(true);
                                    }}
                                    type="primary" 
                                    size="middle"
                                    icon={<PlusOutlined />}
                                >
                                    Add User
                                </Button>
                            </Table.ButtonWrapper>
                        </Table.Header>
                        <Table>
                            <TableUsers 
                                {...props} 
                                fetch_user={fetch_user}
                                setVisible={setVisible}
                                setVisibleCredit={setVisibleCredit}
                                setAction={setAction}
                                deactivate_user={deactivate_user}
                                activate_user={activate_user}
                                fetch_users={fetch_users}
                                loading={status['USER_FETCH_LIST'] ? status['USER_FETCH_LIST'].fetching : false} 
                                list={list? list : []} 
                            />
                        </Table>
                </Container.Card>
            </Container>
            { render_login(visible, action) }
            <UpdateCreditModal
                visible={visibleCredit}
                setVisibleCredit={setVisibleCredit}
                status={status}
                selected_user={selected_user as IUser}
                update_credit={update_credit}
            />
        </React.Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    list : state.UserReducer.list,
    status : getUserStatus(state, actionTypes.USER_FETCH_LIST),
    selected_user : state.UserReducer.selected_user,
    user : state.UserReducer.data,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_users: asyncActions.fetch_users,
            deactivate_user : asyncActions.deactivate_user,
            activate_user : asyncActions.activate_user,
            add_user : asyncActions.add_user,
            fetch_user : asyncActions.set_selected_user,
            update_user : asyncActions.update_user,
            remove_user_selected  : syncActions.remove_user_selected,
            update_credit : asyncActions.update_credit
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(UserMngt);