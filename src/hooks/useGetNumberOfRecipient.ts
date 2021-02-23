import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IState } from '../ducks'
import axios from "axios";

import * as dotenv from 'dotenv';
dotenv.config();
const base = process.env.REACT_APP_API_ENDPOINT;

const useGetNumberOfRecipient  = () => {
    const location = useLocation<any>();
    const history = useHistory();
    const user = useSelector((state : IState) => state.UserReducer.data);
    const token = localStorage.getItem(process.env.REACT_APP_STORAGE_KEY_AUTH!);
    const [count, setCount] = useState('0');

    useEffect(() => {
        if(user && user.role === 'LGU') {
            return setCount(user.recipient_total ?? '0');
        }else{
            if(location.state === undefined){
                history.goBack();
            }else{
                axios({
                    url: `${base}/api/recipient_count`,
                    method: "GET",
                    params: { province : location.state.province },
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }).then((response) => {
                    setCount(response.data.recipient_count);
                })
            }
        }
    }, [location, history, token, user])

    return [count]
}

export default useGetNumberOfRecipient

