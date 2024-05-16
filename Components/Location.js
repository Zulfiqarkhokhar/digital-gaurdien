import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import MapView, {Marker, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import {useAuth} from './AuthContext';
import {useRoute} from '@react-navigation/native';

const Location = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const {token} = useAuth();

  const route = useRoute();
  const {childId} = route.params;

  useEffect(() => {
    const getLocation = async () => {
      try {
        let response = await fetch(
          `https://digital-guardian-backend.vercel.app/api/location/get-location/${childId}`,
          {
            method: 'GET',
            headers: {
              'content-Type': 'application/json',
              Authorization: token,
            },
          },
        );
        if (response.ok) {
          response = await response.json();
          setLocation({
            latitude: response.location.latitude,
            longitude: response.location.longitude,
          });
        } else {
          console.log('an error occurred');
        }
      } catch (e) {
        console.log('exception occurred');
      }
    };

    getLocation();
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
            onPress={() => navigation.navigate('Geo', {location, childId})}>
            <Image source={require('../appAssets/features/location.png')} />
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
          Add Geofencing
        </Text>
      </View>
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
          Current Location: Sukkur IBA University
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
