import {View, Text, Image} from 'react-native';
import ClockSlider from './ClockSlider';

function SetScreenTime({navigation}) {
  return (
    <View style={{flex: 1}}>
      <ClockSlider navigation={navigation} />
    </View>
  );
}

export default SetScreenTime;
