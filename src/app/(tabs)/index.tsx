import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';

export default function HomePage() {
  return (
    <ImageBackground
      source={require('../../assets/images/gradientBackground.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require('../../assets/images/icon.png')} style={styles.logo} />

        <Text style={styles.title}>Eathy</Text>
        <Text style={styles.subtitle}>Track your calories and health</Text>


        <TouchableOpacity style={styles.button}>
          <Link href="./sign-in">
            <Text style={styles.buttonText}>Sign in</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Link href="./diary">
            <Text style={styles.buttonText}>Diary</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Link href="./UserInfo">
            <Text style={styles.buttonText}>Profile</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
