import {
  View,
  Text,
  NativeBaseProvider,
  Button,
  Heading,
  VStack,
  FormControl,
  Input,
  Box,
} from 'native-base';
import {StyleSheet, ToastAndroid} from 'react-native';
import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';

export default function SignupChild({navigation}) {
  const route = useRoute();
  const {childId} = route.params;
  console.log(childId);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const showToast = () => {
    ToastAndroid.show('Child Created Successfully!', ToastAndroid.SHORT);
  };

  const handleCreateChild = async e => {
    e.preventDefault();

    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWUzYmNlOGQ2NjJlZTU4OGJhYjBhZSIsInVzZXJuYW1lIjoic2FqaWRAZ21haWwuY29tIiwiaWF0IjoxNzAwNjc3ODA3fQ.w1K3F7ZWNwZkTURUhaBD2esfzg2OoxGNNsGXArdxax8'; // Add your parent's JWT token here

      const response = await fetch(
        'https://digital-guardian-backend.vercel.app/api/parent/create-child',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token, // Include the parent's JWT token
          },
          body: JSON.stringify({name, username, password}),
        },
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        navigation.navigate('ParentDashboard', {childId});
        setMessage(data.message || 'Child created successfully');
        setError('');
        showToast();
        // console.log(message);
      } else {
        setMessage('');
        setError(data.message || 'Failed to create child');
        // console.log(error);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('');
      setError('Server error');
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Heading>
          <Text>Welcome</Text>
        </Heading>
        <Text>Sign Up for Child</Text>
        <View
          style={{
            marginTop: 10,
            width: 280,
          }}>
          <Input
            variant="outline"
            placeholder="Name"
            style={styles.box}
            onChangeText={text => setName(text)}
          />
          <Input
            variant="outline"
            placeholder="Username"
            style={styles.box}
            mt="3"
            onChangeText={text => setUsername(text)}
          />
          <Input
            variant="outline"
            placeholder="Password"
            style={styles.box}
            mt="3"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          <Input
            variant="outline"
            placeholder="Confirm Password"
            style={styles.box}
            mt="3"
            secureTextEntry={true}
          />
        </View>
        <Button
          mt="3"
          colorScheme="indigo"
          style={styles.btn}
          _text={{
            color: '#fff',
            fontWeight: 'medium',
            fontSize: 'sm',
          }}
          // onPress={() => navigation.navigate("ChildInterface")}
          onPress={e => handleCreateChild(e)}>
          Sign up
        </Button>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  box: {
    width: 280,
    height: 50,
  },
  btn: {
    width: 280,
    height: 50,
    backgroundColor: '#190152',
  },
});
