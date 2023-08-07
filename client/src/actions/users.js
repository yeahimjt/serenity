import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import * as api from '../api'
import DefaultPicture from '../assets/default-person.png'
// Action Creators
export const getUsers = async (setUsers) => {
    try {
        const { data } = await api.fetchUsers()
        setUsers(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const filterUsers = async (filter,setUsers) => {
    try {
        const { data } = await api.filterUsers(filter)
        setUsers(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const searchUsers = async (search, setResults) => {
    try {
        const { data } = await api.searchUsers(search)
        setResults(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const getUserSecretly = async (id, setUser) => {
    try {
        const { data } = await api.getUserSecretly(id)
        setUser(data)
    } catch (error) {
        
    }
}

export const followUser =  (id, option) => async (dispatch) => {
    try {
        const { data } = await api.followUser(id)
        dispatch({type: LOGIN_SUCCESS, payload: data})
        if (option) {
            dispatch({type: 'SET_MESSAGE', payload: {success: "Successfully Unfollowed User"}})
        }
        else {
            dispatch({type: 'SET_MESSAGE', payload: {success: "Successfully Followed User"}})
        }
    } catch (error) {
        
    }
}

export const getUsersPicture = async (user_id, setPicture) => {
    try {
        const { data } = await api.fetchUsersImage(user_id)
        if (data[0].images) {
            setPicture(data[0]['images']['url'])
        }
        else {
            setPicture(DefaultPicture)
        }
        // if (data) {
        //     setPicture(data[0]['images']['url'])
        // }

    } catch (error) {
        console.log(error.message)
    }
}

export const createUsers = (user) => async (dispatch) => {
    try {
        const { data } = await api.createUsers(user)
        dispatch({ type: REGISTER_SUCCESS, payload: data})
        dispatch({ type: 'SET_MESSAGE', payload: {success: 'Your account was created'}})
    } catch (error) {
        dispatch({ type: REGISTER_FAIL })
        dispatch({ type: 'SET_MESSAGE', payload: {error: 'Email Address already in use'}})
        console.log(error.message)
    }
}

export const updateUsers = (userData, images) => async (dispatch) => {
    try {
        const { data } = await api.updateUsers(userData, images)
        dispatch({type: LOGIN_SUCCESS, payload: data})
        dispatch({ type: 'SET_MESSAGE', payload: {success: 'Updated profile successfully'} })
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: {success: 'Update profile failed'} })
    }
    
    
}

export const loginUsers = (user) => async (dispatch) => {
    try {
        const { data } = await api.loginUsers(user)
        dispatch({ type: LOGIN_SUCCESS, payload: data})
        dispatch({ type: 'SET_MESSAGE', payload: {success: 'You successfully logged in'} })
    } catch (error) {
        dispatch({ type: LOGIN_FAIL})
        dispatch({ type: 'SET_MESSAGE', payload: {error: 'No account was found'} })
        console.log(error.message)
    }
}

export const getProfile = () => async (dispatch) => {
    try {
        const { data } = await api.profileUsers()
        dispatch({type: 'FETCH_PROFILE', payload: data })
    } catch (error) {

    }
}

export const logOut = () => async (dispatch) => {
    try {
        const { data } = await api.logout()
        dispatch({type: 'LOGOUT', payload: data })
        dispatch({type: 'SET_MESSAGE', payload: {success: 'You have successfully logged out'}})
    } catch (error) {

    }
}