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
    } catch (error) {
        console.log(error.message)
    }
}

export const loginUsers = (user) => async (dispatch) => {
    try {
        const { data } = await api.loginUsers(user)
        dispatch({ type: LOGIN_SUCCESS, payload: data})
        dispatch({ type: 'SET_MESSAGE', payload: data.message })
    } catch (error) {
        dispatch({ type: LOGIN_FAIL})
        dispatch({ type: 'SET_MESSAGE', payload: 'Log In Failed' })
        console.log(error.message)
    }
}