import React from 'react';
import { Select, Input, Form } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components/macro';
import {  ModalContainer } from '../../../../components';
import { ILivelihoodList } from '../landing';
import { ILivelihood } from '../../../../models/LivelihoodModel';
import { IProductionStage } from '../../../../models/ProductionStageModel';
import { IRisk } from '../../../../models/RiskModel';
import { FormInstance } from 'antd/lib/form';

interface IProps { 
    item : ILivelihoodList;
    removeLivelihood : (id : number) => void;
    livelihood_list: Array<ILivelihood>;
    production_stage_list : Array<IProductionStage>;
    risk_list : IRisk[];
    LivelihoodListChange : (value, index, column) => void;
    index : number;
    form? : FormInstance<any>
}

const LivelihoodList : React.FC<IProps> = ({ 
    removeLivelihood , 
    LivelihoodListChange,
    item,
    livelihood_list = [],
    production_stage_list = [],
    risk_list = [],
    index
}) => {
    
    return (
        <div
            style={{ borderBottom : '1px solid #006064', marginTop : '10px'}}
        >
            <SpanStyle>
                <ModalContainer.Label>Livelihood :</ModalContainer.Label>
            </SpanStyle>
            <SpanStyle>
                <Form.Item
                    name={`list[${index}].livelihood`}
                    rules={[{ required: true, message: 'Please input required fields!' }]}
                >
                    <SelectStyled
                        style={{width : '200px'}}
                        value={item.livelihood}
                        onChange={(val) => LivelihoodListChange(val, index, 'livelihood')}
                    >
                        {livelihood_list.map((item) => {
                            return(
                                <Select.Option value={item.id} key={item.id}>
                                    {item.livelihood_name}
                                </Select.Option>
                            )
                        })}
                    </SelectStyled>
                </Form.Item>
            </SpanStyle>
            <SpanStyle>
                <ModalContainer.Label>Production Stage :</ModalContainer.Label>
            </SpanStyle>
            <SpanStyle>
                <SelectStyled
                  value={item.production_stage}
                  onChange={(val) => LivelihoodListChange(val, index, 'production_stage')}
                >
                    {production_stage_list.map((item) => {
                        return(
                            <Select.Option value={item.id} key={item.id}>
                                {item.production_stage_name}
                            </Select.Option>
                        )
                    })}
                </SelectStyled>
            </SpanStyle>
            <SpanStyle>
                <ModalContainer.Label>Risk :</ModalContainer.Label>
            </SpanStyle>
            <SpanStyle>
                <SelectStyled
                  value={item.risk}
                  onChange={(val) => LivelihoodListChange(val, index, 'risk')}
                >
                    {risk_list.map((item) => {
                        return(
                            <Select.Option value={item.id} key={item.id}>
                                {item.risk_name}
                            </Select.Option>
                        )
                    })}
                </SelectStyled>
            </SpanStyle>
            <IconStyleSpan>
                <CloseOutlined onClick={() => removeLivelihood(item.id)}/>
            </IconStyleSpan>
            <div className="row-margin-top row-margin-bottom2" >
                <span className="display-inline-block" style={{margin : '10px 50px 0 0'}}>
                    <ModalContainer.Label>Advisory:</ModalContainer.Label>
                </span>
                <span>
                    <Form.Item
                        style={{display : 'inline-block', width : '40%', marginTop : '10px' }}
                        name={`list[${index}].advisory`}
                        rules={[{ required: true, message: 'Please input required fields!' }]}
                    >
                        <Input.TextArea 
                            rows={1} 
                            value={item.advisory}
                            onChange={(e) => LivelihoodListChange(e.target.value, index, 'advisory')}
                        /> 
                    </Form.Item>   
                </span>
            </div>
        </div>
    )
}

export default LivelihoodList

const SpanStyle = styled.span`
    display: inline-block;
    margin-right : 20px;
`

const SelectStyled = styled(Select)`
    width : 300px;

    @media screen and (max-width: 1440px) {
        width : 200px;
    }

    @media screen and (max-width: 768px) {
        width : 170px;
    }
    
    @media screen and (max-width: 480px) {
        width : 150px;
    }
`

const IconStyleSpan = styled.span`
    cursor : pointer;

    .anticon.anticon-close {
      color: red;
      font-size: 20px;
    }

    .anticon.anticon-close:hover{
      color: #006064;
    }

`