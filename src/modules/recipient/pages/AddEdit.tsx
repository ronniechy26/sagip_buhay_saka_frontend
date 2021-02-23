import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { useHistory, useParams } from 'react-router-dom';
import { Form, notification, Spin} from 'antd';
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { Store } from "antd/lib/form/interface";
import { Container, Pane, } from '../../../components'
import recipientSVG from '../../../Images/recipient.svg';
import { IState } from '../../../ducks';
import { actionTypes, asyncActions } from '../../../ducks/ReicipientDuck';
import { getRecipientStatus } from '../../../selectors/RecipientSelector';
import { IRecipient } from '../../../models/RecipientModel';
import FormRecipient from '../components/FormRecipient';
import LandingHeader from '../components/LandingHeader';


type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

interface IParams {
    action : 'add' | 'edit';
    id : string;
}

const AddEdit : React.FC<IProps> = ({
    add_recipient, 
    read_recipient, 
    update_recipient, 
    status, 
    data
}) => {
    
    const [form] = Form.useForm();
    const history = useHistory();
    const [flag, setFlag] = useState(false);
    const { action, id } = useParams<IParams>();

    const fetch_loading = (status['RECIPIENT_READ'] ? status['RECIPIENT_READ'].fetching : false);
    const add_loading = (status['RECIPIENT_ADD'] ? status['RECIPIENT_ADD'].fetching : false);
    const update_loading = (status['RECIPIENT_UPDATE'] ? status['RECIPIENT_UPDATE'].fetching : false);

    useEffect(() => {
        if(action === 'edit' && id){
            form.setFieldsValue({...data})
        }
    }, [data, action, id, form])
    
    useEffect(() => {
        if(action === 'edit' && id){
            read_recipient(id);
        }
    }, [action, id , history, read_recipient])
    
    useEffect(() => {
        const type = action === 'add' ? 
            'RECIPIENT_ADD' : 'RECIPIENT_UPDATE';
        if (flag && status[type] ) {
            if (status[type].error === null) {
                notification.success({ 
                    message:  `Recipient successfully 
                        ${action === 'add' ? 'Added' : 'Modified'}!`
                })
                history.goBack();
            }
            setFlag(false);
        }
    }, [flag, setFlag, status, action, history]);

    const onFinish = React.useCallback((values: Store)  => {
        setFlag(true);
        if(action === 'edit' && id){
            update_recipient(id, values as IRecipient)
        }else{
            add_recipient(values as IRecipient)
        }
    }, [setFlag, add_recipient, update_recipient, id , action]);

    const onFinishFailed  = (errorInfo : ValidateErrorEntity<any>) =>{
        console.log(errorInfo)
    }

    return (
        <React.Fragment>
            <LandingHeader
                action={action}
                form={form}
                loading={add_loading ||  update_loading}
            />
            <Container>
                <Container.Card minHeight={'80vh'}>
                {fetch_loading ? <Spin/> : 
                    <Pane>
                        <Pane.Column1>
                            <FormRecipient
                                form={form}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            />
                        </Pane.Column1>
                        <Pane.Column2>
                            <Pane.Image src={recipientSVG} alt="Recipient"/>
                        </Pane.Column2>
                    </Pane>
                }
                </Container.Card>
            </Container>
        </React.Fragment>
    )
}


const mapStateToProps = (state: IState) => ({
    status : getRecipientStatus(state, actionTypes.RECIPIENT_ADD),
    data : state.RecipientReducer.data
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            add_recipient : asyncActions.add_recipient,
            read_recipient : asyncActions.read_recipient,
            update_recipient : asyncActions.update_recipient
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);

