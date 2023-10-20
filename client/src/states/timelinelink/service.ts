import api from "../../services/api";

export const getTimelinelink = (id: string): Promise<any> => {
    return api.get(`/timelinelinks/find/${id}`)
}

export const getTimelinelinks = (): Promise<any> => {
    return api.get('/timelinelinks/find')
}

export const newTimelinelink = (data): Promise<any> => {
    return api.post('/timelinelinks/create', data)
}

export const setTimelinelink = (data): Promise<any> => {
    return api.put(`/timelinelinks/edit/${data.id}`, data)
}

export const deleteTimelinelink = (id: string): Promise<any> => {
    return api.delete(`/timelinelinks/delete/${id}`)
}
