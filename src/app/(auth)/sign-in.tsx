import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { colorScheme } = useColorScheme();

  const handleSignIn = () => {
    // TODO: Handle sign in action here
  };

  return (
    <ImageBackground
      source={require('../../assets/images/backgroundImage2.png')}
      className={`${colorScheme === 'dark' ? 'bg-gray-800' : 'bg-white'} flex-1 justify-center resize-y`}
    >
      <View className="flex-1 p-5 justify-center">
        <Stack.Screen options={{ title: 'Sign in', headerTitleAlign: 'center' }} />
        <View className={`${colorScheme === 'dark' ? 'bg-gray-700' : 'bg-white'} p-8 rounded-xl shadow-md`}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={colorScheme === 'dark' ? '#A0AEC0' : '#4B5563'}
            className={`border-2 ${
              colorScheme === 'dark' ? 'border-gray-600' : 'border-black'
            } p-3 mt-1 mb-4 ${
              colorScheme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } rounded-md text-lg ${
              colorScheme === 'dark' ? 'text-white' : 'text-black'
            }`}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={colorScheme === 'dark' ? '#A0AEC0' : '#4B5563'}
            className={`border-2 ${
              colorScheme === 'dark' ? 'border-gray-600' : 'border-black'
            } p-3 mt-1 mb-6 ${
              colorScheme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } rounded-md text-lg ${
              colorScheme === 'dark' ? 'text-white' : 'text-black'
            }`}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={handleSignIn}
            className={`${
              colorScheme === 'dark' ? 'bg-yellow-600' : 'bg-yellow-400'
            } py-3 rounded-full border-2 ${
              colorScheme === 'dark' ? 'border-white' : 'border-black'
            }`}
          >
            <Text className={`${
              colorScheme === 'dark' ? 'text-white' : 'text-black'
            } font-bold text-lg text-center`}>
              Sign in
            </Text>
          </TouchableOpacity>
          <Link
            href="/sign-up"
            className={`self-center font-bold ${
              colorScheme === 'dark' ? 'text-white' : 'text-black'
            } text-lg`}
          >
            Create an account
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignInScreen;