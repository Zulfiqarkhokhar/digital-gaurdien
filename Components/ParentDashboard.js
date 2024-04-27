import {
  View,
  Text,
  NativeBaseProvider,
  Button,
  Heading,
  Box,
  FlatList,
} from 'native-base';

import {StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function ParentDashboard({navigation}) {
  const featureData = [
    {
      name: 'Location',
      icon: require('../appAssets/features/location.png'),
    },
    {
      name: 'Block App',
      icon: require('../appAssets/features/block.png'),
    },
    {
      name: 'Screen Time',
      icon: require('../appAssets/features/screenTime.png'),
    },
    {
      name: 'Camera',
      icon: require('../appAssets/features/camera.png'),
    },
    {
      name: 'Audio',
      icon: require('../appAssets/features/audio.png'),
    },
    {
      name: 'Mirroring',
      icon: require('../appAssets/features/mirror.png'),
    },
    {
      name: 'Data Usage',
      icon: require('../appAssets/features/data.png'),
    },
    {
      name: 'Notification',
      icon: require('../appAssets/features/notification.png'),
    },
    {
      name: 'Activity',
      icon: require('../appAssets/features/activity.png'),
    },
  ];

  const handleClick = name => {
    console.log(name);
    switch (name) {
      case 'Location': {
        navigation.navigate('Location');
        break;
      }
      case 'Data Usage': {
        navigation.navigate('DataUsage');
        break;
      }
      case 'Screen Time': {
        navigation.navigate('ScreenTime');
        break;
      }
      case 'Block App': {
        navigation.navigate('Applications');
        break;
      }
      case 'Camera': {
        navigation.navigate('Camera');
        break;
      }
      case 'Activity': {
        navigation.navigate('Geo');
        break;
      }
      case 'Audio': {
        navigation.navigate('AppInfo');
        break;
      }
      case 'Notification': {
        navigation.navigate('ScreenTime');
        break;
      }
    }
  };

  return (
    <NativeBaseProvider>
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* Header here */}

        <View
          style={{
            backgroundColor: '#190152',
            width: 360,
            height: 250,
            marginBottom: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                size={150}
                borderRadius={100}
                source={require('../appAssets/mobileIcon.png')}
                alt="Alternate Text"
                //   style={{ marginTop: 15, marginLeft: 15, marginRight: 5 }}
              />
              <Text
                style={{
                  marginTop: 10,
                  marginLeft: 5,
                  fontSize: 20,
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                OPPO A12
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupChild')}>
              <Image
                size={150}
                borderRadius={100}
                source={require('../appAssets/more.png')}
                alt="Alternate Text"
                style={{}}
              />
            </TouchableOpacity>
          </View>

          {/* Todays Activities */}

          <View
            style={{
              height: 10,
              backgroundColor: '#fff',
              borderRadius: 20,
              marginLeft: 20,
              marginRight: 20,
            }}></View>

          <View
            style={{
              height: 200,
              backgroundColor: '#fff',
              borderRadius: 20,
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              borderWidth: 1,
              borderColor: 'grey',
              padding: 15,
              paddingLeft: 20,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Today’s Activities
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                marginTop: 3,
              }}>
              Click to see detailed{' '}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity>
                <Image
                  size={150}
                  source={require('../appAssets/expand.png')}
                  alt="Alternate Text"
                  style={{marginTop: 20}}
                />
              </TouchableOpacity>
              <Image
                size={150}
                source={require('../appAssets/hero.png')}
                alt="Alternate Text"
                style={{}}
              />
            </View>
          </View>
        </View>

        {/* Features List Here */}

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            width: 360,
            backgroundColor: 'white',
            margin: 20,
          }}>
          <FlatList
            data={featureData}
            horizontal={false}
            numColumns={3}
            renderItem={item => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      backgroundColor: '#EDE5F4',
                      borderRadius: 50,
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => handleClick(item.item.name)}>
                      <Image source={item.item.icon} style={{}} />
                    </TouchableOpacity>
                  </View>
                  <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                    {item.item.name}
                  </Text>
                </View>
              );
            }}></FlatList>
        </View>

        {/* Footer Here */}

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
            <TouchableOpacity>
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
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 30,
    backgroundColor: '#6A00BF',
  },
});
