import React, { useEffect, useState } from 'react';
import { Modal, Spin, Row, Form, InputNumber, Button, notification } from 'antd';
import { ModalContainer } from '../../../components';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import CreditSVG from '../../../Images/credit.svg';
import { IUser } from '../../../models/UserModel';
import { render_table_name } from '../../../selectors/UserSelector';
const { confirm } = Modal;

interface IProps {
    visible: boolean;
    setVisibleCredit :  React.Dispatch<React.SetStateAction<boolean>>;
    status : any;
    selected_user : IUser;
    update_credit : (id :string, data : any) => void;
}

const UpdateCreditModal : React.FC<IProps> = ({ 
    visible , 
    setVisibleCredit, 
    update_credit,
    status,
    selected_user
}) => {
    const read_loading = (status['USER_SET_SELECTED'] ? status['USER_SET_SELECTED'].fetching : false);
    const [ form ] = Form.useForm();
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        if(!selected_user) return;
        form.setFieldsValue({
            credits : selected_user.credit_count ? selected_user.credit_count : 0
        })
    }, [selected_user, form])

    useEffect(() => {
        if(flag && status['USER_UPDATE_CREDIT'] ) {
            if (status['USER_UPDATE_CREDIT'].error === null) {
                notification.success({ 
                    message:  `Credit successfully updated!`
                })
                setVisibleCredit(false);
            }
            setFlag(false);
        }
    }, [status, flag, setVisibleCredit]);

    const onSave = React.useCallback(() => {
        if(!selected_user) return;
        confirm({
            title: `Update Credit`, 
            content: `Are you sure you want to update credit ?`,
            okText:'Yes',
            cancelText:'No',
            onOk : async () => {
                try {
                    const data = (await form.validateFields());
                    update_credit(selected_user.id ?? '', {credits : data.credits});
                    setTimeout(() => setFlag(true), 500);
                }catch (errInfo) {
                    console.log('Validate Failed:', errInfo);
                }
            },
            onCancel() { }
        })
    }, [setFlag, form, update_credit, selected_user])

    return (
       <Modal
            wrapClassName="modal-border"
            width={800}
            visible={visible}
            footer={null}
            maskClosable={false}
            onCancel={() => setVisibleCredit(false)}
            bodyStyle={{
                backgroundColor: 'whitesmoke'
            }}
       >
           {read_loading ? <Spin style={{minHeight : '57vh'}} /> : (
                <ModalContainer>
                    <div style={{
                       width : '50%',
                       paddingLeft : '20px'
                    }}>
                        <Form
                            form={form}
                        >
                            <Row className="row-margin-bottom4">
                                <ModalContainer.Title>{render_table_name(selected_user)}</ModalContainer.Title>
                            </Row>
                            <Row>
                            <ModalContainer.Label>Credit Count</ModalContainer.Label>
                            </Row>
                            <Row>
                                <Form.Item
                                    name="credits"
                                    rules={[{ required: true, message: 'Please input required fields!' }]}
                                >
                                    <InputNumber
                                        placeholder="credits"
                                        style={{width : '120%'}}
                                    />
                                </Form.Item>
                            </Row>
                            <Row>
                                <Button 
                                    htmlType="submit" 
                                    type="primary" 
                                    icon={<PlusOutlined />} 
                                    onClick={onSave}
                                    loading={flag}
                                >
                                    Save
                                </Button>
                                <Button 
                                    icon={<CloseOutlined />} 
                                    style={{marginLeft : '10px'}}
                                    onClick={() => setVisibleCredit(false)}
                                    loading={flag}
                                >
                                    Cancel
                                </Button>
                            </Row>
                        </Form>
                    </div>
                    <ModalContainer.Column>
                        <ModalContainer.Image src={CreditSVG} alt="Credit Update"/>
                    </ModalContainer.Column>
                </ModalContainer> 
           )}
       </Modal>
    )
}

export default UpdateCreditModal
