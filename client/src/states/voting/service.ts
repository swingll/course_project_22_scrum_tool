import api from "../../services/api";

export const getVoting = (id: string): Promise<any> => {
    return api.get(`/votings/find/${id}`)
}

export const getVotings = (): Promise<any> => {
    return api.get('/votings/find')
}

export const newVoting = (data): Promise<any> => {
    return api.post('/votings/create', data)
}

export const setVoting = (data): Promise<any> => {
    return api.put(`/votings/edit/${data.id}`, data)
}

export const deleteVoting = (id: string): Promise<any> => {
    return api.delete(`/votings/delete/${id}`)
}
