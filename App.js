import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Image, CameraRoll, Modal, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Function to handle flipping the camera
  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  // Function to handle taking a picture
  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setCapturedImages([...capturedImages, uri]);
      setIsCameraOpen(false);
    }
  };

  // Render captured images
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      <Image source={{ uri: item }} style={styles.imageThumbnail} />
    </TouchableOpacity>
  );

  // Handle when user clicks on a captured image
  const handleImagePress = (imageUri) => {
    // Handle what should happen when user clicks on a captured image
  };

  return (
    <View>
      <Modal visible={isCameraOpen} animationType="slide">
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={cameraType} ref={(ref) => (cameraRef = ref)}>
            <View style={styles.cameraButtonsContainer}>
              <Button title="Camera Flip" onPress={flipCamera} />
              <Button title="Take Picture" onPress={takePicture} />
              <Button title="Home" onPress={() => setIsCameraOpen(false)} />
            </View>
          </Camera>
        </View>
      </Modal>

      <View>
        <Button  title="Open Camera" onPress={() => setIsCameraOpen(true)} />
        <FlatList
          data={capturedImages}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          numColumns={3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 40, // Adjust this value as needed for spacing
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
  },
});
