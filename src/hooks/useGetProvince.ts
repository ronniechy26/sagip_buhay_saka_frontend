import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IState } from '../ducks'

const useGetProvince = () => {
    const location = useLocation<any>();
    const history = useHistory();
    const user = useSelector((state : IState) => state.UserReducer.data);
    const [province, setProvince] = useState<null|string>(null);

    useEffect(() => {
        if(user && user.role !== 'LGU') {
            if(location.state === undefined){
                history.goBack();
            }
            setProvince(location.state.province);
        }
    }, [location, history, user]);
    
    return [province];
}

export default useGetProvince
