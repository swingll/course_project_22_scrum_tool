import api from "../../services/api";

export const getTask = (id: string): Promise<any> => {
    return api.get(`/tasks/find/${id}`)
}

export const getTasks = (): Promise<any> => {
    return api.get('/tasks/find')
}

export const newTask = (data): Promise<any> => {
    return api.post('/tasks/create', data)
}

export const setTask = (data): Promise<any> => {
    return api.put(`/tasks/edit/${data.id}`, data)
}

export const deleteTask = (id: string): Promise<any> => {
    return api.delete(`/tasks/delete/${id}`)
}
