import React from 'react';
import { PaneDiv, Column1, Column2, Image } from './PaneElements';

interface IPaneComposition {
    Column1 : React.FC;
    Column2 : React.FC;
    Image : React.FC<{src : string; alt : string}>;
}

const Pane : React.FC & IPaneComposition = ({children, ...props}) => {
    return (
        <PaneDiv {...props}>
            {children}
        </PaneDiv>
    )
}
export default Pane

Pane.Column1 = ({children, ...restProps}) =>{
    return <Column1 {...restProps}>{children}</Column1>
}

Pane.Column2= ({children, ...restProps}) =>{
    return <Column2 {...restProps}>{children}</Column2>
}

Pane.Image= ({ ...restProps}) => {
    return ( <Image {...restProps}/> )
}