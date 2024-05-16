import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import MapView, {Marker, Circle} from 'react-native-maps';
import {useAuth} from './AuthContext';
import {useRoute} from '@react-navigation/native';

const Geo = () => {
  const route = useRoute();
  const data = route.params.location;
  const childId = route.params.childId;
  console.log('childId', childId);
  console.log('location', data);
  const [radius, setRadius] = useState('');
  const [geofenceCoordinates, setGeofenceCoordinates] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(data);
  const [message, setMessage] = useState('');
  const {token} = useAuth();

  console.log(currentLocation);

  const setGeofence = () => {
    if (currentLocation) {
      setGeofenceCoordinates({
        latitude: parseFloat(currentLocation.latitude),
        longitude: parseFloat(currentLocation.longitude),
        radius: parseFloat(radius),
      });
    }
  };
  useEffect(() => {
    const setGeofenceAPI = async () => {
      try {
        let response = await fetch(
          `https://digital-guardian-backend.vercel.app/api/geo-fencing/${childId}`,
          {
            method: 'POST',
            headers: {
              'content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify(geofenceCoordinates),
          },
        );
        if (response.ok) {
          response = await response.json();
          console.log(response);
        } else {
          response = await response.json();
          console.log(response);
          console.log('an error occurred');
        }
      } catch (e) {
        console.log('exception occurred', e);
      }
    };

    setGeofenceAPI();
  }, [geofenceCoordinates]);

  useEffect(() => {
    const getGeofenceData = async () => {
      try {
        let response = await fetch(
          `https://digital-guardian-backend.vercel.app/api/geo-fencing/${childId}`,
          {
            method: 'GET',
            headers: {
              'content-Type': 'application/json',
              Authorization: token,
            },
            //body: JSON.stringify(geofenceCoordinates),
          },
        );
        if (response.ok) {
          response = await response.json();
          console.log(response);
          setGeofenceCoordinates({
            latitude: response.geoFencing.latitude,
            longitude: response.geoFencing.longitude,
            radius: response.geoFencing.radius,
          });
        } else {
          response = await response.json();
          console.log(response);
          setMessage('No fence found!');

          console.log('an error occurred');
        }
      } catch (e) {
        console.log('exception occurred', e);
      }
    };
    getGeofenceData();
  }, []);

  useEffect(() => {
    if (geofenceCoordinates) {
      const calculateDistance = (loc1, loc2) => {
        const R = 6371e3; // Earth radius in meters
        const lat1 = (loc1.latitude * Math.PI) / 180;
        const lat2 = (loc2.latitude * Math.PI) / 180;
        const deltaLat = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
        const deltaLon = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

        const a =
          Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
          Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(deltaLon / 2) *
            Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c;
        return distance;
      };

      // Calculate the distance between current location and geofence coordinates
      const distance = calculateDistance(currentLocation, geofenceCoordinates);

      // If the distance is greater than the radius, generate a notification
      if (distance > geofenceCoordinates.radius) {
        console.log('out of fence');
        setMessage('Child is out of fence');
      } else {
        console.log('inside the fence');
        setMessage('Child is inside fence');
      }
    }
  }, [geofenceCoordinates]);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#190152',
        }}>
        <Text
          style={{
            color: message === 'Child is inside fence' ? '#fff' : 'red',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {message}
        </Text>
      </View>
      <MapView
        style={{flex: 1, height: 200}}
        region={{
          latitude: currentLocation
            ? parseFloat(currentLocation.latitude)
            : 37.7749,
          longitude: currentLocation
            ? parseFloat(currentLocation.longitude)
            : -122.4194,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: parseFloat(currentLocation.latitude),
              longitude: parseFloat(currentLocation.longitude),
            }}
            title="Current Location"
            pinColor="blue"
          />
        )}
        {geofenceCoordinates && (
          <Circle
            center={{
              latitude: geofenceCoordinates?.latitude,
              longitude: geofenceCoordinates?.longitude,
            }}
            radius={geofenceCoordinates?.radius}
            fillColor="rgba(255, 0, 0, 0.2)"
            strokeColor="rgba(255, 0, 0, 0.8)"
            strokeWidth={2}
          />
        )}
      </MapView>
      <View style={{padding: 16}}>
        <Text style={{color: '#000'}}>Enter Radius</Text>
        <TextInput
          style={{color: '#000'}}
          placeholder="Radius (in meters)"
          value={radius}
          onChangeText={setRadius}
          keyboardType="numeric"
        />
        <Button
          title="Set Geofence"
          onPress={setGeofence}
          style={{backgroundColor: '#190152'}}
        />
      </View>
    </View>
  );
};

export default Geo;
