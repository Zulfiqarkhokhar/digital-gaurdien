import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, {Marker, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const Location = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [areaName, setAreaName] = useState('');

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

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCNDeNypWTvARbDG8AfwvwSDhhy0Dw9a7M`,
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.results && data.results.length > 0) {
          setAreaName(data.results[0].formatted_address);
        }
      } else {
        console.error('Error fetching address:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching address:', error.message);
    }
  };

  useEffect(() => {
    requestLocationPermission();

    const watchId = Geolocation.watchPosition(
      position => {
        setLocation(position.coords);
        reverseGeocode(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // meters
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

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
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          Location
        </Text>
      </View>
      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            width: '100%',
            height: 350,
            position: 'relative',
            bottom: 10,
            left: 0,
            right: 0,
          }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Current Location"
          />
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={100}
            strokeColor="rgba(0, 0, 255, 0.5)"
            fillColor="rgba(0, 0, 255, 0.2)"
          />
        </MapView>
      )}
      <View style={{margin: 20, position: 'relative', left: 10}}>
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: '#EDE5F4',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Geo', {location})}>
            <Image
              source={require('../appAssets/features/location.png')}></Image>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            position: 'relative',
            right: 20,
            color: '#000',
          }}>
          {' '}
          Add Geofencing
        </Text>
      </View>
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
          Current Location: Sukku IBA University
        </Text>
      </View>
      <View
        style={{
          width: 360,
          backgroundColor: '#190152',
          height: 60,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 30,
            marginRight: 30,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ParentDashboard')}>
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
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
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
};

export default Location;
