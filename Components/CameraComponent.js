import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Button,
  Image,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

const App = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const device = useCameraDevice('back');
  const cameraRef = useRef();

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take pictures.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        setHasPermission(true);
      } else {
        console.log('Camera permission denied');
        setHasPermission(false);
      }
    } catch (err) {
      console.warn(err);
      setHasPermission(false);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const image = await cameraRef.current.takePhoto();
        console.log('Image URI:', image.uri); // Log the URI
        setImageUri(image.path);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    } else {
      console.warn('Camera reference not available.');
    }
  };

  if (!hasPermission)
    return <PermissionsPage checkCameraPermission={checkCameraPermission} />;
  if (device == null) return <NoCameraDeviceError />;

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        device={device}
        isActive={true}
        photo={true} // Enable photo capture
      />
      <View style={styles.buttonContainer}>
        <Button title="Take Picture" onPress={takePicture} />
      </View>
      {imageUri && <Image source={{imageUri}} style={styles.image} />}
    </View>
  );
};

const PermissionsPage = ({checkCameraPermission}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please grant camera permission</Text>
      <Button title="Grant Permission" onPress={checkCameraPermission} />
    </View>
  );
};

const NoCameraDeviceError = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No camera device found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default App;
