import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StatusBar,
  StyleSheet,
  Modal,
  Alert,
  FlatList,
} from 'react-native'
import { Header, Icon, Left, Body, Right } from 'native-base'

import { Permissions, Camera, FileSystem } from 'expo'
import store from 'react-native-simple-store'
import { MaterialIcons } from '@expo/vector-icons'

import IconButton from '../components/IconButton'
import AlertBox from '../components/AlertBox'

import { getPathSafeDatetime, uniqid, friendlyDate } from '../lib/general'

export default class CameraScreen extends React.Component {
  state = {
    isCameraVisible: false,
    isPhotoVisible: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    progressPhotos: [],
  }

  constructor(props) {
    super(props)
    this.document_dir = FileSystem.documentDirectory
    this.filename_prefix = 'increment_photo_'
  }

  componentWillMount() {
    Permissions.askAsync(Permissions.CAMERA).then(response => {
      this.setState({
        hasCameraPermission: response.status === 'granted',
      })
    })
  }

  componentDidMount() {
    const { navigation } = this.props
    navigation.setParams({
      openCamera: this.openCamera,
    })

    store.get('progressPhotos').then(response => {
      if (response) {
        this.setState({
          progressPhotos: response,
        })
      }
    })
  }

  openCamera = () => {
    this.setState({
      isCameraVisible: true,
    })
  }

  closeCamera = () => {
    this.setState({
      isCameraVisible: false,
    })
  }

  flipCamera = () => {
    const { type } = this.state

    this.setState({
      type:
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    })
  }

  closePhoto = () => {
    this.setState({
      isPhotoVisible: false,
    })
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        const datetime = getPathSafeDatetime()
        const filePath = `${this.document_dir}${this.filename_prefix}${datetime}.jpg`

        FileSystem.moveAsync({
          from: data.uri,
          to: filePath,
        }).then(() => {
          const photoData = {
            key: uniqid(),
            name: datetime,
          }
          store.push('progressPhotos', photoData)

          const progressPhotos = [...this.state.progressPhotos]
          progressPhotos.push(photoData)
          /* eslint-disable no-console */
          console.log(data)
          /* eslint-enable no-console */
          this.setState({
            progressPhotos,
          })

          Alert.alert('Saved', 'Your photo was successfully saved!')
        })
      })
    }
  }

  showPhoto = item => {
    this.setState({
      isPhotoVisible: true,
      currentImage: {
        url: `${this.document_dir}${this.filename_prefix}${item.name}.jpg`,
        label: friendlyDate(item.name),
      },
    })
  }

  renderItem = ({ item }) => {
    const name = friendlyDate(item.name)
    const photoUrl = `${this.document_dir}${this.filename_prefix}${item.name}.jpg`

    return (
      <TouchableHighlight
        key={item.key}
        style={styles.list_item}
        underlayColor="#ccc"
        onPress={() => {
          this.showPhoto(item)
        }}
      >
        <View style={styles.image_container}>
          <Image source={{ uri: photoUrl }} style={styles.image} ImageResizeMode="contain" />
          <Text style={styles.image_text}>{name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const { navigation } = this.props
    const {
      type,
      isCameraVisible,
      hasCameraPermission,
      isPhotoVisible,
      currentImage,
      progressPhotos,
    } = this.state

    return (
      <View style={styles.wrapper}>
        <StatusBar hidden />
        <Header style={{ backgroundColor: '#333' }}>
          <Left>
            <Icon name="ios-menu" onPress={() => navigation.openDrawer()} />
          </Left>
          <Body style={{ alignSelf: 'center' }}>
            <Text style={{ alignSelf: 'center', color: '#FFF' }}>Take Picture</Text>
          </Body>
          <Right>
            <IconButton
              size={25}
              color="#FFF"
              onPress={() => {
                navigation.state.params.openCamera()
              }}
            />
          </Right>
        </Header>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isCameraVisible}
          onRequestClose={() => {
            this.setState({
              isCameraVisible: false,
            })
          }}
        >
          <View style={styles.modal}>
            {hasCameraPermission && (
              <Camera
                style={styles.wrapper}
                type={type}
                ref={ref => {
                  this.camera = ref
                }}
              >
                <View style={styles.camera_body}>
                  <View style={styles.upper_buttons_container}>
                    <IconButton
                      is_transparent
                      icon="close"
                      styles={[styles.camera_button, styles.camera_close_button]}
                      onPress={this.closeCamera}
                    />

                    <IconButton
                      is_transparent
                      icon="flip"
                      styles={[styles.camera_button, styles.camera_flip_button]}
                      onPress={this.flipCamera}
                    />
                  </View>

                  <View style={styles.lower_buttons_container}>
                    <IconButton
                      is_transparent
                      icon="photo-camera"
                      styles={styles.camera_photo_button}
                      onPress={this.takePicture}
                    />
                  </View>
                </View>
              </Camera>
            )}
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={isPhotoVisible}
          onRequestClose={() => {
            this.setState({
              isPhotoVisible: false,
            })
          }}
        >
          <View style={styles.modal}>
            {currentImage && (
              <View style={styles.wrapper}>
                <Image
                  source={{ uri: currentImage.url }}
                  style={styles.wrapper}
                  ImageResizeMode="contain"
                />

                <IconButton
                  is_transparent
                  icon="close"
                  styles={styles.close_button}
                  onPress={this.closePhoto}
                />

                <View style={styles.photo_label}>
                  <Text style={styles.photo_label_text}>{currentImage.label}</Text>
                </View>
              </View>
            )}
          </View>
        </Modal>

        {progressPhotos.length === 0 && (
          <AlertBox text="You haven't taken any pictures yet." type="info" />
        )}

        {progressPhotos.length > 0 && (
          <FlatList data={progressPhotos} numColumns={2} renderItem={this.renderItem} />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  modal: {
    marginTop: 22,
    flex: 1,
  },
  camera_body: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  upper_buttons_container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lower_buttons_container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  camera_button: {
    padding: 10,
  },
  camera_close_button: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  camera_flip_button: {
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
  },
  camera_photo_button: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  list_item: {
    flex: 1,
    padding: 10,
  },
  image_container: {
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
  },
  image_text: {
    marginTop: 10,
    fontSize: 12,
  },
  close_button: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
  },
  photo_label: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5,
  },
  photo_label_text: {
    color: '#FFF',
  },
})
