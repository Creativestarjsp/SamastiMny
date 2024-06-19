import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ProgressViewIOS,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import profileApi from '../../Services/Api/profileApi';
import { useSelector } from 'react-redux';
import axiosInstance from '../../Services/Api/axios';
// import ProgressBarAndroid from '@react-native-community/progress-bar-android';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const token = useSelector((state) => state.auth?.token);

  const image_upload = async (token, image) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const config = {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadPercentage(percentCompleted);
        },
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      };

      await axiosInstance.put(`/upload`, formData, config);

      setLoading(false);
      setUploadPercentage(0);
      
      alert('Uploaded');
    } catch (error) {
      setLoading(false);
      setUploadPercentage(0);
      console.log('Error uploading image:', error);
      alert('Something Went Wrong');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const status = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        if (status !== RESULTS.GRANTED) {
          const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

          if (result !== RESULTS.GRANTED) {
            console.log('Permission to access media library denied');
          }
        }
      } catch (error) {
        console.log('Error checking media library permission:', error);
      }
    })();
  }, []);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel) {
        image_upload(token, response.assets[0].uri);
        setImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
    
      {!loading ? <>
        <Text style={styles.title}>Image Upload</Text>
       
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Select Image</Text>
          
        </TouchableOpacity>
         <Text>Note:Please Provide Media library permission before select Image</Text>
        </> :
      <View></View>}
     

      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          
          <Text> Uploading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressBar: {
    width: 200,
    marginTop: 10,
  },
});

export default ImageUpload;
