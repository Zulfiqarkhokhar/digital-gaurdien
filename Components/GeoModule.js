// Geofencing.js

import {NativeModules} from 'react-native';

const {GeofencingModule} = NativeModules;

const GeoModule = {
  setGeofence: (latitude, longitude, radius) => {
    GeofencingModule.setGeofence(latitude, longitude, radius);
  },
  checkGeofence: (latitude, longitude, callback) => {
    GeofencingModule.checkGeofence(latitude, longitude, callback);
  },
};

export default GeoModule;
