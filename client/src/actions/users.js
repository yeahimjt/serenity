import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import * as api from '../api'

// Action Creators
export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers()
        dispatch({ type: 'FETCH_ALL', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const createUsers = (user) => async (dispatch) => {
    try {
        const { data } = await api.createUsers(user)
        dispatch({ type: 'CREATE', payload: data})
        dispatch({ type: 'SET_MESSAGE', payload: {success: 'Your account was created'}})
    } catch (error) {
        dispatch({ type: REGISTER_FAIL })
        dispatch({ type: 'SET_MESSAGE', payload: {error: 'Email Address already in use'}})
        console.log(error.message)
    }
}

export const updateUsers = (userData, images) => async (dispatch) => {
    const { data } = await api.updateUsers(userData, images)
    console.log(data)
}

export const loginUsers = (user) => async (dispatch) => {
    console.log('loggin')
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