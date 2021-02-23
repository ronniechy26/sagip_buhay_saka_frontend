import React from 'react';
import { ModalContainer, Image, Column, Title, Label} from './ModalElement';

interface IModalContainerComposition {
    Title : React.FC;
    Column : React.FC;
    Image : React.FC<{src : string; alt : string}>;
    Label : React.FC;
}

const Modal : React.FC & IModalContainerComposition= ({children, ...restProps}) => {
    return (  <ModalContainer {...restProps}>{children} </ModalContainer> )
}
export default Modal;


Modal.Title = ({children, ...restProps}) => {
    return ( <Title {...restProps}>{children}</Title> )
}

Modal.Column = ({children, ...restProps}) => {
    return ( <Column {...restProps}>{children}</Column> )
}

Modal.Image= ({ ...restProps}) => {
    return ( <Image {...restProps}/> )
}

Modal.Label = ({children, ...restProps}) => {
    return ( <Label {...restProps}>{children}</Label> )
}
