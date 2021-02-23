import React from 'react'
import { TableWrapper as Wrapper, TableHeader , TableHeaderTitle, TableCount, TableButtonWrapper} from './TableElements';

interface ITableComposition {
    Header : React.FC;
    Title : React.FC;
    Count : React.FC;
    ButtonWrapper : React.FC;
}

const TableWrapper : React.FC & ITableComposition = ({children, ...restProps}) => {
    return ( <Wrapper {...restProps}> {children}</Wrapper>)
}
export default TableWrapper;

TableWrapper.Header = ({children, ...restProps}) =>{
    return <TableHeader {...restProps}>{children}</TableHeader>
}

TableWrapper.Title = ({children, ...restProps}) =>{
    return <TableHeaderTitle {...restProps}>{children}</TableHeaderTitle>
}

TableWrapper.Count = ({children, ...restProps}) =>{
    return <TableCount {...restProps}>{children}</TableCount>
}

TableWrapper.ButtonWrapper = ({children, ...restProps}) =>{
    return <TableButtonWrapper {...restProps}>{children}</TableButtonWrapper>
}