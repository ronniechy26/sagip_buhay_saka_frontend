import React , {useEffect, useState} from 'react';
import { Form,  notification, Spin, Modal} from 'antd';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {useHistory} from 'react-router-dom';
import LandingHeader from './components/LandingHeader';
import FormMyAccount from './components/FormMyAccount';
import { Container, Pane, } from '../../components'
import MyAccountSVG from '../../Images/myaccount.svg';

import { IState} from '../../ducks';
import { asyncActions,actionTypes } from '../../ducks/UserDuck';
import { getUserStatus } from '../../selectors/UserSelector';
import { IUser } from '../../models/UserModel';


const { confirm } = Modal;

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Landing : React.FC<IProps> = ({ user, update_user, status }) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        if(flag && status['USER_UPDATE'] ) {
            if (status['USER_UPDATE'].error === null) {
                notification.success({ 
                    message:  `My Account successfully updated!`
                });
                history.push({
                    pathname : '/sagip/board'
                })
            }
            setFlag(false);
        }
    }, [status, flag, history]);

    const onSave = React.useCallback( async () => {
        if(!user) return;
        const data = (await form.validateFields());
        confirm({
            title: `Update Credit`, 
            content: `Are you sure you want to update ?`,
            okText:'Yes',
            cancelText:'No',
            onOk : async () => {
                try {
                    const payload = {
                        role : user.role,
                        ...data
                    }
                    update_user(payload as IUser, user.id ?? '0');
                    setTimeout(() => setFlag(true), 500);
                }catch (errInfo) {
                    console.log('Validate Failed:', errInfo);
                }
            },
            onCancel() { }
        })
    }, [setFlag, form, user, update_user])

    return (
        <React.Fragment>
            <LandingHeader
                loading={false}
                form={form}
                onSave={onSave}
            />
            <Container>
                <Container.Card minHeight={'80vh'}>
                    {!user ? <Spin/> : 
                        <Pane>
                            <Pane.Column1>
                                <FormMyAccount
                                    form={form}
                                    user={user}
                                />
                            </Pane.Column1>
                            <Pane.Column2>
                                <Pane.Image src={MyAccountSVG} alt="myaccount"/>
                            </Pane.Column2>
                        </Pane>
                    }
                </Container.Card>
            </Container>
        </React.Fragment>
    )
}

const mapStateToProps = (state: IState) => ({
    user : state.UserReducer.data,
    status : getUserStatus(state, actionTypes.USER_UPDATE)
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            update_user : asyncActions.update_user
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Landing);