import api from "../../services/api";

export const getStory = (id: string): Promise<any> => {
    return api.get(`/stories/find/${id}`)
}

export const getStories = (): Promise<any> => {
    return api.get('/stories/find')
}

export const newStory = (data): Promise<any> => {
    return api.post('/stories/create', data)
}

export const setStory = (data): Promise<any> => {
    return api.put(`/stories/edit/${data.id}`, data)
}

export const deleteStory = (id: string): Promise<any> => {
    return api.delete(`/stories/delete/${id}`)
}
