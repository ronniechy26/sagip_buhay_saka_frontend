import React from 'react';
import { Modal, Form as AntForm } from 'antd';
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { Store } from "antd/lib/form/interface";
import { FcBusinessman, FcLock } from "react-icons/fc"

import { Login } from '../../components';

import LoginSvg from '../../Images/login.svg';


export interface ILogin {
    visible : boolean;
    toggleVisible : ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void);
    LoginUser : (data: { username: string; password: string;}) => Promise<void>
}

const LoginContainer : React.FC<ILogin> = ({visible, toggleVisible, LoginUser}) => {
    const [loading, setLoading] = React.useState(false);

    const onFinish : ((values: any) => void) | undefined = React.useCallback( async (values: Store)  => {
        setLoading(true)
        await LoginUser({username : values.username, password : values.password});
        setLoading(false);
    }, [LoginUser, setLoading]);

    const onFinishFailed : ((errorInfo: ValidateErrorEntity<any>) => void) | undefined= (errorInfo) =>{
        console.log(errorInfo);
    }

    React.useEffect(() =>() => setLoading(false), [])

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
            <Login>
                <Login.Image src={LoginSvg} alt="login"/>
                <Login.Column2>
                    <Login.Title>Account Login</Login.Title>
                    <AntForm
                        initialValues={{ username : "" , password : "" }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <AntForm.Item
                            name="username"
                            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                        >
                            <Login.InputLogin 
                                className="row-margin-bottom"
                                placeholder="Email"
                                prefix={<FcBusinessman />} 
                            />
                        </AntForm.Item>
                        <AntForm.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Login.InputPasswordLogin     
                                className="row-margin-bottom"
                                placeholder="password"
                                prefix={<FcLock />} 
                            />
                        </AntForm.Item>
                        <AntForm.Item>
                            <Login.ButtonLogin loading={loading} htmlType="submit"> Login </Login.ButtonLogin>
                        </AntForm.Item>
                    </AntForm>
                </Login.Column2>
            </Login>
        </Modal>
    )
}

export default LoginContainer
