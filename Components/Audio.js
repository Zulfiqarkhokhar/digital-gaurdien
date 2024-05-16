// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   PermissionsAndroid,
// } from 'react-native';
// import {AntDesign} from 'react-native-vector-icons';
// import {AudioRecorderPlayer} from 'react-native-audio-recorder-player';

// const audioRecorderPlayer = new AudioRecorderPlayer();

// const Audio = () => {
//   const [isRecording, setIsRecording] = useState(false);

//   useEffect(() => {
//     return () => {
//       stopRecording();
//     };
//   }, []);

//   const startRecording = async () => {
//     try {
//       await audioRecorderPlayer.startRecorder();
//       console.log('Recording started');
//     } catch (error) {
//       console.error('Failed to start recording', error);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       await audioRecorderPlayer.stopRecorder();
//       console.log('Recording stopped');
//     } catch (error) {
//       console.error('Failed to stop recording', error);
//     }
//   };

//   const handleRecordAudio = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         {
//           title: 'Audio Recording Permission',
//           message: 'This app needs access to your microphone to record audio.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         setIsRecording(prevState => !prevState);
//         if (!isRecording) {
//           startRecording();
//         } else {
//           stopRecording();
//         }
//       } else {
//         console.log('Audio recording permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handleRecordAudio}>
//         <Text style={styles.buttonText}>
//           {isRecording ? 'Stop Recording' : 'Record Audio'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//   },
//   button: {
//     backgroundColor: '#3498db',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 18,
//   },
// });

// export default Audio;
