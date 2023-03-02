import React, { useState, useEffect } from 'react';
import { Select, Input, Form, Row, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components/macro';
import { ModalContainer } from '../../../../components';
import { ILivelihoodList } from '../landing';
import { ILivelihood } from '../../../../models/LivelihoodModel';
import { FormInstance } from 'antd/lib/form';
import { find } from 'lodash';
import { IHazard } from '../../../../models/HazardModel';

interface IProps {
    item: ILivelihoodList;
    removeLivelihood: (id: number) => void;
    livelihood_list: Array<ILivelihood>;
    LivelihoodListChange: (value, index, column) => void;
    hazardChange: (index, hazard, risk, advisory) => void;
    fetch_hazard_by_id : (id:string) => void;
    index: number;
    form?: FormInstance<any>,
    hazards?: IHazard[]
}

const LivelihoodList: React.FC<IProps> = ({
    removeLivelihood,
    LivelihoodListChange,
    item,
    livelihood_list = [],
    fetch_hazard_by_id,
    index,
    hazards,
    hazardChange
}) => {

    const [selectedLivelihood, setSelectedLivelihood] = useState<number | null>(null);
    const [prod_stage, setProdStage] = useState<any>([]);
    const [hazard, setHazard] = useState<any>([]);


    useEffect(() => {
        if (!selectedLivelihood) return;
        const livelihood = find(
            livelihood_list, { 'id': selectedLivelihood.toString() }
        );
        if (!livelihood) return;
        setProdStage(livelihood?.production_stage ?? []);

    }, [
        selectedLivelihood,
        livelihood_list,
    ]);


    useEffect(() => {
        if(hazards) setHazard(hazards)
    }, [hazards])


    const get_hazard = (id :any) => {
        fetch_hazard_by_id(id);
    } 

    const hazards_options = hazard.map((item : IHazard, i : number) => {
        return {
            key : i,
            value : item.id,
            label : item.hazard,
            hazard : item
        }
    })

    return (
        <div
            style={{ borderBottom: '1px solid #006064', marginTop: '10px' }}
        >
            <Row>
                <Col span={6}>
                    <div>
                        <SpanStyle>
                            <ModalContainer.Label>Livelihood :</ModalContainer.Label>
                        </SpanStyle>
                    </div>
                    <div>
                        <SpanStyle>
                            <Form.Item
                                name={`list[${item.id}].livelihood`}
                                rules={[{ required: true, message: 'Please input required fields!' }]}
                                noStyle
                            >
                                <SelectStyled2
                                    value={item.livelihood}
                                    onChange={(val) => {
                                        get_hazard(val);
                                        setSelectedLivelihood(val as number);
                                        LivelihoodListChange(val, index, 'livelihood');
                                    }}
                                >
                                    {livelihood_list.map((item) => {
                                        return (
                                            <Select.Option value={item.id} key={item.id}>
                                                {item.livelihood_name}
                                            </Select.Option>
                                        )
                                    })}
                                </SelectStyled2>
                            </Form.Item>
                        </SpanStyle>
                    </div>
                </Col>

                <Col span={7}>
                    <div>
                        <SpanStyle>
                            <ModalContainer.Label>Production Stage :</ModalContainer.Label>
                        </SpanStyle>
                    </div>
                    <div>
                        <SpanStyle>
                            <SelectStyled2
                                value={item.production_stage}
                                onChange={(val) => LivelihoodListChange(val, index, 'production_stage')}
                            >
                                {prod_stage.map((item, index) => {
                                    return (
                                        <Select.Option value={item} key={index}>
                                            {item}
                                        </Select.Option>
                                    )
                                })}
                            </SelectStyled2>
                        </SpanStyle>
                    </div>
                </Col>

                <Col span={8}>
                    <div>
                        <SpanStyle>
                            <ModalContainer.Label>Hazard:</ModalContainer.Label>
                        </SpanStyle>
                    </div>
                    <div>
                        <SpanStyle>
                            <SelectStyled
                                value={item.hazard}
                                onChange={(val, data: any) => {
                                    hazardChange(index, data.hazard.hazard, data.hazard.risk, data.hazard.advisory)
                                }}
                                options={hazards_options}
                            />
                        </SpanStyle>
                    </div>
                </Col>
            </Row>

            <Row className="row-margin-top2">
                <Col span={6}>
                    <div>
                        <SpanStyle>
                            <ModalContainer.Label>Risk :</ModalContainer.Label>
                        </SpanStyle>
                    </div>
                    <div>
                        {/* <SpanStyle>
                            <SelectStyled
                                value={item.risk}
                                onChange={(val) => LivelihoodListChange(val, index, 'risk')}
                            >
                                {risk.map((item, index) => {
                                    return (
                                        <Select.Option value={item} key={index}>
                                            {item}
                                        </Select.Option>
                                    )
                                })}
                            </SelectStyled>
                        </SpanStyle> */}

                        <SpanStyle>
                            <InputStyled 
                                value={item.risk} 
                                onChange={(val) => {
                                    LivelihoodListChange(val.target.value, index, 'risk')
                                }} 
                            />
                        </SpanStyle>
                    </div>
                </Col>

                <Col span={7}>
                    <div>
                        <SpanStyle>
                            <ModalContainer.Label>Advisory :</ModalContainer.Label>
                        </SpanStyle>
                    </div>

                    <div>
                        {/* <SpanStyle>
                            <SelectStyled2 
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
                            </SelectStyled2>
                        </SpanStyle> */}

                        <SpanStyle>
                            <InputStyled 
                                value={item.advisory} 
                                onChange={(val) => LivelihoodListChange(val.target.value, index, 'advisory')}
                             />
                        </SpanStyle>
                    </div>
                </Col>

                <Col span={8}>
                    <div>
                        <SpanStyle>
                            <ModalContainer.Label>Other Advisory :</ModalContainer.Label>
                        </SpanStyle>
                    </div>

                    <div>
                        <SpanStyle>
                            <Form.Item
                                style={{ display: 'inline-block', width: '200%' }}
                                name={`list[${index}].advisory`}
                                rules={[{ required: false, message: 'Please input required fields!' }]}
                            >
                                <Input.TextArea
                                    rows={2}
                                    value={item.advisory}
                                    onChange={(e) => LivelihoodListChange(e.target.value, index, 'other_advisory')}
                                />
                            </Form.Item>
                        </SpanStyle>
                    </div>
                </Col>

                <Col span={3}>
                    <IconStyleSpan>
                        <CloseOutlined onClick={() => removeLivelihood(item.id)} />
                    </IconStyleSpan>
                </Col>
            </Row>
        </div>
    )
}

export default LivelihoodList

const SpanStyle = styled.span`
    display: inline-block;
    margin-right : 20px;
`

const SelectStyled = styled(Select)`
    width : 320px;

    @media screen and (max-width: 1440px) {
        width : 250px;
    }

    @media screen and (max-width: 768px) {
        width : 170px;
    }
    
    @media screen and (max-width: 480px) {
        width : 150px;
    }
`

const SelectStyled2 = styled(Select)`
    width : 300px;

    @media screen and (max-width: 1440px) {
        width : 250px;
    }

    @media screen and (max-width: 768px) {
        width : 170px;
    }
    
    @media screen and (max-width: 480px) {
        width : 150px;
    }
`

const InputStyled = styled(Input)`
    width : 300px;

    @media screen and (max-width: 1440px) {
        width : 250px;
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