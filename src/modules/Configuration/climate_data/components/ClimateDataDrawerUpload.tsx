import React,  { useEffect, useState, useCallback } from 'react';
import { Drawer, Button, Form, Row , Select, Table, InputNumber, notification} from 'antd';
import { Store } from "antd/lib/form/interface";
import styled from 'styled-components/macro';
import { ModalContainer, Table as TableWrapper } from '../../../../components';

import { IClimateData } from '../../../../models/ClimateDataModel';
import { IUser } from '../../../../models/UserModel';
import download from "../../../../libraries/download";
import {TEMPLATE_LINK} from "../../../../constants/ClimateDataConstant"

interface IProps { 
    visible : boolean;
    onClose : () => void;
    status : any;
    data : IClimateData;
    user? : IUser;
}

const ClimateDataDrawer : React.FC<IProps> = ({
    visible, 
    onClose, 
}) => {

    const [ form ] = Form.useForm(); 
    const [ flag, setFlag ] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const resetClose = useCallback(() => {
        form.resetFields();
        onClose();
    }, [form, onClose])

    const FooterButtons = () =>{
        return (
            <FooterDiv>
                <Button 
                    loading={flag}
                    onClick={form.submit} 
                    type="primary" 
                    style={{ marginRight: 8 }}
                >
                    Save
                </Button>
                <Button  
                    loading={flag} 
                    onClick={resetClose}
                >
                    Cancel
                </Button>
            </FooterDiv>
        )
    }

    const onFinish = React.useCallback(( values: Store)  => {
       
    }, []);

    return (
        <StyledDrawer
            title={<TitleSpan>{`Upload Climate Data`}</TitleSpan>}
            width={'30%'}
            onClose={resetClose}
            visible={visible}
            destroyOnClose={true}
            maskClosable={false}
            bodyStyle={{ paddingBottom: 80 }}
            footer={<FooterButtons/>}
        >
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Row>
                    <ModalContainer.Label>Upload</ModalContainer.Label>
                </Row>
                <Row>
                
                </Row>

                <div style={{marginTop : "100px"}}>
                    <ModalContainer.Label>Download</ModalContainer.Label>
                </div>
                <div>
                    <a 
                        onClick={() => {
                            download(
                                {
                                  params: {
                                    location : TEMPLATE_LINK
                                  },
                                },
                                "Climatedata-template.xlsx",
                                setDownloading
                              );
                        }} 
                        style={{ textDecoration : "underline"}}
                    >
                        Climate data template
                    </a>
                </div>

            </Form>
        </StyledDrawer>
    )
}

export default ClimateDataDrawer

const FooterDiv = styled.div`
    text-align: left;
`
const TitleSpan = styled.span`
    font-size : 18px;
    font-weight : 700;
    color : #fff;
`
const StyledDrawer = styled(Drawer)`
    .ant-drawer-header { 
        background :rgb(0, 152, 159);
    }
    .anticon.anticon-close {
        color : #fff;
        font-size : 18px;
    }
`