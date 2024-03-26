import React from 'react';
import { ScrollView, View, Text, ImageBackground, Image } from 'react-native';

export default function AboutUs() {
  
  return (
    
    <ImageBackground source={require('../assets/images/backgroundImage2.png')} className='bg-white dark:bg-black flex-1 justify-center resize-y'>
      <ScrollView>
        <View className="flex-grow flex-row justify-center">
          <Text className='uppercase text-left ml-11 mt-10 text-6xl font-bold color-green-500'>
            Eat
          </Text>
          <Text className='uppercase text-left mt-10 text-6xl font-bold text-black dark:text-white'>
            ing
          </Text>
        </View>

        <View className="flex-grow flex-row justify-center">
          <Text className='uppercase text-left text-6xl font-bold text-black dark:text-white'>
            Heal
          </Text>
          <Text className='uppercase text-left mr-14 text-6xl font-bold color-green-500'>
            thy
          </Text>
        </View>

        <View className="items-center mt-10 mb-5">
          <View className="w-48 h-48 rounded-full mb-4 shadow-lg bg-white">
                <Image source={require('../assets/images/icon.png')} className="w-48 h-48 rounded-full" />
          </View>
        </View>

        <View className=' bg-emerald-100 rounded-3xl m-5 mr-14'>
          <Text className='text-left ml-10 mt-10 text-3xl text-black dark:text-white'>
            Our mission
          </Text>
          <Text className='text-left m-10 text-black dark:text-white'>
          At EATHY, our mission is to empower individuals on their journey towards better health and well-being. We believe that everyone deserves access to personalized nutrition guidance, whether they are managing an illness or simply striving to make healthier choices. Our app combines the convenience of meal tracking with tailored recommendations, catering to the unique needs of each user. We are committed to providing a supportive platform that fosters positive change and encourages sustainable lifestyle habits.
          </Text>
        </View>

        <View className=' bg-emerald-100 rounded-3xl m-5 ml-14'>
          <Text className='text-right mr-10 mt-10 text-3xl text-black dark:text-white'>
            Our Values
          </Text>
          <Text className='text-left m-10 text-pretty text-black dark:text-white'>
            Accessibility: We are dedicated to making our app accessible to all, regardless of health condition, dietary preference, or socioeconomic status.
          </Text>
          <Text className='text-left mr-10 ml-10 text-pretty text-black dark:text-white'>
            Accuracy: We prioritize accuracy and evidence-based recommendations, ensuring that our users receive reliable information to guide their dietary choices.
          </Text>
          <Text className='text-left m-10 text-pretty text-black dark:text-white'>
            Community feedback: We believe that community feedback allows us to prioritize features and updates based on what matters most to our users, ensuring that our platform remains relevant and impactful.
          </Text>
        </View>

        <View className=' bg-emerald-100 rounded-3xl m-5 mr-14'>
          <Text className='text-left ml-10 mt-10 text-3xl text-black dark:text-white'>
            Meet the team
          </Text>
          <Text className='text-left mt-10 ml-10 text-pretty text-black dark:text-white'>
            Studentas: 
          </Text>
          <Text className='text-left ml-10 text-pretty text-black dark:text-white'>
          studento.pastas@ktu.edu
          </Text>
          <Text className='text-left mt-10 ml-10 text-pretty text-black dark:text-white'>
          Studentas: 
          </Text>
          <Text className='text-left ml-10 text-pretty text-black dark:text-white'>
          studento.pastas@ktu.edu
          </Text>
          <Text className='text-left mt-10 ml-10 text-pretty text-black dark:text-white'>
          Studentas:
          </Text>
          <Text className='text-left ml-10 text-pretty text-black dark:text-white'>
          studento.pastas@ktu.edu
          </Text>
          <Text className='text-left mt-10 ml-10 text-pretty text-black dark:text-white'>
          Studentas: 
          </Text>
          <Text className='text-left ml-10 text-pretty text-black dark:text-white'>
          studento.pastas@ktu.edu
          </Text>
          <Text className='text-left mt-10 ml-10 text-pretty text-black dark:text-white'>
          Studentas: 
          </Text>
          <Text className='text-left ml-10 text-pretty text-black dark:text-white'>
          studento.pastas@ktu.edu
          </Text>
          <Text className='text-left mt-10 ml-10 text-pretty text-black dark:text-white'>
          Studentas: 
          </Text>
          <Text className='text-left ml-10 mb-10 text-pretty text-black dark:text-white'>
          studento.pastas@ktu.edu
          </Text>
        </View>

        <View className=' bg-emerald-100 rounded-3xl m-5 ml-14'>
          <Text className='text-right mr-10 mt-10 text-3xl text-black dark:text-white'>
            Contacts
          </Text>
          <Text className='text-left mr-10 ml-10 mt-10 text-pretty text-black dark:text-white'>
            Have questions, feedback, or suggestions? We'd love to hear from you! You can reach us via email at komandospastas@ktu.lt.
          </Text>

          <Text className='text-left m-10 text-pretty text-black dark:text-white'>
            Thank you for choosing EATHY to accompany you on your journey to a healthier, happier life.
          </Text>

        </View>

      </ScrollView>
    </ImageBackground>
  );
}