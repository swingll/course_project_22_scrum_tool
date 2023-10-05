import * as React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { AppState } from '../states'

const api = axios.create({ baseURL: '/' });

export function useAxios() {
    const token = useSelector<AppState, AppState['user']['token']>((state) => state.user.token);

    React.useMemo(() => {
        api.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null;
    }, [token]);
}

export default api;