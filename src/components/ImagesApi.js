import React from 'react'
import {
  Button,
  ScrollView,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {
  getImagesAction,
  getLocalTokenAction,
  deleteLocalTokenAction,
} from '../redux/imagesDucks'
import Styles from '../styles/Styles'
import {Icon} from 'react-native-elements'

const ImagesApi = ({navigation}) => {
  const dispatch = useDispatch()
  const imagesApi = useSelector(store => store.images)

  React.useEffect(() => {
    dispatch(getLocalTokenAction())
    if (!imagesApi.token) {
      navigation.navigate('LogIn')
    } else {
      dispatch(getImagesAction(imagesApi.token))
    }
  }, [])
  const logOut = () => {
    dispatch(deleteLocalTokenAction())
    navigation.navigate('LogIn')
  }

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
            <View key={item.name} style={Styles.itemContainer}>
              <View style={Styles.imageContainer}>
                <Text>hola mundo</Text>
              </View>
              <View style={Styles.textContainer}>
                <Text>{item.name}</Text>
                <Text>
                  Descrincion
                  loreimpsunfnhuioewhfiowehtwruiohgihoregjfdiopjhdopjh
                </Text>
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
