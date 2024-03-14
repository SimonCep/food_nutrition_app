import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Handle sign in action here
  };

  return (
    <ImageBackground source={require('../../assets/images/backgroundImage2.png')} className='bg-white flex-1 justify-center resize-y'>
      <View className="flex-1 p-5 justify-center">
        <Stack.Screen options={{ title: 'Sign in', headerTitleAlign: 'center' }} />
        <View className="bg-white p-8 rounded-xl shadow-md">
          <Text className="text-gray-500 text-lg mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="labaskrabas@gmail.com"
            className="border border-gray-400 p-3 mt-1 mb-4 bg-white rounded-md text-lg"
          />
          <Text className="text-gray-500 text-lg mb-2">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder=""
            className="border border-gray-400 p-3 mt-1 mb-6 bg-white rounded-md text-lg"
            secureTextEntry
          />
          <TouchableOpacity onPress={handleSignIn} className="bg-yellow-400 py-3 rounded-full mb-4">
            <Text className="text-black font-bold text-lg text-center">Sign in</Text>
          </TouchableOpacity>
          <Link href="/sign-up" className="self-center font-bold text-black text-lg">
            Create an account
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignInScreen;