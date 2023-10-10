import api from "../../services/api";

export const getTimelinedetail = (id: string): Promise<any> => {
    return api.get(`/timelinedetails/find/${id}`)
}

export const getTimelinedetails = (): Promise<any> => {
    return api.get('/timelinedetails/find')
}

export const newTimelinedetail = (data): Promise<any> => {
    return api.post('/timelinedetails/create', data)
}

export const setTimelinedetail = (data): Promise<any> => {
    return api.put(`/timelinedetails/edit/${data.id}`, data)
}

export const deleteTimelinedetail = (id: string): Promise<any> => {
    return api.delete(`/timelinedetails/delete/${id}`)
}
