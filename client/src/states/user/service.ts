import api from "../../services/api";

export const signout = () => {
    return api.post('/auth/signout')
}

export const signin = (body: { email?: string, username?: string, password: string }): Promise<any> => {
    return api.post('/auth/signin', body);
}

export const getUsers = (): Promise<any> => {
    return api.get('/users/find');
}