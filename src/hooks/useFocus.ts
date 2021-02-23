import React from 'react';
import { Input } from 'antd';

const useFocus = (init :any) => {
    const nodeRef = React.useRef<Input>(init)
    const setFocus = () => {
       if(nodeRef.current){
            nodeRef.current.focus();
       }
    }
    return { nodeRef, setFocus }
}

export default useFocus;