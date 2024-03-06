import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import {useState} from 'react';
// import LottieView from "lottie-react-native";

export default function ChildInterface() {
  const [toggleValue, setToggleValue] = useState(Array(6).fill(false));

  const onToggleChange = index => {
    setToggleValue(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  const Permissions = [
    {
      name: 'Allow Camera',
      Icon: require('../appAssets/features/camera.png'),
    },
    {
      name: 'Allow Location',
      Icon: require('../appAssets/features/location.png'),
    },
    {
      name: 'Allow Audio',
      Icon: require('../appAssets/features/audio.png'),
    },
    {
      name: 'Allow Notification',
      Icon: require('../appAssets/features/notification.png'),
    },
    {
      name: 'Allow Apps',
      Icon: require('../appAssets/features/block.png'),
    },
    {
      name: 'Allow Screen',
      Icon: require('../appAssets/features/mirror.png'),
    },
  ];

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
          backgroundColor: '#6A00BF',
          width: 370,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          Allow All Permissions
        </Text>
      </View>
      <Image
        source={require('../appAssets/hero2.png')}
        style={{margin: 20}}></Image>
      {/* <View style={{ flex: 1 }}>
        <LottieView
          source={require("../appAssets/lotties/Animation - 1700757289450.json")} // Replace with the actual path to your Lottie animation file
          autoPlay
          loop
        />
      </View> */}
      <View
        style={{
          backgroundColor: '#6A00BF',
          height: 10,
          width: 320,
          borderRadius: 20,
        }}></View>

      {/* List Of Permission */}

      <View style={{flex: 1}}>
        <FlatList
          data={Permissions}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', width: 300}}>
                  <Image source={item.Icon} style={{margin: 20}} />
                  <Text
                    style={{marginTop: 20, fontSize: 18, fontWeight: 'bold'}}>
                    {item.name}
                  </Text>
                </View>
                <View style={{marginRight: 20, marginTop: 10}}>
                  <Switch
                    trackColor={{false: '#767577', true: '#6A00BF'}}
                    thumbColor="#fff"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => onToggleChange(index)} // Corrected this line
                    value={toggleValue[index]}
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Footer Here */}

      <View
        style={{
          width: 360,
          backgroundColor: '#6A00BF',
          height: 60,
          marginTop: 10,
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
}
