import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ClockSlider = ({navigation}) => {
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');

  const handleStartChange = hour => {
    setStartHour(hour);
  };

  const handleEndChange = hour => {
    setEndHour(hour);
  };

  const handleSave = () => {
    // Handle saving the start and end time here
    console.log(`Start Time: ${startHour}, End Time: ${endHour}`);
  };

  return (
    <View style={styles.container}>
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
          Set Screen Time
        </Text>
      </View>
      <Text style={styles.title}>Set Start and End Time</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Start Hour"
          value={startHour}
          onChangeText={handleStartChange}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="End Hour"
          value={endHour}
          onChangeText={handleEndChange}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ScreenTime')}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    width: 100,
  },
  button: {
    backgroundColor: '#190152',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ClockSlider;
