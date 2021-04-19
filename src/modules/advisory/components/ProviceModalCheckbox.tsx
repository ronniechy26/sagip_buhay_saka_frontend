import React, { useState } from 'react';
import { Modal, Row, Button, Collapse, Checkbox, Divider } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { LandingHeader } from '../../../components';

const RegionData = require('../../../data/RegionData.json');
const ProvinceData = require('../../../data/ProvinceData.json');

interface IProps {
    visible : boolean;
    setVisible : React.Dispatch<React.SetStateAction<boolean>>;
    type : string
}

const ProviceModalCheckbox : React.FC<IProps> = ({ visible = false, setVisible, type }) => {
    const history = useHistory();
    const [ selectedList, setSelectedList ] = useState(() =>{
        const init = RegionData.map((item) => {
            return {
                regCode : item.regCode,
                checkAll : false,
                inderterminate : false,
                selected : []
            }
        });
        return init;
    });

    const onOk = () =>{
        const provinces = selectedList.reduce((acc, curr) =>{
            return acc.concat(curr.selected)
        }, []);

        history.push({
            pathname: `/sagip/advisory/add/${type}`,
            state : {province : provinces }
        });
    }

    const render_header = (region : any) => {
        const selected = selectedList.find(x => x.regCode === region.regCode);
        return (
            <span onClick={(e) => e.stopPropagation()}>
                <StyledCheckbox
                    indeterminate={selected.inderterminate}
                    checked={selected.checkAll}
                    onChange={(e) => headerOnchange(e,region.regCode)}
                
                >
                    {region.title}
                </StyledCheckbox>
            </span>
        )
    }

    const headerOnchange = (e, code) =>{
        const DEFAULT_OPTIONS = ProvinceData.filter( x => x.regCode === code).map((x) => x.provDesc);
        const temp = selectedList.map((item) =>{
            return item.regCode === code ? 
            {
                ...item, 
                selected : e.target.checked ? DEFAULT_OPTIONS : [],
                inderterminate : false,
                checkAll : e.target.checked
            } : item;
        });
        setSelectedList(temp);
    };

    const onChange = ( list, code) => {
        const DEFAULT_OPTIONS = ProvinceData.filter( x => x.regCode === code).map((x) => x.provDesc);
        const temp = selectedList.map((item) =>{
            return item.regCode === code ? 
            {
                ...item, 
                selected : list,
                inderterminate : !!list.length  && list.length < DEFAULT_OPTIONS.length,
                checkAll : list.length === DEFAULT_OPTIONS.length 
            } : item;
        });
        setSelectedList(temp);
    };

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
            <div>
                <Row className="row-margin-bottom2" > 
                    <span style={TitleStyle}>Please Select Recipient Location</span>
                </Row>
            
                <Row>
                    <DivCollapse>
                        <Collapse 
                            accordion
                            bordered={false} 
                        >
                        {
                            RegionData.map((region : any, index) =>{

                                const DEFAULT_OPTIONS = ProvinceData.filter( 
                                    x => x.regCode === region.regCode
                                ).map((x) => x.provDesc);
                                const values = selectedList.find(x => x.regCode === region.regCode);

                                return(
                                    <Collapse.Panel 
                                        showArrow={false}
                                        key={index}
                                        header={render_header(region)}
                                    >
                                        <div style={{ paddingBottom: '5px' }}>
                                            <Divider dashed style={{ margin: '5px 0px 15px 0px' }} />
                                            <StyledCheckboxGroup
                                                options={DEFAULT_OPTIONS}
                                                onChange={(e) =>onChange(e, region.regCode)}
                                                value={values.selected}
                                            />
                                        </div>
                                    </Collapse.Panel>
                                )
                            }) 
                        }
                        </Collapse>
                    </DivCollapse>
                </Row>

                <Row className="row-margin-top3">
                    <LandingHeader.ButtonWrapper>
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
                    </LandingHeader.ButtonWrapper>
                </Row>
            </div>
        </Modal>
    )
}

export default ProviceModalCheckbox

const TitleStyle : React.CSSProperties={
    fontSize : '18px',
    color : '#006064',
    fontWeight : 'bold'
}

const StyledCheckbox = styled(Checkbox)({
    marginLeft: '10px',
    '.ant-checkbox-checked': {
        '.ant-checkbox-inner': {
            backgroundColor: '#70CCF9', 
            borderColor: '#70CCF9'
        },
    },

    '.ant-checkbox-indeterminate': {
        '.ant-checkbox-inner': {
            backgroundColor: 'white',

            '&::after': {
                backgroundColor: '#70CCF9',
            }
        }
    },

    span: {
        fontFamily: 'Montserrat',
        color: '#808080',
        opacity: '1',
        fontSize: '12px',
    }
});


const StyledCheckboxGroup = styled(Checkbox.Group)({
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'column',

    '.ant-checkbox-checked': {
        '.ant-checkbox-inner': {
            backgroundColor: '#70CCF9', 
            borderColor: '#70CCF9'
        },
    },

    '.ant-checkbox-indeterminate': {
        '.ant-checkbox-inner': {
            backgroundColor: 'white',

            '&::after': {
                backgroundColor: '#70CCF9',
            }
        }
    },

    span: {
        fontFamily: 'Montserrat',
        color: '#808080',
        opacity: '1',
        fontSize: '12px',
    }
});

const DivCollapse = styled.div`
    overflow-y: auto;
    max-height: calc(70vh - 100px);
    box-sizing: border-box;
    width : 490px;

    .ant-collapse > .ant-collapse-item > .ant-collapse-header {
        padding : 12px;
    }
`
