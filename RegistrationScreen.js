import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app, auth } from './firebaseConfig.js';


const registerUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User registered successfully:', user);
    return user;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterPress = () => {
    registerUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Registration successful!');
        // You can navigate to another screen after successful registration if needed
      })
      .catch((error) => {
        console.error('Registration error:', error.message);
      });
  };

  const handleLoginPress = () => {
    // Navigate to the login screen
    navigation.navigate('Login');
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>User Registration</Text>

      <TextInput
        placeholder="Enter your email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, padding: 8 }}
      />

      <TextInput
        placeholder="Enter your password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, padding: 8 }}
      />

      <Button title="Register" onPress={handleRegisterPress} />
      <Button title="Login" onPress={handleLoginPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegistrationScreen;
