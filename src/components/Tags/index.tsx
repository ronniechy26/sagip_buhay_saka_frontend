import React, { Fragment, useState } from 'react'
import { Wrapper, ButtonWrapper } from './TagsElement';
import { Button } from 'antd';
import { SmallDashOutlined } from '@ant-design/icons';

interface ITags {
    list : Array<string>;
    length : number;
    slice_list : Array<string>;
    id : string;
}

const Tags : React.FC<ITags> = ({children, list, length, slice_list, id, ...restProps}) => {

    const [showList, setShowList] = useState(false);

    const render = () =>{
        return (
            <Fragment>
                {
                    length > 2 ? 
                    (
                        <div>
                            {
                                showList ? 
                                (
                                    <div>
                                        {
                                            list.map((item, index) => {
                                                return (
                                                    <Wrapper key={index} {...restProps}> 
                                                        {item} 
                                                    </Wrapper>
                                                )
                                            })
                                        }
                                    </div>
                                ) 
                                :
                                (
                                    <div>  
                                        {
                                            slice_list.map((item, index) => {
                                                return (
                                                    <Wrapper key={index} {...restProps}> 
                                                        {item} 
                                                    </Wrapper>
                                                )
                                            })
                                        }
                                        <ButtonWrapper>
                                            <Button  
                                                icon={<SmallDashOutlined />}
                                                onClick = { e=>{
                                                    e.stopPropagation(); 
                                                    setShowList(true);
                                                }}
                                            /> 
                                        </ButtonWrapper>
                                        
                                    </div>
                                )
                            }
                            {
                                showList ? 
                                (
                                    <ButtonWrapper>
                                        <Button  
                                            icon={<SmallDashOutlined />}
                                            onClick = { e=>{
                                                e.stopPropagation(); 
                                                setShowList(false);
                                            }}
                                        /> 
                                    </ButtonWrapper>
                                )
                                :
                                (
                                    <span></span>
                                )
                            }
                        </div>
                    )
                    : 
                    (
                        <div>
                            {
                                list.map((item, index) => {
                                    return (
                                        <Wrapper key={index} {...restProps}> 
                                            {item} 
                                        </Wrapper>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </Fragment>
        )
    }

    return (
      <div>
          { render() }
      </div>
    )
}

export default Tags;
