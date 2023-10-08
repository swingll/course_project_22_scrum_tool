import api from "../../services/api";

export const getTlinedetail = (id: string): Promise<any> => {
    return api.get(`/tlinedetail/find/${id}`)
}

export const getTlinedetails = (): Promise<any> => {
    return api.get('/tlinedetails/find')
}

export const newTlinedetail = (data): Promise<any> => {
    return api.post('/tlinedetails/create', data)
}

export const setTlinedetail = (data): Promise<any> => {
    return api.put(`/tlinedetails/edit/${data.id}`, data)
}

export const deleteTlinedetail = (id: string): Promise<any> => {
    return api.delete(`/tlinedetails/delete/${id}`)
}
