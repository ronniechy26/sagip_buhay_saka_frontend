import React from 'react'
import { SwitchWrapper} from './SwitchElements';

const Switch : React.FC = ({children, ...restProps}) => {
    return (
        <SwitchWrapper {...restProps}>
            {children}
        </SwitchWrapper>
    )
}

export default Switch
