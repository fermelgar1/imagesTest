import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialData = {
  array: [],
  token: '',
}

const GET_IMAGES_SUCCESS = 'GET_IMAGES_SUCCESS'
const GET_IMAGES_ERROR = 'GET_IMAGES_ERROR'
const GET_LOCAL_TOKEN_SUCCESS = 'GET_LOCALTOKEN_SUCCESS'
const GET_LOCAL_TOKEN_ERROR = 'GET_LOCALTOKEN_ERROR'

const imageReducer = (state = initialData, action) => {
  switch (action.type) {
    case GET_IMAGES_SUCCESS:
      return {...state, array: action.payload}
    case GET_LOCAL_TOKEN_SUCCESS:
      return {...state, token: action.payload}
    case GET_LOCAL_TOKEN_ERROR:
      return {...initialData}
    default:
      return {...initialData}
  }
}

const getImagesAction =
  (token = '') =>
  async (dispatch, getState) => {
    try {
      if (!token) {
        dispatch({
          type: GET_LOCAL_TOKEN_ERROR,
        })
      }
      const response = await axios.get(
        'https://challenge.maniak.co/api/images',
        {
          headers: {'Authorization': `Bearer ${token}`},
        },
      )
      dispatch({
        type: GET_IMAGES_SUCCESS,
        payload: response.data,
      })
    } catch (error) {
      console.log(`error 1`, error)
      dispatch({
        type: GET_LOCAL_TOKEN_ERROR,
        payload: {...initialData},
      })
    }
  }

const getLocalTokenAction = () => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      dispatch({
        type: GET_LOCAL_TOKEN_SUCCESS,
        payload: token,
      })
    }
    dispatch({
      type: GET_LOCAL_TOKEN_ERROR,
    })
  } catch (error) {
    console.log(`error 2`, error)
    dispatch({
      type: GET_LOCAL_TOKEN_ERROR,
    })
  }
}
const getWebTokenAction = credentials => async (dispatch, getState) => {
  try {
    const tokenResponse = await axios.post(
      'https://challenge.maniak.co/api/login',
      {
        username: credentials.user,
        password: credentials.password,
      },
    )
    const token = tokenResponse.data.token
    if (token) {
      setLocalToken(token)
      dispatch({
        type: GET_LOCAL_TOKEN_SUCCESS,
        payload: token,
      })
    }
  } catch (error) {
    console.log(`error 3`, error)
    dispatch({
      type: GET_LOCAL_TOKEN_ERROR,
    })
  }
}

const deleteLocalTokenAction = () => async (dispatch, getState) => {
  try {
    await AsyncStorage.setItem('token', '')
    dispatch({
      type: GET_LOCAL_TOKEN_ERROR,
    })
  } catch (error) {
    console.log(`error 4`, error)
    dispatch({
      type: GET_LOCAL_TOKEN_ERROR,
    })
  }
}

const setLocalToken = async token => {
  try {
    await AsyncStorage.setItem('token', token)
  } catch (error) {
    console.log(`error 5`, error)
    dispatch({
      type: GET_LOCAL_TOKEN_ERROR,
    })
  }
}

export {
  getImagesAction,
  getLocalTokenAction,
  getWebTokenAction,
  deleteLocalTokenAction,
}
export default imageReducer
