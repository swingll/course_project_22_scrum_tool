import api from "../../services/api";

export const getTimeline = (id: string): Promise<any> => {
    return api.get(`/timelines/find/${id}`)
}

export const getTimelines = (): Promise<any> => {
    return api.get('/timelines/find')
}

export const newTimeline = (data): Promise<any> => {
    return api.post('/timelines/create', data)
}

export const setTimeline = (data): Promise<any> => {
    return api.put(`/timelines/edit/${data.id}`, data)
}

export const deleteTimeline = (id: string): Promise<any> => {
    return api.delete(`/timelines/delete/${id}`)
}
