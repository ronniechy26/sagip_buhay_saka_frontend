import React from 'react'
import { RadioWrapper as Wrapper} from './RadioElements';

const RadioWrapper : React.FC = ({children, ...restProps}) => {
    return (
        <Wrapper {...restProps}>
            {children}
        </Wrapper>
    )
}

export default RadioWrapper
