import React, { useState } from 'react';
import { Modal, Select, Row, Form, Button } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { ModalContainer} from '../../../components';

const RegionData = require('../../../data/RegionData.json');
const ProvinceData = require('../../../data/ProvinceData.json');
const { Option } = Select;

interface IProps {
    visible : boolean;
    setVisible : React.Dispatch<React.SetStateAction<boolean>>;
    type : string
}

const ProvinceModal : React.FC<IProps> = ({ visible, setVisible, type}) => {
    const [ selectedRegion , setSelectedRegion] = useState('')
    const [ form ] = Form.useForm();
    const history = useHistory();

    const onSelectRegion = (val : any, item : any) =>{
        setSelectedRegion(item.code);
    }

    const onOk = async () =>{
        try {
            const data = await form.validateFields();
            history.push({
                pathname: `/sagip/advisory/add/${type}`,
                state : {province : data.province}
            })
        }catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    return (
        <Modal
            wrapClassName="modal-border"
            width={500}
            visible={visible}
            footer={null}
            maskClosable={false}
            destroyOnClose={true}
            onCancel={() => setVisible(false)}
            bodyStyle={{
                backgroundColor: 'whitesmoke'
            }}
        >
            <Form form={form}>
                <Row className="row-margin-bottom2" > 
                    <span style={TitleStyle}>Recipient Location</span>
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
                                RegionData.map((region : any, index) =>{
                                    return(
                                        <Option value={region.title} code={region.regCode} key={index}>
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
                                        <Option value={prov.provDesc} key={prov.psgcCode}>
                                            {prov.provDesc}
                                        </Option>
                                    )
                                })
                            }
                        </Select> 
                    </Form.Item>
                </Row>
                <Row>
                    <Button 
                        htmlType="submit" 
                        type="primary" 
                        icon={<PlusOutlined />} 
                        onClick={onOk}
                    >
                        Ok
                    </Button>
                    <Button 
                        icon={<CloseOutlined />} 
                        style={{marginLeft : '10px'}}
                        onClick={() => setVisible((prev) => !prev)}
                    >
                        Cancel
                    </Button>
                </Row>
            </Form>
        </Modal>
    )
}

export default ProvinceModal 

const TitleStyle : React.CSSProperties={
    fontSize : '18px',
    color : '#006064',
    fontWeight : 'bold'
}