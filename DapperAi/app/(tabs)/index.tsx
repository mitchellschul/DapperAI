import { Image, StyleSheet, Platform, TouchableOpacity, ScrollView, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FIREBASE_DB } from '@/firebaseConfig';
import { ref, set, serverTimestamp } from 'firebase/database';
import { useState } from 'react';

export default function HomeScreen() {

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const db = FIREBASE_DB;

  const handleCameraPress = () => {
    console.log('Camera pressed');
  };

  const handleOpenCamera = () => {
    console.log('Open camera');
    setIsLoading(true);
    setError(null);
  };

  const handleSaveImage = () => {
    console.log('Save image');
    const imageRef = ref(FIREBASE_DB, 'images');
    const image = {
      uri: 'path/to/image.jpg',
      timestamp: serverTimestamp(),
    };
    set(imageRef, image);
    console.log('Image saved');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.titleContainer}>
        <TouchableOpacity style={styles.cameraButton}>
          <ThemedText>Open Camera</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  cameraButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});