import React, { useState, useEffect } from 'react';
import { Select, Input, Form } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components/macro';
import {  ModalContainer } from '../../../../components';
import { ILivelihoodList } from '../landing';
import { ILivelihood } from '../../../../models/LivelihoodModel';
import { FormInstance } from 'antd/lib/form';
import { find }  from 'lodash';

interface IProps { 
    item : ILivelihoodList;
    removeLivelihood : (id : number) => void;
    livelihood_list: Array<ILivelihood>;
    LivelihoodListChange : (value, index, column) => void;
    index : number;
    form? : FormInstance<any>
}

const LivelihoodList : React.FC<IProps> = ({ 
    removeLivelihood , 
    LivelihoodListChange,
    item,
    livelihood_list = [],
    index
}) => {

    const [selectedLivelihood, setSelectedLivelihood] = useState<number|null>(null);
    const [ risk, setRisk] = useState<any>([]);
    const [ prod_stage, setProdStage] = useState<any>([]);
    const [ hazard, setHazard] = useState<any>([]);
    const [ advice, setAdvice] = useState<any>([]);

    useEffect(() => {
        if(!selectedLivelihood) return;
        const livelihood = find( 
            livelihood_list , { 'id': selectedLivelihood.toString() }
        );    

        if(!livelihood) return;
        setRisk(livelihood?.risk ?? []);
        setProdStage(livelihood?.production_stage ?? []);
        setHazard(livelihood?.hazard ?? []);
        setAdvice(livelihood?.advice ?? []) ;
       
    }, [
        selectedLivelihood,
        livelihood_list,
    ]);

    return (
        <div
            style={{ borderBottom : '1px solid #006064', marginTop : '10px'}}
        >
            <SpanStyle>
                <ModalContainer.Label>Livelihood :</ModalContainer.Label>
            </SpanStyle>
            <SpanStyle>
                <Form.Item
                    name={`list[${item.id}].livelihood`}
                    rules={[{ required: true, message: 'Please input required fields!' }]}
                >
                    <SelectStyled
                        style={{width : '200px'}}
                        value={item.livelihood}
                        onChange={(val) => {
                            setSelectedLivelihood(val as number);
                            LivelihoodListChange(val, index, 'livelihood');
                        }}
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
                    {prod_stage.map((item, index) => {
                        return(
                            <Select.Option value={item} key={index}>
                                {item}
                            </Select.Option>
                        )
                    })}
                </SelectStyled>
            </SpanStyle>
            <SpanStyle>
                <ModalContainer.Label>Hazard:</ModalContainer.Label>
            </SpanStyle>
            <SpanStyle>
                <SelectStyled
                  value={item.hazard}
                  onChange={(val) => LivelihoodListChange(val, index, 'hazard')}
                >
                    {hazard.map((item, index) => {
                        return(
                            <Select.Option value={item} key={index}>
                                {item}
                            </Select.Option>
                        )
                    })}
                </SelectStyled>
            </SpanStyle>
            <div>
            <SpanStyle>
                <ModalContainer.Label>Risk :</ModalContainer.Label>
            </SpanStyle>
            <SpanStyle>
                <SelectStyled
                  value={item.risk}
                  onChange={(val) => LivelihoodListChange(val, index, 'risk')}
                >
                    {risk.map((item, index) => {
                        return(
                            <Select.Option value={item} key={index}>
                                {item}
                            </Select.Option>
                        )
                    })}
                </SelectStyled>
            </SpanStyle>
            
            <SpanStyle>
                <ModalContainer.Label>Advisory :</ModalContainer.Label>
            </SpanStyle>
            <SpanStyle>
                <SelectStyled
                    value={item.advisory}
                    onChange={(val) => LivelihoodListChange(val, index, 'advisory')}
                    >
                        {advice.map((item, index) => {
                            return(
                                <Select.Option value={item} key={index}>
                                    {item}
                                </Select.Option>
                            )
                        })}
                </SelectStyled>
            </SpanStyle>
            
            <div className="row-margin-top row-margin-bottom2" >
            <SpanStyle>
                    <ModalContainer.Label>Other Advisory :</ModalContainer.Label>
            </SpanStyle>
            
            <SpanStyle>
                    <Form.Item
                        style={{display : 'inline-block', width : '300%'}}
                        name={`list[${index}].advisory`}
                        rules={[{ required: true, message: 'Please input required fields!' }]}
                        >
                        <Input.TextArea 
                            rows={1} 
                            value={item.advisory}
                            onChange={(e) => LivelihoodListChange(e.target.value, index, 'other_advisory')}
                        /> 
                    </Form.Item>   
                </SpanStyle>
           
            <SpanStyle2>
                    <IconStyleSpan>
                        <CloseOutlined onClick={() => removeLivelihood(item.id)}/>
                    </IconStyleSpan>
                </SpanStyle2>
            </div>
            </div>
            <div className="row-margin-bottom2"></div>
        </div>
    )
}

export default LivelihoodList

const SpanStyle = styled.span`
    display: inline-block;
    margin-right : 20px;
`
const SpanStyle2 = styled.span`
    display: inline-block;
    margin-right : 20px;
    margin-left : 430px;
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