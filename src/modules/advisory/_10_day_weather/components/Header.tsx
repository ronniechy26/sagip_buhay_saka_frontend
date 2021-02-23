import React from 'react';
import { Button } from 'antd';
import { LandingHeader, Container , ActionButton} from '../../../../components';
import { useHistory } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { IState} from '../../../../ducks';

interface IProps {
    
}

const Header : React.FC<IProps> = () => {
    const history = useHistory();
    const user = useSelector((state : IState) => state.UserReducer.data);
    
    return (
        <LandingHeader>
            <LandingHeader.Title>{`Advisory - ${user?.first_name ?? '-'} ${user?.last_name ?? '-'}`}</LandingHeader.Title>
            <div
                style={{
                    display : 'flex',
                    justifyContent : 'space-between',
                    alignItems : 'flex-start'
                }}
            >
                <div style={{marginRight : '20px'}}>
                    <Container.TitleLabel>Credit :</Container.TitleLabel>
                    <Container.TitleValue>{user?.credit_count ?? '-'}</Container.TitleValue>
                </div>
                <ActionButton.BackButton>
                    <Button
                        onClick={() =>{
                            history.push({
                                pathname: `/sagip/advisory`,
                            })
                        }}
                    >
                        Back
                    </Button>
                </ActionButton.BackButton>
            </div>

        </LandingHeader>
    )
}

export default Header
