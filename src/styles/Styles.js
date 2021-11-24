import {StyleSheet} from 'react-native'
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'rgb(55, 58, 77)',
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  topLogin: {
    flex: 1,
    paddingTop: 150,
    paddingBottom: 40,
  },
  contentLogin: {
    flex: 10,
    paddingTop: 40,
    marginHorizontal: 15,
  },
  contentContainer: {
    flex: 12,
    marginVertical: 5,
    justifyContent: 'center',
  },
  loginInput: {
    backgroundColor: 'rgb(245, 245, 250)',
  },
  loginButton: {
    marginTop: 25,
    backgroundColor: 'red',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(55, 58, 77)',
  },
  loginButtonText: {
    color: 'white',
  },
  itemContainer: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  tittleText: {
    fontSize: 28,
  },
  bottom: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default Styles
