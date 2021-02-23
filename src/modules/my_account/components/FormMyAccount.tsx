import React, {useEffect, useState}  from 'react';
import {  Form, Input, Row , InputNumber, Select} from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { ModalContainer} from '../../../components'
import {FormInstance} from 'antd/lib/form';
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { Store } from "antd/lib/form/interface";
import { IUser } from '../../../models/UserModel';


interface IProps {
    form : FormInstance<any>;
    user : IUser
}

const FormMyAccount : React.FC<IProps> = ({form, user}) => {

    const [editPassword, setEditPassword] = useState(false);

    useEffect(() => {
        if(!user) return;
        form.setFieldsValue({
            first_name : user.first_name,
            middle_name : user.middle_name,
            last_name : user.last_name
        })
    }, [user, form])

    return (
        <Form
            form={form}
        >
            <Row className="row-margin-bottom2" > 
                <span style={TitleStyle}>Primary Information</span>
            </Row>
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
                        style={{width : '200%'}}
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
                        placeholder="First Name"
                        style={{width : '200%'}}
                    />
                </Form.Item>
            </Row>
            <Row>
                <ModalContainer.Label>Middle Name</ModalContainer.Label>
            </Row>
            <Row>
                <Form.Item
                    name="middle_name"
                    rules={[{ required: false, message: 'Please input required fields!' }]}
                >
                    <Input
                        placeholder="Middle Name"
                        style={{width : '200%'}}
                    />
                </Form.Item>
            </Row>
            <Row className="row-margin-bottom2" > 
                <span style={TitleStyle}>User Credentials</span>
                <span style={{
                    color : 'gray', 
                    cursor : 'pointer',
                    fontSize : '18px',
                    fontWeight : 'bold',
                    marginLeft : '8px'
                }}>
                    {
                        !editPassword ?  
                            <EditOutlined onClick={() => setEditPassword(true)}/> 
                        : 
                            <CloseOutlined style={{color : 'red'}} onClick={() => setEditPassword(false)}/>
                    }
                </span>
            </Row>
            {
                editPassword ? (
                    <React.Fragment>
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
                ) 
                : (
                    <React.Fragment>
                        <Row className="row-margin-bottom">
                            <ModalContainer.Label>User Email</ModalContainer.Label>
                        </Row>
                        <Row className="row-margin-bottom2">
                            <span>{user.username}</span>
                        </Row>
                        <Row className="row-margin-bottom">
                            <ModalContainer.Label>Password</ModalContainer.Label>
                        </Row>
                        <Row className="row-margin-bottom2">
                            <span>*****************</span>
                        </Row>
                    </React.Fragment>
                )
            }
        </Form>
    )
}

export default FormMyAccount

const TitleStyle : React.CSSProperties={
    fontSize : '18px',
    color : '#006064',
    fontWeight : 'bold'
}