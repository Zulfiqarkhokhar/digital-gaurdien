import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import MapView, {Marker, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const Location = () => {
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
    <View style={{flex: 1}}>
      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
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
      <View style={{padding: 16}}>
        <Text>Area Name: {areaName}</Text>
      </View>
    </View>
  );
};

export default Location;
