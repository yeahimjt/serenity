import * as api from '../api'

export const getMessages = async (setExisting) => {
    try {
        const { data } = await api.fetchMessages();
        console.log(data)
        setExisting(data)
    } catch (error) {
        console.log(error)
    }
}
export const getUsersMessaged = async (ids, setProfiles) => {
    try {
        const { data } = await api.fetchUserMessaged(ids)
        setProfiles(data)
    } catch (error) {
        console.log(error)
    }
}

export const messageHistory = async (id, setMessageText) => {
    try {
        const { data } = await api.messageHistory(id)
        setMessageText(data)
    } catch (error) {
        console.log(error)
    }
}