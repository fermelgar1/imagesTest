import React from 'react'
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {
  getImagesAction,
  getLocalTokenAction,
  deleteLocalTokenAction,
} from '../redux/imagesDucks'
import Styles from '../styles/Styles'

const ImagesApi = ({navigation}) => {
  const dispatch = useDispatch()
  const imagesApi = useSelector(store => store.images)
  const isFocused = navigation.isFocused()

  const logOut = () => {
    dispatch(deleteLocalTokenAction())
  }

  React.useEffect(() => {
    dispatch(getLocalTokenAction())
  }, [])

  React.useEffect(() => {
    if (!imagesApi.token) {
      navigation.navigate('LogIn')
    }
  })

  React.useEffect(() => {
    if (imagesApi.token) {
      dispatch(getImagesAction(imagesApi.token))
    }
  }, [imagesApi.token])

  return (
    <SafeAreaView style={Styles.mainContainer}>
      <View style={Styles.top}>
        <Text style={Styles.tittleText}>My Photos</Text>
        <TouchableOpacity onPress={() => logOut()}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>

      <View style={Styles.contentContainer}>
        <ScrollView>
          {imagesApi.array.map(item => (
            <View key={item.id} style={Styles.itemContainer}>
              <View style={Styles.imageContainer}>
                <Image
                  style={Styles.tinyLogo}
                  source={{uri: `${item.image}`}}
                />
              </View>
              <View style={Styles.textContainer}>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity onPress={() => logOut()} style={Styles.bottom}>
        <Text>Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ImagesApi
