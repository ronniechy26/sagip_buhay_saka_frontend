import React from 'react';
import { useHistory} from 'react-router-dom';
import { Button} from 'antd';
import { FormInstance} from 'antd/lib/form';
import { PlusOutlined , CloseOutlined} from '@ant-design/icons';
import { LandingHeader as Header } from '../../../components'

interface IHeaderProps {
    form : FormInstance<any>;
    loading : boolean;
    onSave : () =>  void;
}

const LandingHeader : React.FC<IHeaderProps> = ({ onSave, loading}) => {
    const history = useHistory();

    return (
        <Header>
            <Header.Title>
                {'My Account'}
            </Header.Title>
            <Header.ButtonWrapper>
                <Button 
                    onClick={() => onSave()}
                    type="primary" 
                    size="middle"
                    htmlType="submit"
                    style={{marginRight : '10px'}}
                    icon={<PlusOutlined />}
                    loading={loading}
                >
                    Save
                </Button>
                <Button  
                    onClick={() =>{
                        history.push({
                            pathname : '/sagip/board'
                        });
                    }}
                    loading={loading }
                    size="middle"
                    icon={<CloseOutlined />}
                />
            </Header.ButtonWrapper>
        </Header>
    )
}

export default LandingHeader
