import {icon} from '@fortawesome/fontawesome-svg-core';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, Button, TextInput} from 'react-native';
import {InstalledApps} from 'react-native-launcher-kit';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
var index = 0;
const ScreenTimeComponent = ({navigation}) => {
  const route = useRoute();
  const {childId} = route.params;
  console.log(childId);

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
      const hours = Math.floor(Math.random() * 1); // Random value between 0 and 23 for hours
      const minutes = Math.floor(Math.random() * 30); // Random value between 0 and 59 for minutes
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <View
        style={{
          width: 370,
          height: 180,
          backgroundColor: '#190152',
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ParentDashboard', {childId})}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../appAssets/arrow-left.png')}
            alt="Alternate Text"
            //   style={{ marginTop: 15, marginLeft: 15, marginRight: 5 }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#fff', paddingTop: 10, fontWeight: 'bold'}}>
            Screen Time
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SetScreenTime', {childId})}
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
          <Text style={{color: '#fff', fontSize: 40}}>3h 03m</Text>
          <ProgressBar
            style={{marginTop: 10, height: 10}}
            progress={0.3}
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
            justifyContent: 'space-evenly',
            marginLeft: 30,
            marginRight: 30,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ParentDashboard', {childId})}>
            <Image
              size={150}
              source={require('../appAssets/footer/home.png')}
              alt="Alternate Text"
              style={{marginTop: 20}}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Image
              size={150}
              source={require('../appAssets/footer/detail.png')}
              alt="Alternate Text"
              style={{marginTop: 20}}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', {childId})}>
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

export default ScreenTimeComponent;
