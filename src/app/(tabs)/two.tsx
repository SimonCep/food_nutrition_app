import { TouchableOpacity, Text, useColorScheme } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { View } from '@/components/Themed';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  const text = 'Tab Two';
  const colorScheme = useColorScheme();

  return (
    <View className='flex-1 items-center justify-center'>
      <Text className={colorScheme === 'dark' ? 'text-white text-2xl font-bold' : 'text-black text-2xl font-bold'}>{text}</Text>
      <Link href="/sign-in" asChild>
        <TouchableOpacity className='mt-4 px-6 py-2 bg-red-500 rounded-full'>
          <Text className='text-white font-bold'>Sign In</Text>
        </TouchableOpacity>
      </Link>
      <View className='my-8 h-px w-4/5 bg-gray-300' lightColor='#eee' darkColor='rgba(255, 255, 255, 0.1)' />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}