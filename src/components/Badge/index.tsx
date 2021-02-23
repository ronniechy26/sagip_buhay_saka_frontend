import React from 'react';
import { Badge } from 'antd';
import { Wrapper} from './BadgeElement';

type badgeType = {
    value : boolean | number; 
    textIfTrue: string; 
    textIffalse: string
}

interface IBadgeComposition {
    render_badge : React.FC<badgeType>;
}

const BadgeWrapper  : React.FC & IBadgeComposition = ({children, ...restProps}) => {
    return (<></>)
}

export default BadgeWrapper

BadgeWrapper.render_badge  = (data : badgeType) => {
    let statColor = '';
    let badgeText = '';
   
    if (data.value === 1 || data.value === true ) {
        badgeText = data.textIfTrue;
        statColor = '#53C262';
    } else {
        badgeText = data.textIffalse;
        statColor = 'rgba(226, 126, 105, 1)';
    }

    return <Wrapper statusColor={statColor}>
                <Badge color={statColor} text={badgeText} />
            </Wrapper>
}