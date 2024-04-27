// ParentComponent.js

import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import MapView, {Circle} from 'react-native-maps';
import GeoModule from './GeoModule';

const Geo = ({route}) => {
  const data = route.params;
  console.log(data.location.latitude);
  const [latitude, setLatitude] = useState(data.location.latitude);
  const [longitude, setLongitude] = useState(data.location.longitude);
  const [radius, setRadius] = useState('');
  const [geofenceCoordinates, setGeofenceCoordinates] = useState(null);

  useEffect(() => {
    if (latitude && longitude && radius) {
      setGeofenceCoordinates({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius: parseFloat(radius),
      });
    }
  }, [latitude, longitude, radius]);

  const setGeofence = () => {
    GeoModule.setGeofence(
      parseFloat(latitude),
      parseFloat(longitude),
      parseFloat(radius),
    );
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: geofenceCoordinates
            ? geofenceCoordinates.latitude
            : 37.7749,
          longitude: geofenceCoordinates
            ? geofenceCoordinates.longitude
            : -122.4194,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {geofenceCoordinates && (
          <Circle
            center={{
              latitude: geofenceCoordinates.latitude,
              longitude: geofenceCoordinates.longitude,
            }}
            radius={geofenceCoordinates.radius}
            fillColor="rgba(255, 0, 0, 0.2)"
            strokeColor="rgba(255, 0, 0, 0.8)"
            strokeWidth={2}
          />
        )}
      </MapView>
      <View style={{padding: 16}}>
        <Text>Set Geofence</Text>
        {/* <TextInput
          placeholder="Latitude"
          value={latitude}
          onChangeText={setLatitude}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Longitude"
          value={longitude}
          onChangeText={setLongitude}
          keyboardType="numeric"
        /> */}
        <TextInput
          placeholder="Radius (in meters)"
          value={radius}
          onChangeText={setRadius}
          keyboardType="numeric"
        />
        <Button title="Set Geofence" onPress={setGeofence} />
      </View>
    </View>
  );
};

export default Geo;
