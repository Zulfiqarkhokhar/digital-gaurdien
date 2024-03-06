// import React, {useEffect} from 'react';
// import {View, Text} from 'react-native';
// import {PermissionsAndroid} from 'react-native';
// import {TrafficStats} from 'react-native-traffic-stats';

// const DataUsage = () => {
//   useEffect(() => {
//     const requestPermissions = async () => {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
//           {
//             title: 'Permission Request',
//             message:
//               'This app needs access to your phone state for network statistics.',
//           },
//         );

//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           const mobileRxBytes = TrafficStats.getMobileRxBytes();
//           const mobileTxBytes = TrafficStats.getMobileTxBytes();
//           const totalRxBytes = TrafficStats.getTotalRxBytes();
//           const totalTxBytes = TrafficStats.getTotalTxBytes();

//           console.log('Mobile RX Bytes: ', mobileRxBytes);
//           console.log('Mobile TX Bytes: ', mobileTxBytes);
//           console.log('Total RX Bytes: ', totalRxBytes);
//           console.log('Total TX Bytes: ', totalTxBytes);
//         } else {
//           console.log('Permission denied.');
//         }
//       } catch (error) {
//         console.error('Permission request error: ', error);
//       }
//     };

//     requestPermissions();
//   }, []);

//   return (
//     <View>
//       <Text>Check the console for network statistics</Text>
//     </View>
//   );
// };

// export default DataUsage;
