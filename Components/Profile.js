import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const Profile = ({navigation}) => {
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
          Profile
        </Text>
      </View>

      <View>
        <View style={{}}>
          <Image
            source={require('../appAssets/profile.png')}
            style={{
              width: 100,
              height: 100,
              position: 'relative',
              top: 0,
              left: 110,
              marginBottom: 30,
            }}></Image>
          <Text style={{textAlign: 'center', fontSize: 20, color: '#000'}}>
            Zulfiqar Ali
          </Text>
        </View>
        <View style={{margin: 10, position: 'relative', left: 40}}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => navigation.navigate('Signup')}>
            <Image
              source={require('../appAssets/add.png')}
              style={{width: 30, height: 30}}></Image>
            <Text style={{margin: 5}}>Add another parent account</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#190152',
            height: 5,
            width: 320,
            borderRadius: 10,
          }}></View>

        <TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#000',
              margin: 10,
            }}>
            Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#000',
              margin: 10,
            }}>
            About Us
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#000',
              margin: 10,
            }}>
            Help Center
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#000',
              margin: 10,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
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
          <TouchableOpacity>
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

const styles = StyleSheet.create({
  line: {
    width: '100%', // Take up full width
    height: 1, // Adjust height as needed
    backgroundColor: '#000', // Change color as needed
  },
});

export default Profile;
