import React from 'react';
import { Container, LoginButton, LoginInput, LoginInputPassword, Title, Column2 , Image} from './LoginElements';

interface IAntdInput {
    className: string;
    placeholder:  string;
    prefix : JSX.Element
}

interface IAntdButton {
    loading: boolean;
    htmlType: string;
}

interface ILoginComposition {
    Title : React.FC;
    Column2 : React.FC;
    Image : React.FC<{src : string; alt : string}>;
    InputLogin : React.FC<IAntdInput>;
    InputPasswordLogin : React.FC<IAntdInput>;
    ButtonLogin : React.FC<IAntdButton>;
}

const Login : React.FC & ILoginComposition= ({children, ...restProps}) => {
    return ( <Container {...restProps}>{children}</Container> )
}
export default Login

Login.Title = ({children, ...restProps}) => {
    return ( <Title {...restProps}>{children}</Title> )
}

Login.Column2= ({children, ...restProps}) => {
    return ( <Column2 {...restProps}>{children}</Column2> )
}

Login.Image= ({ ...restProps}) => {
    return ( <Image {...restProps}/> )
}

Login.InputLogin= ({ children, ...restProps}) => {
    return ( <LoginInput {...restProps}>{children}</LoginInput>  )
}

Login.ButtonLogin = ({ children, ...restProps}) => {
    return ( <LoginButton {...restProps}>{children}</LoginButton>  )
}

Login.InputPasswordLogin= ({ children, ...restProps}) => {
    return ( <LoginInputPassword {...restProps}>{children}</LoginInputPassword>  )
}
