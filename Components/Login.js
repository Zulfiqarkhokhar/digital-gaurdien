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
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import axios from 'axios';
import Loading from './Loading';

export default function Login({navigation}) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const [indicator, setIndicator] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);

    // setIndicator(true);
    try {
      const response = await fetch(
        'https://digital-guardian-backend.vercel.app/api/auth/parent/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username, password}),
        },
      );
      // navigation.navigate('Loading,', {replace: true});
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        console.log(responseData.data);
        setLoading(false);
        navigation.navigate('ParentDashboard');
        setMessage('Login successful');
        setError('');
        setIndicator(false);
        // If you want to store the token in local storage or state, you can do it here
      } else {
        // Handle non-2xx status codes
        setError(responseData.message || 'Login failed');
        setMessage('');
      }
    } catch (error) {
      console.log(error);
      // Handle network errors or exceptions
      setError('Network error');
      setMessage('');
    }
  };

  return (
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
                onPress={() => console.log('hello world')}
                _text={{
                  color: '#fff',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                style={styles.btn1}>
                Parent
              </Button>
              <Button
                onPress={() => navigation.navigate('ChildLogin')}
                variant="outline"
                _text={{
                  color: '#190152',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                style={styles.btn2}>
                Child
              </Button>
            </Button.Group>
            <View
              style={{
                marginTop: 10,
                width: 280,
              }}>
              {/* // Input Area for parent */}
              <Input
                variant="outline"
                placeholder="Email address"
                style={{}}
                onChangeText={text => setUserName(text)}
              />
              <Input
                variant="outline"
                placeholder="Password"
                style={styles.input}
                mt="3"
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
            _text={{
              color: '#fff',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            style={styles.btn3}
            mt="6"
            onPress={e => handleLogin(e)}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Login</Text>
          </Button>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            mt="6">
            <Divider style={{flex: 1, height: 1, backgroundColor: '#757171'}} />
            <Text style={{marginHorizontal: 10, color: '#757171'}}>
              Or Sign Up
            </Text>
            <Divider style={{flex: 1, height: 1, backgroundColor: '#757171'}} />
          </View>
          <Flex direction="row" mt="6">
            <Text
              fontSize="sm"
              color="#757171"
              _dark={{
                color: 'warmGray.200',
              }}>
              Not register yet ?{' '}
            </Text>

            {/* //Link to Signup */}

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{color: '#3F51B5'}}>Create Account</Text>
            </TouchableOpacity>
          </Flex>
        </View>
      )}
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
    color: '#6A00BF',
  },
  btn3: {
    width: 280,
    height: 50,
    backgroundColor: '#190152',
  },
  input: {
    width: 300,
    height: 50,
  },
});
