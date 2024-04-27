import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, PermissionsAndroid} from 'react-native';
import MapView, {Marker, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const Geofencing = () => {
  const [location, setLocation] = useState(null);
  const [geofence, setGeofence] = useState({
    latitude: 0,
    longitude: 0,
    radius: 100,
  });

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

  useEffect(() => {
    requestLocationPermission();

    const watchId = Geolocation.watchPosition(
      position => {
        setLocation(position.coords);
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

  const updateGeofence = () => {
    // You can add validation logic here
    const latitude = parseFloat(geofence.latitude);
    const longitude = parseFloat(geofence.longitude);
    const radius = parseFloat(geofence.radius);

    console.log(typeof latitude);
    setGeofence({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      radius: parseFloat(radius),
    });
  };

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
              latitude: geofence.latitude,
              longitude: geofence.longitude,
            }}
            radius={geofence.radius}
            strokeColor="rgba(0, 0, 255, 0.5)"
            fillColor="rgba(0, 0, 255, 0.2)"
          />
        </MapView>
      )}
      <View style={{padding: 16}}>
        <Text>Set Geofence:</Text>
        <TextInput
          placeholder="Latitude"
          keyboardType="numeric"
          value={geofence.latitude}
          onChangeText={text => setGeofence({...geofence, latitude: text})}
        />
        <TextInput
          placeholder="Longitude"
          keyboardType="numeric"
          value={geofence.longitude}
          onChangeText={text => setGeofence({...geofence, longitude: text})}
        />
        <TextInput
          placeholder="Radius (in meters)"
          keyboardType="numeric"
          value={geofence.radius}
          onChangeText={text => setGeofence({...geofence, radius: text})}
        />
        <Button title="Update Geofence" onPress={updateGeofence} />
      </View>
    </View>
  );
};

export default Geofencing;
