import React, {useState, useEffect} from 'react';
import { Modal, Form , Row , Radio, Input, Button, notification } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { Store } from "antd/lib/form/interface";
import { ModalContainer, RadioWrapper } from '../../../components'
import AccSVG from '../../../Images/Account.svg';
import Acc2SVG from '../../../Images/Account2.svg';
import { IUser } from '../../../models/UserModel';

interface IProps {
    visible : boolean;
    toggleVisible : ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void);
    add_user : (user : IUser) => void;
    request_status : any;
    action : 'add' | 'edit';
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selected_user : IUser;
    update_user : (user : IUser, id : string) => void;
    remove_user_selected : () => void;
}
 
const AddEditUser : React.FC<IProps> = ({
    visible, 
    toggleVisible, 
    add_user, 
    setVisible,
    update_user,
    remove_user_selected,
    selected_user,
    request_status, 
    action
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    const [state, setState] = useState(() => {
        if(selected_user && action === 'edit'){
            return selected_user;
        }
        return {}
    });

    useEffect(() => {
        if(action === 'add'){
            setLoading( request_status['USER_ADD'] ? request_status['USER_ADD'].fetching : false)
        }else{
            setLoading( request_status['USER_UPDATE'] ? request_status['USER_UPDATE'].fetching : false)
        }
    }, [request_status, setLoading, action])

   useEffect(() => { return () =>  remove_user_selected()  }, []);

    useEffect(() => {
        const type = action === 'add' ? 'USER_ADD' : 'USER_UPDATE';
        if (flag && request_status[type] ) {
            if (request_status[type].error === null) {
                notification.success({ 
                    message:  `User Account successfully ${action === 'add' ? 'Added' : 'Modified'}!`
                })
                setVisible(false);
            }
            setFlag(false);
        }
    }, [flag, setFlag, request_status, setVisible, action]);

    const onFinish : ((values: any) => void) | undefined = React.useCallback((values: Store)  => {
        setFlag(true);
        if(action === 'add'){
            add_user(values as IUser);
        }else{
            update_user(values as IUser, selected_user.id as string);
        }
    }, [setFlag, action, add_user, update_user, selected_user]);

    const onFinishFailed : ((errorInfo: ValidateErrorEntity<any>) => void) | undefined= (errorInfo) =>{
        
    }

    const render_title = (action : 'add' | 'edit') : string => {
        if(action === 'add'){
            return 'Add New User'
        }
        return 'Modify User';
    }   

    return (
        <Modal
            wrapClassName="modal-border"
            width={900}
            visible={visible}
            footer={null}
            maskClosable={false}
            onCancel={toggleVisible}
            bodyStyle={{
                backgroundColor: 'whitesmoke'
            }}
        >
            <ModalContainer>
                <ModalContainer.Column>
                    <ModalContainer.Image src={action === 'add' ? AccSVG : Acc2SVG} alt="Account Add Edit"/>
                </ModalContainer.Column>

                <ModalContainer.Column>
                    <ModalContainer.Title> {render_title(action)} </ModalContainer.Title>
                    <Form
                        initialValues={state}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        form={form}
                    >
                        <Row>
                            <ModalContainer.Label>Last Name</ModalContainer.Label>
                        </Row>
                        <Row>
                            <Form.Item
                                name="last_name"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                                <Input
                                    placeholder="Last Name"
                                    style={{width : '190%'}}
                                />
                            </Form.Item>
                        </Row>
                        <Row>
                            <ModalContainer.Label>First Name</ModalContainer.Label>
                        </Row>
                        <Row>
                            <Form.Item
                                name="first_name"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                                <Input
                                    name="first_name"
                                    placeholder="First Name"
                                    style={{width : '190%'}}
                                />
                            </Form.Item>
                        </Row>
                        <Row>
                            <ModalContainer.Label>Middle Name</ModalContainer.Label>
                        </Row>
                        <Row>
                            <Form.Item
                                name="middle_name"
                                rules={[{ required: false }]}
                            >
                                <Input
                                    name="middle_name"
                                    placeholder="Middle Name"
                                    style={{width : '190%'}}
                                />
                            </Form.Item>
                        </Row>
                        <Row>
                            <ModalContainer.Label>User Role</ModalContainer.Label>
                        </Row>
                        <Row>
                            <Form.Item
                                name="role"
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                            >
                                {/* <RadioWrapper> */}
                                    <Radio.Group
                                        buttonStyle="solid" 
                                        size="large" 
                                    >
                                        <Radio.Button value="R1">R1</Radio.Button>
                                        <Radio.Button value="LGU">LGU</Radio.Button>
                                        <Radio.Button value="PAGASA">PAGASA</Radio.Button>
                                    </Radio.Group>
                                {/* </RadioWrapper> */}
                            </Form.Item>
                        </Row>
                        {action === 'add' ? (
                        <React.Fragment>
                            <Row>
                                <ModalContainer.Label>User Name</ModalContainer.Label>
                            </Row>
                            <Row>
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, type: 'email', message: 'Please input valid email!' }]}
                                >
                                    <Input
                                        placeholder="User Name"
                                        style={{width : '190%'}}
                                    />
                                </Form.Item>
                            </Row>
                            <Row>
                                <ModalContainer.Label>Password</ModalContainer.Label>
                            </Row>
                            <Row>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input required fields!' }]}
                                >
                                    <Input.Password
                                        placeholder="Password"
                                        style={{width : '178%'}}
                                    />
                                </Form.Item>
                            </Row>
                            <Row>
                                <ModalContainer.Label>Confirm Password</ModalContainer.Label>
                            </Row>
                            <Row>
                                <Form.Item
                                    dependencies={['password']}
                                    name="confirm_password"
                                    rules={[
                                        { 
                                            required: true, 
                                            message: 'Please input required fields!'
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Password did not matched!');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        placeholder="confirm password"
                                        style={{width : '178%'}}
                                    />
                                </Form.Item>
                            </Row>
                        </React.Fragment>
                        ) : null}
                        <Row>
                            <Button 
                                htmlType="submit" 
                                type="primary" 
                                icon={<PlusOutlined />} 
                                size={'large'} 
                                loading={loading}
                            >
                                Save
                            </Button>
                            <Button 
                                icon={<CloseOutlined />} 
                                size={'large'} 
                                style={{marginLeft : '10px'}}
                                onClick={toggleVisible}
                                loading={loading}
                            >
                                Cancel
                            </Button>
                        </Row>
                    </Form>
                </ModalContainer.Column>
            </ModalContainer>
        </Modal>
    )
}

export default AddEditUser
