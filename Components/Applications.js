import {icon} from '@fortawesome/fontawesome-svg-core';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, Button, TextInput} from 'react-native';
// import {NativeModules} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import {useAuth} from './AuthContext';
// import {NativeModules} from 'react-native';

const Applications = ({navigation}) => {
  const [apps, setApps] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState([]);

  const route = useRoute();
  const {childId} = route.params;

  const {token} = useAuth();
  console.log(token);

  // const {DisableAppModule} = NativeModules;

  // const disableApp = async packageName => {
  //   try {
  //     const result = await DisableAppModule.disableApp(
  //       'com.truedevelopersstudio.automatictap.autoclicker',
  //     );
  //     console.log(result); // Output success message
  //   } catch (error) {
  //     console.error(error); // Output error message
  //   }
  // };
  // const uninstallApp = packageName => {
  //   UninstallModule.uninstallApp('jp.co.translimit.braindots');
  // };

  useEffect(() => {
    const fetchAllApps = async () => {
      try {
        let response = await fetch(
          `https://digital-guardian-backend.vercel.app/api/apps/get-apps/${childId}`,
          {
            method: 'GET',
            headers: {
              'content-Type': 'application/json',
              Authorization: token,
            },
          },
        );
        if (response.ok) {
          // console.log(response);
          response = await response.json();
          // console.log('hity puj yadhi ja');

          // console.log(response.applications[0].applications);
          setApps(response.applications[0].applications);
          setFilter(response.applications[0].applications);
        } else {
          console.log('an error occured');
        }
      } catch (e) {
        console.log('exception occured');
      }
    };
    fetchAllApps();
  }, []);

  const blockApp = async () => {
    // const {BlockAppModule} = NativeModules;
    // if (BlockAppModule) {
    //   const packageName = 'com.rovio.baba'; // Replace with the package name of the app you want to block
    //   await BlockAppModule.blockApp(packageName);
    //   Alert.alert(
    //     'App Blocked',
    //     `The app with package name ${packageName} has been blocked.`,
    //   );
    // } else {
    //   Alert.alert('Error', 'Native module not available.');
    // }
    console.log('App is Blocked');
  };

  const filterData = text => {
    if (text.trim() === '') {
      setApps(apps); // Show all data when search query is empty
    } else {
      const filtered = filter.filter(item =>
        item.label.toLowerCase().includes(text.toLowerCase()),
      );
      setApps(filtered);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <View
        style={{
          backgroundColor: '#190152',
          width: 370,
          height: 80,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ParentDashboard', {childId})}>
          <Image
            style={{width: 30, height: 30, marginLeft: 10}}
            source={require('../appAssets/arrow-left.png')}
            alt="Alternate Text"
            //   style={{ marginTop: 15, marginLeft: 15, marginRight: 5 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold',
            position: 'absolute',
            left: 130,
          }}>
          Applications
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 8,
          backgroundColor: 'white',
          marginLeft: 7,
          marginRight: 7,
          marginTop: 90,
        }}>
        <TextInput
          placeholder="Search App"
          onChangeText={text => {
            setSearchQuery(text);
            filterData(text);
          }}
          value={searchQuery}
        />
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
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    paddingTop: 8,
                    paddingLeft: 5,
                  }}>
                  {item.item.label}
                </Text>
              </View>
              {/* <TouchableOpacity
                style={{
                  backgroundColor: '#190152',
                  width: 80,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  marginTop: 10,
                }}
                onPress={() => blockApp(item.item.packageName)}>
                <Text
                  style={{
                    color: '#fff',
                  }}>
                  Block
                </Text>
              </TouchableOpacity> */}
            </View>
          );
        }}></FlatList>
      <View
        style={{
          width: 360,
          backgroundColor: '#190152',
          height: 60,
          position: 'relative',
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

export default Applications;
