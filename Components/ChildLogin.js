import {
  NativeBaseProvider,
  Text,
  View,
  Button,
  Box,
  Flex,
  Input,
  Link,
  Divider,
} from 'native-base';
import {StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import Loading from './Loading';
import {useAuth} from './AuthContext';
export default function ChildLogin({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();
  const showToast = () => {
    ToastAndroid.show('Invalid User!', ToastAndroid.SHORT);
  };

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        'https://digital-guardian-backend.vercel.app/api/child/login',
        {
          username,
          password,
        },
      );

      if (response.status === 200) {
        setMessage('Login successful');
        setError('');
        setLoading(false);
        console.log(response.data);
        login(response.data.data);
        navigation.navigate('ChildInterface');
        // Handle further actions after successful login if needed
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        setMessage('');
        setLoading(false);
        showToast();
      } else if (error.request) {
        setError('Network error');
        setMessage('');
      } else {
        setError('Error: ' + error.message);
        setMessage('');
      }
    }
  };

  return (
    <>
      <NativeBaseProvider>
        {loading ? (
          <Loading />
        ) : (
          <View style={styles.container}>
            <Text style={styles.headingText}>Login Account as</Text>
            <Box alignItems="center" mt="6">
              {/* //Parent and Child Buttons */}

              <Button.Group isAttached>
                <Button
                  onPress={() => navigation.navigate('Login')}
                  variant="outline"
                  _text={{
                    color: '#190152',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                  style={styles.btn2}>
                  Parent
                </Button>
                <Button
                  // onPress={() => console.log("hello world")}
                  _text={{
                    color: '#fff',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                  style={styles.btn1}>
                  Child
                </Button>
              </Button.Group>
              <View
                style={{
                  marginTop: 10,
                  width: 280,
                }}>
                {/* // Input Area for Child */}
                <Input
                  variant="outline"
                  placeholder="Username"
                  style={styles.input}
                  onChangeText={text => setUsername(text)}
                />
                <Input
                  variant="outline"
                  placeholder="Password"
                  style={styles.input}
                  mt="3"
                  secureTextEntry={true}
                  onChangeText={text => setPassword(text)}
                />
                <Link
                  _text={{
                    fontSize: 'xs',
                    fontWeight: '500',
                    color: 'indigo.500',
                  }}
                  alignSelf="flex-end"
                  mt="1"
                  href="#">
                  Forget Password?
                </Link>
              </View>
            </Box>
            {/* // Login Button For Parent */}

            <Button
              // onPress={() => navigation.navigate("ChildInterface")}
              onPress={e => handleLogin(e)}
              _text={{
                color: '#fff',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              style={styles.btn3}
              mt="6">
              Login
            </Button>
          </View>
        )}
      </NativeBaseProvider>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn1: {
    width: 140,
    height: 50,
    backgroundColor: '#190152',
  },
  btn2: {
    width: 140,
    height: 50,
    color: '#190152',
  },
  btn3: {
    width: 280,
    height: 50,
    backgroundColor: '#190152',
  },
  input: {
    width: 280,
    height: 50,
  },
});
