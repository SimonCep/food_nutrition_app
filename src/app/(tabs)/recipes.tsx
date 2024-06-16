import { fetchRecipes } from '../../api/recipeService';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, TextInput } from 'react-native';
import { useColorScheme } from 'nativewind';
import { fetchPersonalData } from '@/api/personalDataService';
import { useAuth } from '@/providers/AuthProvider';
import { darkColorsDiary, lightColorsDiary } from '@/constants/Colors';
import { usePersonalDataContext } from '@/providers/PersonalDataProvider';

interface Recipe {
  label: string;
  image: string;
  url: string;
  dietLabels: string[];
  healthLabels: string[];
}

const RecipeList: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;

  const { session } = useAuth();

  const { shouldRefreshPersonalData } = usePersonalDataContext();
  
  const [query, setQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userHealthConditions, setUserHealthConditions] = useState<string[]>([]);
  const [searchInitiated, setSearchInitiated] = useState<boolean>(false);

  const getUserHealthConditions = async () => {
    if (session?.user?.id) {
      try {
        const personalData = await fetchPersonalData(session.user.id);
        if (personalData && personalData.health_issues) {
          setUserHealthConditions(personalData.health_issues);
        }
      } catch (error) {
        console.error('Error fetching user health conditions:', error);
      }
    }
  };

  const getRecipes = async () => {
    try {
      setSearchInitiated(true);
      const data = await fetchRecipes(query, userHealthConditions);
      setRecipes(data);
    } catch (error) {
      setError('Failed to fetch recipes');
    }
  };

  useEffect(() => {
    getUserHealthConditions();
  }, [shouldRefreshPersonalData]);

  return (
    <ScrollView className="flex-1 p-4 bg-white dark:bg-black">
      <Text className="text-2xl font-bold mb-4 text-center">Find your desired recipes!</Text>
      <View className="flex-row items-center mb-4">
        <TextInput
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg p-2 mr-2"
          placeholder="Search for recipes"
          placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'darkgray'}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity
          onPress={getRecipes}
          className={`${colors.buttonBorder} rounded-full px-6 py-3 ${colors.buttonBackground}`}
        >
          <Text className={`text-center text-lg font-bold ${colors.buttonText}`}>
            Search
          </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <Text className="text-red-500 text-lg mb-4 text-center">{error}</Text>
      )}
      {searchInitiated && recipes.length === 0 && !error && (
        <Text className="text-gray-500 text-lg mb-4 text-center">No recipes found. Please try another search.</Text>
      )}
      {searchInitiated && recipes.map((recipe, index) => (
        <View key={index} className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <TouchableOpacity onPress={() => Linking.openURL(recipe.url)} className="flex-1">
            <Image
              source={{ uri: recipe.image }}
              className="w-full h-48 rounded-lg mb-4 border border-gray-300 dark:border-gray-600"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2}}
            />
            <Text className="text-xl font-bold text-center mb-2">{recipe.label}</Text>
            <View className="mb-2 text-center">
              <Text className="mb-2 font-bold text-center">Categories:</Text>
              <Text className="text-center">{recipe.dietLabels.join(', ')}</Text>
            </View>
            <View className="mb-2 text-center">
              <Text className="mb-2 font-bold text-center">Additional info:</Text>
              <Text className="text-center">{recipe.healthLabels.join(', ')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default RecipeList;
