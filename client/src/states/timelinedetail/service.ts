import api from "../../services/api";

export const getTimelinedetail = (id: string): Promise<any> => {
    return api.get(`/timelinedetail/find/${id}`)
}

export const getTimelinedetails = (): Promise<any> => {
    return api.get('/timelinedetail/find')
}

export const newTimelinedetail = (data): Promise<any> => {
    return api.post('/timelinedetail/create', data)
}

export const setTimelinedetail = (data): Promise<any> => {
    return api.put(`/timelinedetail/edit/${data.id}`, data)
}

export const deleteTimelinedetail = (id: string): Promise<any> => {
    return api.delete(`/timelinedetail/delete/${id}`)
}
