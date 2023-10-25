import * as React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { AppState } from '../states'

const api = axios.create({ baseURL: '/' });

api.interceptors.response.use(
    (data)=>data,
    (error)=>{
        if(typeof error === 'string'){
            return Promise.reject(error)
        }else{
            error = error.response.data
            if(error["error"]){
                return Promise.reject(error["error"].message)
            }else{
                return Promise.reject(error.message)
            }
        }
    }
)
export function useAxios() {
    const token = useSelector<AppState, AppState['user']['token']>((state) => state.user.token);

    React.useMemo(() => {
        api.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null;
    }, [token]);
}

export default api;