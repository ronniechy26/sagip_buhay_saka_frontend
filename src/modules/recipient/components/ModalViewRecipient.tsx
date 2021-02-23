import React from 'react';
import { Modal, Spin , Row , Col } from 'antd';
import { IRecipient } from '../../../models/RecipientModel';
import { ModalContainer } from '../../../components'
import ViewRecipientSVG from '../../../Images/view_recipient.svg';

interface IModalProps {
    showModal: boolean;
    setShowModal : React.Dispatch<React.SetStateAction<boolean>>;
    data : IRecipient;
    status : any
}

const ModalViewRecipient : React.FC<IModalProps> = ({
    showModal, 
    setShowModal,
    status,
    data
}) => {

    const read_loading = (status['RECIPIENT_READ'] ? status['RECIPIENT_READ'].fetching : false);
    const onCancelClose = () =>{
        setShowModal(false);
    }
  
    return (
        <Modal
            wrapClassName="modal-border"
            width={900}
            visible={showModal}
            footer={null}
            maskClosable={false}
            onCancel={onCancelClose}
            bodyStyle={{
                backgroundColor: 'whitesmoke'
            }}
        >
            {read_loading ? <Spin style={{minHeight : '57vh'}} /> :
               <ModalContainer> 
                    <div style={{
                        width : '50%',
                        paddingLeft : '60px'
                    }}>
                        <Row className="row-margin-bottom">
                            <ModalContainer.Title >View Recipient</ModalContainer.Title>
                        </Row>
                        <Row className="row-margin-bottom2"> 
                            <span style={TitleStyle}>Primary Information</span>
                        </Row>
                        <Row className="row-margin-bottom">
                            <Col span={12}>
                                <ModalContainer.Label>First Name</ModalContainer.Label>
                            </Col>
                            <Col>
                                <span style={textStyle}>{data.first_name}</span>
                            </Col>
                        </Row>
                        <Row className="row-margin-bottom">
                            <Col span={12}>
                                <ModalContainer.Label>Middle Name</ModalContainer.Label>
                            </Col>
                            <Col>
                               <span style={textStyle}>{data.middle_name ?? '---'}</span>
                            </Col>
                        </Row>
                        <Row className="row-margin-bottom">
                            <Col span={12}>
                                <ModalContainer.Label>Last Name</ModalContainer.Label>
                            </Col>
                            <Col>
                                <span style={textStyle}>{data.last_name}</span>
                            </Col>
                        </Row>
                        <Row className="row-margin-bottom2"> 
                            <span style={TitleStyle}>Contact Details</span>
                        </Row>
                        <Row className="row-margin-bottom">
                            <Col span={12}>
                                <ModalContainer.Label>Mobile Numner</ModalContainer.Label>
                            </Col>
                            <Col>
                                <span style={textStyle}>+63{data.contact_number}</span>
                            </Col>
                        </Row>
                        <Row className="row-margin-bottom2"> 
                            <span style={TitleStyle}>Location Details</span>
                        </Row>
                        <Row className="row-margin-bottom">
                            <Col span={12}>
                                <ModalContainer.Label>Region</ModalContainer.Label>
                            </Col>
                            <Col>
                                <span style={textStyle}>{data.region}</span>
                            </Col>
                        </Row>
                        <Row className="row-margin-bottom">
                            <Col span={12}>
                                <ModalContainer.Label>Province</ModalContainer.Label>
                            </Col>
                            <Col>
                                <span style={textStyle}> {data.province}</span>
                            </Col>
                        </Row>
                   </div>

                   <ModalContainer.Column>
                        <ModalContainer.Image src={ViewRecipientSVG} alt="Account Add Edit"/>
                   </ModalContainer.Column>

               </ModalContainer>
            }
        </Modal>
    )
}

export default ModalViewRecipient

const TitleStyle : React.CSSProperties={
    fontSize : '16px',
    color : "gray",
    fontWeight : 'bold'
}

const textStyle : React.CSSProperties = {
    color: '#4c4d4e',
    fontSize: '14px',
    fontFamily: 'Montserrat',
    fontWeight : 600

}