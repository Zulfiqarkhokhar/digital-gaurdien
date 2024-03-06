import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ParentDashboard from './Components/ParentDashboard';
import ChildInterface from './Components/ChildInterface';
import ChildLogin from './Components/ChildLogin';
import SignupChild from './Components/SignupChild';
import Location from './Components/Location';
// import DataUsage from './Components/DataUsage';
import Applications from './Components/Applications';
import Geofencing from './Components/Geofencing';

const Stack = createStackNavigator();
export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Login /> */}
    //   {/* <Signup /> */}
    //   {/* <ParentDashboard /> */}
    //   {/* <ChildInterface /> */}
    //   {/* <ChildLogin /> */}
    //   <SignupChild />
    // </View>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignupChild" component={SignupChild} />
        <Stack.Screen name="ChildLogin" component={ChildLogin} />
        <Stack.Screen name="ParentDashboard" component={ParentDashboard} />
        <Stack.Screen name="ChildInterface" component={ChildInterface} />
        <Stack.Screen name="Location" component={Location} />
        {/* <Stack.Screen name="DataUsage" component={DataUsage} /> */}
        <Stack.Screen name="Applications" component={Applications} />
        <Stack.Screen name="Camera" component={Geofencing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
