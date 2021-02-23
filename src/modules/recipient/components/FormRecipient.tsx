import React, {useState}  from 'react';
import {  Form, Input, Row , InputNumber, Select} from 'antd';
import { ModalContainer} from '../../../components'
import {FormInstance} from 'antd/lib/form';
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { Store } from "antd/lib/form/interface";
const RegionData = require('../../../data/RegionData.json');
const ProvinceData = require('../../../data/ProvinceData.json');
const { Option } = Select;

interface IFormRecipient {
    form : FormInstance<any>;
    onFinish: ((values: Store) => void) ;
    onFinishFailed : ((errorInfo: ValidateErrorEntity<any>) => void);
}

const FormRecipient :  React.FC<IFormRecipient> = ({form, onFinish, onFinishFailed}) => {
    const [ selectedRegion , setSelectedRegion] = useState('')

    const onSelectRegion = (val : any, item : any) =>{
        setSelectedRegion(item.key);
        form.setFieldsValue({'province' : ''});
    }

    return (
        <Form
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
        >
            <Row className="row-margin-bottom2" > 
                <span style={TitleStyle}>Primary Information</span>
            </Row>
            <Row>
                <ModalContainer.Label>Last Name</ModalContainer.Label>
            </Row>
            <Row>
                <Form.Item
                    name="last_name"
                    rules={[{ required: true, message: 'Please input required fields!' }]}
                >
                    <Input
                        placeholder="Last Name"
                        style={{width : '200%'}}
                    />
                </Form.Item>
            </Row>
            <Row>
                <ModalContainer.Label>First Name</ModalContainer.Label>
            </Row>
            <Row>
                <Form.Item
                    name="first_name"
                    rules={[{ required: true, message: 'Please input required fields!' }]}
                >
                    <Input
                        placeholder="First Name"
                        style={{width : '200%'}}
                    />
                </Form.Item>
            </Row>
            <Row>
                <ModalContainer.Label>Middle Name</ModalContainer.Label>
            </Row>
            <Row>
                <Form.Item
                    name="middle_name"
                    rules={[{ required: false, message: 'Please input required fields!' }]}
                >
                    <Input
                        placeholder="Middle Name"
                        style={{width : '200%'}}
                    />
                </Form.Item>
            </Row>
            <Row className="row-margin-bottom2" > 
                <span style={TitleStyle}>Contact Details</span>
            </Row>
            <Row>
                <ModalContainer.Label>Mobile Number</ModalContainer.Label>
            </Row>
            <Row>
                <span style={spanStyle}>+63</span>
                <Form.Item
                    name="contact_number"
                    rules={[{ required: true, message: 'Please input required fields!' }]}
                >
                    <InputNumber
                        precision={0}
                        min={0}
                        minLength={10}
                        maxLength={10}
                        style={{width : '188%'}}
                    />
                </Form.Item>
            </Row>
            <Row className="row-margin-bottom2" > 
                <span style={TitleStyle}>Location</span>
            </Row>
            <Row>
                <ModalContainer.Label>Region</ModalContainer.Label>
            </Row>
            <Row>
                <Form.Item
                    name="region"
                    rules={[{ required: true, message: 'Please input required fields!' }]}
                >
                    <Select 
                        onSelect={onSelectRegion} 
                        style={{width : '400px'}}                 
                        placeholder="Select Region"
                    >
                        { 
                            RegionData.map((region : any) =>{
                                return(
                                    <Option value={region.title} key={region.regCode}>
                                        {region.title}
                                    </Option>
                                )
                            })
                        }
                    </Select> 
                </Form.Item>
            </Row>
            <Row>
                <ModalContainer.Label>Province</ModalContainer.Label>
            </Row>
            <Row>
                <Form.Item
                    name="province"
                    rules={[{ required: true, message: 'Please input required fields!' }]}
                >
                    <Select 
                        style={{width : '400px'}}                 
                        placeholder="Select Province"
                    >
                        { 
                            ProvinceData.filter((x : any) => x.regCode === selectedRegion).map((prov : any) =>{
                                return(
                                    <Option value={prov.provDesc} key={prov.provCode}>
                                        {prov.provDesc}
                                    </Option>
                                )
                            })
                        }
                    </Select> 
                </Form.Item>
            </Row>
        </Form>
    )
}

export default FormRecipient

const spanStyle : React.CSSProperties ={
    textAlign : 'center',
    fontSize : '14px',
    marginTop : '5px',
    color : '#006064',
    fontWeight : 'bold'
}

const TitleStyle : React.CSSProperties={
    fontSize : '18px',
    color : '#006064',
    fontWeight : 'bold'
}