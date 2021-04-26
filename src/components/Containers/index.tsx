import React from 'react'
import { Container, Card , Header , HeaderTitle, HeaderTitle2, HeaderTitleValue , HeaderTitleLabel, HeaderTitle3} from './ContainerElements';

interface IContainerComposition {
    Card : React.FC<{minHeight? : string}>;
    Header : React.FC;
    Title : React.FC;
    Title2 : React.FC;
    TitleValue : React.FC;
    TitleLabel : React.FC;
    Title3 : React.FC;
}

const SectionContainer : React.FC & IContainerComposition = ({children,  ...restProps}) => {
    return ( <Container { ...restProps}> { children} </Container> )
}

export default SectionContainer

SectionContainer.Card = ({children, minHeight, ...restProps}) =>{
    return<Card minHeight={minHeight} {...restProps}>{children}</Card>
}

SectionContainer.Header = ({children,  ...restProps}) =>{
    return<Header {...restProps}>{children}</Header>
}

SectionContainer.Title = ({children,  ...restProps}) =>{
    return<HeaderTitle {...restProps}>{children}</HeaderTitle>
}

SectionContainer.Title2 = ({children,  ...restProps}) =>{
    return<HeaderTitle2 {...restProps}>{children}</HeaderTitle2>
}

SectionContainer.Title3 = ({children,  ...restProps}) =>{
    return<HeaderTitle3 {...restProps}>{children}</HeaderTitle3>
}


SectionContainer.TitleValue = ({children,  ...restProps}) =>{
    return<HeaderTitleValue {...restProps}>{children}</HeaderTitleValue>
}

SectionContainer.TitleLabel = ({children,  ...restProps}) =>{
    return<HeaderTitleLabel {...restProps}>{children}</HeaderTitleLabel>
}