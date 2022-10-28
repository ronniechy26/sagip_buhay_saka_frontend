import React, { useEffect, useState } from 'react';
import { Modal, Spin, Row, Form, Input, Button, notification } from 'antd';
import { ModalContainer, LandingHeader } from '../../../components';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import loginSVG from '../../../Images/login.svg';
import { IUser } from '../../../models/UserModel';
import { render_table_name } from '../../../selectors/UserSelector';
const { confirm } = Modal;

interface IProps {
    visible: boolean;
    setVisible :  React.Dispatch<React.SetStateAction<boolean>>;
    status : any;
    selected_user : IUser;
    change_password : (id :string, data : any) => void;
}

const ChangePasswordModal : React.FC<IProps> = ({ 
    visible , 
    setVisible, 
    change_password,
    status,
    selected_user
}) => {
    const read_loading = (status['USER_SET_SELECTED'] ? status['USER_SET_SELECTED'].fetching : false);
    const [ form ] = Form.useForm();
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        if(!selected_user) return;
        form.setFieldsValue({
            credits : selected_user.credit_count ? selected_user.credit_count : 0
        })
    }, [selected_user, form])

    useEffect(() => {
        if(flag && status['USER_CHANGE_PASSWORD'] ) {
            if (status['USER_CHANGE_PASSWORD'].error === null) {
                notification.success({ 
                    message:  `Password successfully updated!`
                })
                setVisible(false);
            }
            setFlag(false);
        }
    }, [status, flag, setVisible]);

    const onFinish = React.useCallback(() => {
        if(!selected_user) return;
        confirm({
            title: `Change Password`, 
            content: `Are you sure you want to change this account's password ?`,
            okText:'Yes',
            cancelText:'No',
            onOk : () => {
                try {
                    const data = form.getFieldValue('password');
                    change_password(selected_user.id ?? '', {password : data});
                    setTimeout(() => setFlag(true), 500);
                }catch (errInfo) {
                    console.log('Validate Failed:', errInfo);
                }
            },
            onCancel() { }
        })
    }, [setFlag, form, change_password, selected_user])

    return (
       <Modal
            wrapClassName="modal-border"
            width={800}
            visible={visible}
            footer={null}
            maskClosable={false}
            onCancel={() => setVisible(false)}
            bodyStyle={{
                backgroundColor: 'whitesmoke'
            }}
       >
           {read_loading ? <Spin style={{minHeight : '57vh'}} /> : (
                <ModalContainer>
                    <div style={{
                       width : '50%',
                       paddingLeft : '20px'
                    }}>
                        <Form
                            onFinish={onFinish}
                            form={form}
                        >
                            <Row className="row-margin-bottom4">
                                <ModalContainer.Title>{render_table_name(selected_user)}</ModalContainer.Title>
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
                                        style={{width : '120%'}}
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
                                        style={{width : '120%'}}
                                    />
                                </Form.Item>
                            </Row>
                            <Row>
                                <LandingHeader.ButtonWrapper>
                                    <Button 
                                        htmlType="submit" 
                                        type="primary" 
                                        icon={<PlusOutlined />} 
                                        // onClick={() => form.submit()}
                                        loading={flag}
                                    >
                                        Save
                                    </Button>
                                    <Button 
                                        icon={<CloseOutlined />} 
                                        style={{marginLeft : '10px'}}
                                        onClick={() => setVisible(false)}
                                        loading={flag}
                                    >
                                        Cancel
                                    </Button>
                                </LandingHeader.ButtonWrapper>
                            </Row>
                        </Form>
                    </div>
                    <ModalContainer.Column>
                        <ModalContainer.Image src={loginSVG} alt="Change password"/>
                    </ModalContainer.Column>
                </ModalContainer> 
           )}
       </Modal>
    )
}

export default ChangePasswordModal
