import React, {useState, useRef, useEffect} from 'react';
import {Text, Image, View} from 'react-native';
import ViewShot, {captureScreen} from 'react-native-view-shot';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAuth} from './AuthContext';
import {useRoute} from '@react-navigation/native';

const ScreenShot = () => {
  const {token} = useAuth();
  const route = useRoute();
  const {childId} = route.params;
  console.log(childId);

  const [image, setImage] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchScreenShot = async () => {
      try {
        const response = await fetch(
          `https://digital-guardian-backend.vercel.app/api/screencast/get-photos/${childId}`,
          {
            method: 'GET',
            headers: {
              Authorization: token,
            },
          },
        );
        const data = await response.json(); // Ensure imageData is an array or default to an empty array
        console.log(data);
        setImage(data.screen);
      } catch (error) {
        console.error('Error fetching image from database:', error);
        // Handle error
      }
    };
    fetchScreenShot();
  }, []);

  const formatDateTime = timestamp => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedDate} ${hours}:${minutes} ${ampm}`;
  };
  const handleFetchImage = () => {
    setCurrentImageIndex(
      currentImageIndex + 1 >= image.length ? 0 : currentImageIndex + 1,
    );
  };
  const currentImage = image[currentImageIndex];

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#190152',
          width: 370,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
        <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
          {currentImage ? formatDateTime(currentImage.timestamp) : ''}
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {currentImage ? (
          <Image
            source={{uri: currentImage.imageUrl}}
            style={{width: 250, height: 500}}
          />
        ) : (
          <Text>No image fetched from the database</Text>
        )}
        <TouchableOpacity
          onPress={handleFetchImage}
          style={{
            width: 280,
            height: 50,
            backgroundColor: '#190152',
            marginTop: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Fetch Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScreenShot;
