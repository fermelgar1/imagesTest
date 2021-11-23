import React from 'react'
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import Styles from '../styles/Styles'
import {useDispatch, useSelector} from 'react-redux'
import {
  getImagesAction,
  getLocalTokenAction,
  getWebTokenAction,
} from '../redux/imagesDucks'

const LogIn = ({navigation}) => {
  const initialData = {user: '', password: ''}
  const dispatch = useDispatch()
  const imagesApi = useSelector(store => store.images)
  const [credentials, setCredentials] = React.useState(initialData)
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(getLocalTokenAction())
    })
  }, [navigation])
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      if (imagesApi.token) {
        navigation.navigate('Images')
      }
    })
  }, [navigation])
  const onChangeCredentials = (field, value) => {
    switch (field) {
      case 'user':
        setCredentials(state => {
          return {...state, user: value}
        })
        break
      case 'password':
        setCredentials(state => {
          return {...state, password: value}
        })
        break
    }
  }

  const handleTouch = () => {
    setCredentials(initialData)
    dispatch(getWebTokenAction(credentials))
    navigation.navigate('Images')
  }

  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.contentContainer}>
        <View style={Styles.topLogin}>
          <Text style={Styles.tittleText}>Log In</Text>
          <Text>Welcome back</Text>
        </View>
        <View style={Styles.contentLogin}>
          <View>
            <Text>Email</Text>
            <TextInput
              style={Styles.loginInput}
              value={credentials.user}
              onChangeText={onChangeText =>
                onChangeCredentials('user', onChangeText)
              }
            />
          </View>
          <View>
            <Text>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={Styles.loginInput}
              value={credentials.password}
              onChangeText={onChangeText =>
                onChangeCredentials('password', onChangeText)
              }
              placeholder={`challenge@maniak.co`}
            />
          </View>
          <TouchableOpacity style={Styles.forgotPassword}>
            <Text> Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.loginButton}
            onPress={() => handleTouch()}>
            <Text style={Styles.loginButtonText}> LOG IN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={Styles.bottom}>
        <Text>
          Don't have an acount?{` `}
          <TouchableOpacity>
            <Text> Sign up here</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  )
}

export default LogIn
