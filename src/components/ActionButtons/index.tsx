import React from 'react';
import { ActionButtonWrapper, BackButtonWrapper } from './ActionButtonsElement';

interface IActoinButtonComposition {
    BackButton : React.FC;
}

const ActionButton : React.FC & IActoinButtonComposition = ({children, ...restProps}) => {
    return (
        <ActionButtonWrapper {...restProps}>
            {children}
        </ActionButtonWrapper>
    )
}

export default ActionButton;

ActionButton.BackButton = ({children, ...restProps}) =>{
        return <BackButtonWrapper {...restProps}>{children}</BackButtonWrapper>
}