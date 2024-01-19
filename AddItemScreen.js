import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref as dbRef, push as dbPush, set } from 'firebase/database';

const AddItemScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const [generatedItemId, setGeneratedItemId] = useState(null); // Added state for the generated item ID
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        console.error('Camera permission not granted');
      }
    })();
  }, []);

  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        const options = { quality: 1, base64: true };
        const photoData = await cameraRef.current.takePictureAsync(options);
        setPhoto(photoData);
      } else {
        console.error('Camera reference is not available');
      }
    } catch (error) {
      console.error('Error taking picture:', error.message);
    }
  };
  

  const saveItem = async () => {
    try {
      const database = getDatabase();
      const itemsRef = dbRef(database, 'items');
      const newItemRef = dbPush(itemsRef);
      const itemData = {
        name: name,
        description: description,
        price: price,
        imageURL: photo ? photo.uri : null, // Check if photo is available
      };
  
      // Save the item with the generated key
      await set(newItemRef, itemData);
  
      // Store the generated key in the state
      setGeneratedItemId(newItemRef.key);
  
      // Clear the state and navigate to HomeScreen
      setName('');
      setDescription('');
      setPrice('');
      setPhoto(null);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving item:', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      {photo ? (
        <View>
          <Image source={{ uri: photo.uri }} style={styles.photo} />
          <Button title="Save Item" onPress={saveItem} />
          <Button title="Discard" onPress={() => setPhoto(null)} />
        </View>
      ) : (
        <Camera style={{ flex: 1, aspectRatio: 9 / 16 }} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button title="Take Pic" onPress={takePicture} />
          </View>
        </Camera>
      )}

      <TextInput
        placeholder="Enter Name"
        onChangeText={(text) => setName(text)}
        value={name}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter Description"
        onChangeText={(text) => setDescription(text)}
        value={description}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter Price"
        onChangeText={(text) => setPrice(text)}
        value={price}
        keyboardType="numeric"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  photo: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default AddItemScreen;
