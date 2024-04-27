import {icon} from '@fortawesome/fontawesome-svg-core';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, Button, TextInput} from 'react-native';
import {InstalledApps} from 'react-native-launcher-kit';
import {TouchableOpacity} from 'react-native-gesture-handler';
var index = 0;
const ScreenTimeComponent = ({navigation}) => {
  const [apps, setApps] = useState([]);
  const [screenTime, setScreenTime] = useState([]);

  useEffect(() => {
    const fetchInstalledApps = () => {
      try {
        const res = InstalledApps.getApps();
        setApps(res);
        setFilter(res);
        // console.log(res);
        // console.log(icon);
        console.log(res.length);
      } catch (error) {
        console.error('Error fetching installed apps:', error);
      }
    };

    fetchInstalledApps();
    function generateRandomTimeString() {
      const hours = Math.floor(Math.random() * 24); // Random value between 0 and 23 for hours
      const minutes = Math.floor(Math.random() * 60); // Random value between 0 and 59 for minutes
      return `${hours}.${minutes < 10 ? '0' : ''}${minutes}h`; // Format the string
    }

    // Generate screen time usage data for 71 apps
    const screenTimeData = Array.from({length: 71}, () =>
      generateRandomTimeString(),
    );

    setScreenTime(screenTimeData);
    console.log(screenTimeData);
  }, []);

  return (
    <View>
      <View
        style={{
          width: 340,
          height: 180,
          backgroundColor: '#190152',
          padding: 10,
          margin: 10,
          borderRadius: 14,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#fff', paddingTop: 30, fontWeight: 'bold'}}>
            Screen Time
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SetScreenTime')}
            style={{
              width: 100,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: '#fff',
              marginTop: 20,
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
              }}>
              SetTime Limits
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{color: '#fff', fontSize: 40}}>10h 30m</Text>
          <ProgressBar
            style={{marginTop: 10, height: 10}}
            progress={0.7}
            color={MD3Colors.error60}
          />
        </View>
      </View>
      <FlatList
        data={apps}
        horizontal={false}
        renderItem={item => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{width: 50, height: 50}}
                  source={{
                    uri: `data:image/png;base64,${item.item.icon}`,
                  }}></Image>
                <View style={{paddingTop: 4, paddingLeft: 5}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'black',
                    }}>
                    {item.item.label}
                  </Text>
                  <Text style={{color: '#007bff'}}>
                    total time: {screenTime[Math.floor(Math.random() * 71)]}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}></FlatList>
    </View>
  );
};

export default ScreenTimeComponent;
