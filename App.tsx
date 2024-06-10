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
import Profile from './Components/Profile';
import Loading from './Components/Loading';
import SplashScreen from './Components/SplashScreen';
import Geo from './Components/Geo';
import AppInfo from './Components/AppInfo';
import ScreenTimeComponent from './Components/ScreenTimeComponent';
import SetScreenTime from './Components/SetScreenTime';
import CameraComponent from './Components/CameraComponent';
import DataUsage from './Components/DataUsage';
import Notifications from './Components/Notifications';
// import Audio from './Components/Audio';
// import AppInfo from './Components/AppInfo';
import {AuthProvider} from './Components/AuthContext';
import ScreenShot from './Components/ScreenShot';
import ChildList from './Components/ChildList';
import AboutUs from './Components/AboutUs';

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
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignupChild"
            component={SignupChild}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChildLogin"
            component={ChildLogin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ParentDashboard"
            component={ParentDashboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChildInterface"
            component={ChildInterface}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Location"
            component={Location}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen name="DataUsage" component={DataUsage} /> */}
          <Stack.Screen
            name="Applications"
            component={Applications}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AppInfo"
            component={AppInfo}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Geo"
            component={Geo}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ScreenTime"
            component={ScreenTimeComponent}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SetScreenTime"
            component={SetScreenTime}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Camera"
            component={CameraComponent}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DataUsage"
            component={DataUsage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Screen"
            component={ScreenShot}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Children"
            component={ChildList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AboutUs"
            component={AboutUs}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
          name="Audio"
          component={Audio}
          options={{headerShown: false}}
        /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
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
