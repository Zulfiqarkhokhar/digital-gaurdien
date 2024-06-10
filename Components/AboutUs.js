import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

const AboutUs = ({navigation}) => {
  const route = useRoute();
  const {childId} = route.params;
  console.log(childId);
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
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', {childId})}>
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
            left: 120,
          }}>
          About Us
        </Text>
      </View>

      <View>
        <View>
          <Image
            source={require('../appAssets/sajid.png')}
            style={{
              width: 100,
              height: 100,
              marginBottom: 10,
              borderRadius: 50,
              marginLeft: 50,
            }}></Image>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#000',
              fontWeight: 'bold',
            }}>
            Sajid Ali
          </Text>
          <Text style={{textAlign: 'center', fontSize: 25, color: '#000'}}>
            Backend Developer
          </Text>
        </View>
        <View>
          <Image
            source={require('../appAssets/zulfiqar.png')}
            style={{
              width: 100,
              height: 100,
              marginBottom: 10,
              borderRadius: 50,
              marginLeft: 50,
            }}></Image>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#000',
              fontWeight: 'bold',
            }}>
            Zulfiqar Ali
          </Text>
          <Text style={{textAlign: 'center', fontSize: 25, color: '#000'}}>
            Frontend Developer
          </Text>
        </View>
        <View>
          <Image
            source={require('../appAssets/iqra.jpg')}
            style={{
              width: 100,
              height: 100,
              marginBottom: 10,
              borderRadius: 50,
              marginLeft: 50,
            }}></Image>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#000',
              fontWeight: 'bold',
            }}>
            Iqra Nadeem
          </Text>
          <Text style={{textAlign: 'center', fontSize: 25, color: '#000'}}>
            UI/UX Designer
          </Text>
        </View>
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

export default AboutUs;
