import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  Switch,
} from 'react-native';
import {useEffect, useState} from 'react';
import {InstalledApps} from 'react-native-launcher-kit';
import {useRoute} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import RNFetchBlob from 'rn-fetch-blob';
// import LottieView from "lottie-react-native";
import {useAuth} from './AuthContext';
import {position} from 'native-base/lib/typescript/theme/styled-system';
import {NativeModules} from 'react-native';
import ViewShot, {captureScreen} from 'react-native-view-shot';

export default function ChildInterface() {
  const [toggleValue, setToggleValue] = useState(Array(6).fill(false));

  const {token} = useAuth();
  const [apps, setApps] = useState([]);
  const [location, setLocation] = useState(null);
  const [capturedImagePath, setCapturedImagePath] = useState(null);
  const [screenshotUri, setScreenshotUri] = useState('');
  const [saveImagePath, setSaveImagePath] = useState('');

  console.log('token: ', token);

  // camera module
  const {CameraModule} = NativeModules;

  useEffect(() => {
    const CameraScreen = () => {
      const captureImage = async () => {
        try {
          const imagePath = await CameraModule.captureImage();
          console.log(typeof imagePath);
          // Fetch the image file using the file path
          // const response = await fetch(`file://${imagePath}`);
          // const imageBlob = await response.blob();

          // console.log('type of image blob: ', typeof imageBlob);

          setCapturedImagePath(`file://${imagePath}`);
          console.log(imagePath);
          uploadImageToBackend();
        } catch (error) {
          console.error('Error capturing image:', error);
        }
      };
      captureImage();

      const uploadImageToBackend = async () => {
        // Here, you can send the captured image path to your backend
        // For example, you can use fetch or axios to send a POST request

        try {
          const formData = new FormData();
          formData.append('image', {
            uri: capturedImagePath,
            type: 'image/jpeg', // Adjust the type according to your image type
            name: 'photo.jpg', // Adjust the file name as needed
          });

          const response = await fetch(
            'https://digital-guardian-backend.vercel.app/api/camera/add-photo',
            {
              method: 'POST',
              body: formData,
              headers: {
                'content-type': 'multipart/form-data',
                Authorization: token,
              },
            },
          );
          //console.log(response);
          const data = await response.json();
          // Handle response from backend
          console.log('Response from backend:', data);
        } catch (error) {
          console.error('Error uploading image to backend:', error);
        }
      };
    };
    CameraScreen();
  }, [capturedImagePath]);

  useEffect(() => {
    const takeScreenShot = async () => {
      try {
        const uri = await captureScreen({
          format: 'jpg',
          quality: 1,
        });
        setSaveImagePath(uri);
        setScreenshotUri(uri);

        const formData = new FormData();
        formData.append('image', {
          uri: saveImagePath,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        const response = await fetch(
          'https://digital-guardian-backend.vercel.app/api/screencast/add-photo',
          {
            method: 'POST',
            body: formData,
            headers: {
              'content-type': 'multipart/form-data',
              Authorization: token,
            },
          },
        );
        console.log(response);
        const data = await response.json();
        console.log('Response from backend for ScreenShot:', data);
      } catch (error) {
        console.error(
          'Error uploading image to backend for ScreenShot:',
          error,
        );
      }
    };
    takeScreenShot();
  }, [saveImagePath]);

  ///Permissions

  const requestAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Audio Permission',
          message: 'This app needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Audio permission granted');
      } else {
        console.log('Audio permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

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
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestNotificationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
        {
          title: 'Notification Permission',
          message: 'This app needs permission to post notifications.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    } catch (err) {
      console.error('Error requesting notification permission:', err);
    }
  };

  // fetching current Location Location
  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        setLocation(position.coords);
        console.log(position);
      },
      error => console.log('Error occurred:', error),
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const postLocation = async () => {
    if (!location) {
      console.error('Location is null');
      return;
    }

    try {
      const response = await fetch(
        'https://digital-guardian-backend.vercel.app/api/location/add-location',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }),
        },
      );

      const data = await response.json();
      console.log('data:', data);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    if (location) {
      postLocation();
    } else {
      console.log('no location');
    }
  }, [location]);

  // getting data

  useEffect(() => {
    const fetchData = async () => {
      const fetchInstalledApps = async () => {
        try {
          var res = await InstalledApps.getApps();
          setApps([...res]);
          //console.log(typeof res[0]);
          const arr = [1, 3, 4, 5];
          //console.log(typeof arr);
          //console.log(res[0]);
        } catch (error) {
          console.error('Error fetching installed apps:', error);
        }
      };

      console.log(token);

      fetchInstalledApps();
    };

    fetchData();
  }, []);

  useEffect(() => {
    //console.log(typeof apps);
    const slicedArray = apps.slice(1, 3);
    //console.log(slicedArray);
    const postApps = async () => {
      try {
        const response = await fetch(
          'https://digital-guardian-backend.vercel.app/api/apps/add-apps',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify(apps), // Stringify the array of objects
          },
        );

        const data = await response.json();
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };
    if (apps) {
      postApps();
    }
  }, [apps]);

  const onToggleChange = index => {
    setToggleValue(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      console.log(Permissions[index]);
      if (Permissions[index].name === 'Allow Location') {
        requestLocationPermission();
      } else if (Permissions[index].name === 'Allow Camera') {
        checkCameraPermission();
      } else if (Permissions[index].name === 'Allow Audio') {
        requestAudioPermission();
      } else if (Permissions[index].name === 'Allow Notification') {
        requestNotificationPermission();
      }
      return newStates;
    });
  };
  const Permissions = [
    {
      name: 'Allow Camera',
      Icon: require('../appAssets/features/camera.png'),
    },
    {
      name: 'Allow Location',
      Icon: require('../appAssets/features/location.png'),
    },
    {
      name: 'Allow Audio',
      Icon: require('../appAssets/features/audio.png'),
    },
    {
      name: 'Allow Notification',
      Icon: require('../appAssets/features/notification.png'),
    },
    {
      name: 'Allow Apps',
      Icon: require('../appAssets/features/block.png'),
    },
    {
      name: 'Allow Screen',
      Icon: require('../appAssets/features/mirror.png'),
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <View
        style={{
          backgroundColor: '#190152',
          width: 370,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          Allow All Permissions
        </Text>
      </View>
      <Image
        source={require('../appAssets/hero2.png')}
        style={{margin: 20}}></Image>
      {/* <View style={{ flex: 1 }}>
        <LottieView
          source={require("../appAssets/lotties/Animation - 1700757289450.json")} // Replace with the actual path to your Lottie animation file
          autoPlay
          loop
        />
      </View> */}
      <View
        style={{
          backgroundColor: '#190152',
          height: 10,
          width: 320,
          borderRadius: 20,
        }}></View>

      {/* List Of Permission */}

      <View style={{flex: 1}}>
        <FlatList
          data={Permissions}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', width: 300}}>
                  <Image source={item.Icon} style={{margin: 20}} />
                  <Text
                    style={{marginTop: 20, fontSize: 18, fontWeight: 'bold'}}>
                    {item.name}
                  </Text>
                </View>
                <View style={{marginRight: 20, marginTop: 10}}>
                  <Switch
                    trackColor={{false: '#767577', true: '#190152'}}
                    thumbColor="#fff"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => onToggleChange(index)} // Corrected this line
                    value={toggleValue[index]}
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Footer Here */}

      <View
        style={{
          width: 360,
          backgroundColor: '#190152',
          height: 60,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 30,
            marginRight: 30,
          }}>
          <TouchableOpacity>
            <Image
              size={150}
              source={require('../appAssets/footer/home.png')}
              alt="Alternate Text"
              style={{marginTop: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              size={150}
              source={require('../appAssets/footer/detail.png')}
              alt="Alternate Text"
              style={{marginTop: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              size={150}
              source={require('../appAssets/footer/profile.png')}
              alt="Alternate Text"
              style={{marginTop: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
