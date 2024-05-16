import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useAuth} from './AuthContext';
import {useRoute} from '@react-navigation/native';

const CameraComponent = () => {
  const [imageUri, setImageUri] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageData, setImageData] = useState([]);
  const {token} = useAuth();

  const route = useRoute();
  const {childId} = route.params;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://digital-guardian-backend.vercel.app/api/camera/get-photos/${childId}`,
          {
            method: 'GET',
            headers: {
              Authorization: token,
            },
          },
        );
        const data = await response.json();
        setImageData(data.camera || []); // Ensure imageData is an array or default to an empty array
        console.log(data);
      } catch (error) {
        console.error('Error fetching image from database:', error);
        // Handle error
      }
    };
    fetchImages();
  }, []);

  const handleFetchImage = () => {
    setCurrentImageIndex(
      currentImageIndex + 1 >= imageData.length ? 0 : currentImageIndex + 1,
    );
  };

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

  const currentImage = imageData[currentImageIndex];

  return (
    <View style={{flex: 1}}>
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
        <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
          {currentImage ? formatDateTime(currentImage.timestamp) : ''}
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {currentImage ? (
          <Image
            source={{uri: currentImage.imageUrl}}
            style={{width: '90%', height: 500, marginTop: 45}}
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
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Fetch Next Image
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraComponent;
