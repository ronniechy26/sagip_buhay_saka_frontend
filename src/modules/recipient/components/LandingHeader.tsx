import React from 'react';
import { useHistory} from 'react-router-dom';
import { Button} from 'antd';
import { FormInstance} from 'antd/lib/form';
import { PlusOutlined , CloseOutlined} from '@ant-design/icons';
import { LandingHeader as Header } from '../../../components'

interface IHeaderProps {
    action : 'add' | 'edit';
    form : FormInstance<any>;
    loading : boolean;
}

const LandingHeader : React.FC<IHeaderProps> = ({action, form, loading}) => {
    const history = useHistory();

    return (
        <Header>
            <Header.Title>
                {action === 'add' ? 'Add Recipient' : 'Modify Recipient'}
            </Header.Title>
            <Header.ButtonWrapper>
                <Button 
                    onClick={() => form.submit()}
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
                        history.goBack();
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
