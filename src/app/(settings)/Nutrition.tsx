import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView, FlatList, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import { useColorScheme } from "nativewind";
import { darkColorsDashboard, lightColorsDashboard } from "@/constants/Colors";
import { useTranslation } from 'react-i18next';

type Nutrient = {
  label: string;
  quantity: number;
  unit: string;
};

type Nutrients = {
  ENERC_KCAL?: Nutrient;
  CHOCDF?: Nutrient;
  FAT?: Nutrient;
  PROCNT?: Nutrient;
  SUGAR?: Nutrient;
  FASAT?: Nutrient;
  FATRN?: Nutrient;
  MG?: Nutrient;
  NA?: Nutrient;
  VITA_RAE?: Nutrient;
  VITB12?: Nutrient;
  ZN?: Nutrient;
  FE?: Nutrient;
  [key: string]: Nutrient | undefined;
};

type Food = {
  foodId: string;
  label: string;
  nutrients: Nutrients;
  foodContentsLabel?: string;
};

type FoodHint = {
  food: Food;
};

type FoodData = {
  text: string;
  hints: FoodHint[];
};

const CheckFood = () => {
  const [food, setFood] = useState('');
  const [feedback, setFeedback] = useState('');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [userHealthProblem, setUserHealthProblem] = useState('noneSelected');

  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const colors =
    colorScheme === "dark" ? darkColorsDashboard : lightColorsDashboard;


  const healthProblems = [
    { label: 'None Selected', value: 'noneSelected' },
    { label: 'Heart Disease', value: 'heartDisease' },
    { label: 'Thyroid Gland Disorders', value: 'thyroidGlandDisorders' },
    { label: 'Lactose Intolerance', value: 'lactoseIntolerance' },
    { label: 'Celiac Disease', value: 'celiacDisease' },
    { label: 'Hypertension', value: 'hypertension' },
    { label: 'Diabetes', value: 'diabetes' },
    { label: 'Kidney Disease', value: 'kidneyDisease' },
  ];

  useEffect(() => {
    if (food.length > 0) {
      fetchSuggestions(food);
    } else {
      setSuggestions([]);
    }
  }, [food]);

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get('https://api.edamam.com/auto-complete', {
        params: {
          q: query,
          app_id: '52252ff4',
          app_key: '9244bf41bbb1fae2c54ef5c5fc75ad38',
        }
      });

      const data = response.data;
      if (data && data.length > 0) {
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkFood = async () => {
    try {
      const response = await axios.get('https://api.edamam.com/api/food-database/v2/parser', {
        params: {
            app_id: '52252ff4',
            app_key: '9244bf41bbb1fae2c54ef5c5fc75ad38',
          ingr: food,
        }
      });

      const foodData: FoodData = response.data;
      if (foodData.hints.length > 0) {
        const selected = foodData.hints[0].food;
        setSelectedFood(selected);
        fetchNutrientData(selected.foodId);
      } else {
        setFeedback('No data found for this food.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNutrientData = async (foodId: string) => {
    try {
      const response = await axios.post(
        'https://api.edamam.com/api/food-database/v2/nutrients',
        {
          ingredients: [
            {
              quantity: 1,
              measureURI: `http://www.edamam.com/ontologies/edamam.owl#Measure_unit`,
              foodId: foodId,
            },
          ],
        },
        {
          params: {
            app_id: '52252ff4',
            app_key: '9244bf41bbb1fae2c54ef5c5fc75ad38',
          },
        }
      );

      const nutrientData = response.data;
      updateSelectedFoodNutrients(nutrientData);
    } catch (error) {
      console.error(error);
    }
  };

  const updateSelectedFoodNutrients = (nutrientData: any) => {
    if (selectedFood) {
      const updatedFood = {
        ...selectedFood,
        nutrients: nutrientData.totalNutrients,
      };
      setSelectedFood(updatedFood);
    }
  };

  const selectSuggestion = (item: string) => {
    setFood(item);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    return (
      <FlatList
        data={suggestions}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectSuggestion(item)}>
            <Text style={styles.suggestionItem}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const healthProblemThresholds: { [key: string]: { [nutrient: string]: { harmfulHigh: number, beneficialHigh: number } } } = {
    noneSelected: {},
    heartDisease: {
      NA: { harmfulHigh: 1500, beneficialHigh: 1000 },
      FAT: { harmfulHigh: 30, beneficialHigh: 20 },
      FASAT: { harmfulHigh: 15, beneficialHigh: 10 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
    thyroidGlandDisorders: {
      IODINE: { harmfulHigh: 600, beneficialHigh: 400 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
    lactoseIntolerance: {
      CHOCDF: { harmfulHigh: 30, beneficialHigh: 20 },
      SUGAR: { harmfulHigh: 10, beneficialHigh: 5 },
      NA: { harmfulHigh: 1500, beneficialHigh: 1000 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
    celiacDisease: {
      CHOCDF: { harmfulHigh: 30, beneficialHigh: 20 },
      SUGAR: { harmfulHigh: 10, beneficialHigh: 5 },
      NA: { harmfulHigh: 1500, beneficialHigh: 1000 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
    hypertension: {
      NA: { harmfulHigh: 2300, beneficialHigh: 1500 },
      FAT: { harmfulHigh: 30, beneficialHigh: 20 },
      FASAT: { harmfulHigh: 15, beneficialHigh: 10 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
    diabetes: {
      ENERC_KCAL: { harmfulHigh: 700, beneficialHigh: 500 },
      CHOCDF: { harmfulHigh: 70, beneficialHigh: 50 },
      SUGAR: { harmfulHigh: 50, beneficialHigh: 30 },
      FAT: { harmfulHigh: 30, beneficialHigh: 20 },
      FASAT: { harmfulHigh: 15, beneficialHigh: 10 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
    kidneyDisease: {
      NA: { harmfulHigh: 2300, beneficialHigh: 1500 },
      MG: { harmfulHigh: 400, beneficialHigh: 200 },
      K: { harmfulHigh: 3000, beneficialHigh: 2000 },
      P: { harmfulHigh: 1000, beneficialHigh: 800 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
  };

  const getNutrientStyle = (nutrientKey: string, nutrientValue: number | undefined, healthProblem: string) => {
    const thresholds = healthProblemThresholds[healthProblem];
    if (!thresholds) {
      return styles.nutrient; // If no thresholds are found for the given health problem, return the default style
    }

    const threshold = thresholds[nutrientKey];
    if (nutrientValue !== undefined && threshold !== undefined) {
      if (nutrientValue <= threshold.beneficialHigh) {
        return styles.nutrientBeneficial;
      } else if (nutrientValue <= threshold.harmfulHigh) {
        return styles.nutrientHarmful;
      } else {
        return styles.nutrientVeryHarmful;
      }
    }
    return styles.nutrient;
  };

  return (
    <View className={`flex-1 p-10 container ${colors.background}`}>
      <Text className={`${colors.buttonText} text-2xl mb-5 text-center`}>Check food nutrition</Text>
      <View className='flex'>
        <TextInput
          style={styles.input}
          placeholder="Enter the name of the food"
          value={food}
          onChangeText={setFood}
        />
        {suggestions.length > 0 && renderSuggestions()}
      </View>
      <TouchableOpacity
        onPress={checkFood}
        className={`${colors.buttonBackground} rounded-full border-2 ${colors.buttonBorder} mb-5 mt-4 px-4 py-2`}
      >
        <Text className={`${colors.buttonText} text-center font-bold`}>
          Check nutrition
        </Text>
      </TouchableOpacity>
     
      <TouchableOpacity 
        className={`${colors.buttonBackground} rounded-full border-2 ${colors.buttonBorder} mb-2 mt-4 px-4 py-2`}
        onPress={() => setIsModalVisible(true)}>
        <Text className={`${colors.buttonText} text-center font-bold`}>Select Health Issue</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            {healthProblems.map((problem) => (
              <TouchableOpacity
                key={problem.value}
                style={styles.modalItem}
                onPress={() => {
                  setUserHealthProblem(problem.value);
                  setIsModalVisible(false);
                }}
              >
                <Text>{problem.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
      {selectedFood && (
        <View style={styles.foodDetails}>
          <Text style={styles.subheader}>Nutrients:</Text>
          <Text style={getNutrientStyle('ENERC_KCAL', selectedFood.nutrients.ENERC_KCAL?.quantity, userHealthProblem)}>
            Calories: {selectedFood.nutrients.ENERC_KCAL?.quantity || '-'} kcal
          </Text>
          <Text style={getNutrientStyle('CHOCDF', selectedFood.nutrients.CHOCDF?.quantity, userHealthProblem)}>
            Carbs: {selectedFood.nutrients.CHOCDF?.quantity || '-'} g
          </Text>
          <Text style={getNutrientStyle('FAT', selectedFood.nutrients.FAT?.quantity, userHealthProblem)}>
            Fat: {selectedFood.nutrients.FAT?.quantity || '-'} g
          </Text>
          <Text style={getNutrientStyle('FASAT', selectedFood.nutrients.FASAT?.quantity, userHealthProblem)}>
            Saturated Fat: {selectedFood.nutrients.FASAT?.quantity || '-'} g
           </Text>
          <Text style={getNutrientStyle('FATRN', selectedFood.nutrients.FATRN?.quantity, userHealthProblem)}>
            Trans Fat: {selectedFood.nutrients.FATRN?.quantity || '-'} g
          </Text>
          <Text style={getNutrientStyle('PROCNT', selectedFood.nutrients.PROCNT?.quantity, userHealthProblem)}>
            Protein: {selectedFood.nutrients.PROCNT?.quantity || '-'} g
          </Text>
          <Text style={getNutrientStyle('SUGAR', selectedFood.nutrients.SUGAR?.quantity, userHealthProblem)}>
            Sugar: {selectedFood.nutrients.SUGAR?.quantity || '-'} g
          </Text>
          <Text style={getNutrientStyle('MG', selectedFood.nutrients.MG?.quantity, userHealthProblem)}>
            Magnesium: {selectedFood.nutrients.MG?.quantity || '-'} mg
          </Text>
          <Text style={getNutrientStyle('NA', selectedFood.nutrients.NA?.quantity, userHealthProblem)}>
            Sodium: {selectedFood.nutrients.NA?.quantity || '-'} mg
          </Text>
          <Text style={getNutrientStyle('VITA_RAE', selectedFood.nutrients.VITA_RAE?.quantity, userHealthProblem)}>
            Vitamin A: {selectedFood.nutrients.VITA_RAE?.quantity || '-'} μg
          </Text>
          <Text style={getNutrientStyle('VITB12', selectedFood.nutrients.VITB12?.quantity, userHealthProblem)}>
            Vitamin B12: {selectedFood.nutrients.VITB12?.quantity || '-'} μg
          </Text>
          <Text style={getNutrientStyle('ZN', selectedFood.nutrients.ZN?.quantity, userHealthProblem)}>
            Zinc: {selectedFood.nutrients.ZN?.quantity || '-'} mg
          </Text>
          <Text style={getNutrientStyle('FE', selectedFood.nutrients.FE?.quantity, userHealthProblem)}>
            Iron: {selectedFood.nutrients.FE?.quantity || '-'} mg
          </Text>
        </View>
      )}

      <View className='border p-5 border-gray-400'>
        <Text className={`${colors.buttonText} text-center `}>You can also check food nutritrion by specific disease needs</Text>
        <Text className={`text-green-500 text-center text-`}>Nutrients that could be dangerous in high amounts</Text>
        <Text className={`text-[orange] text-center text-`}>High amount of potentially dangerous nutrient</Text>
        <Text className={`text-red-500 text-center text-`}>Exceeded amount of potentially dangerous nutrients</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
    nutrient: {
        color: 'black',
    },
    nutrientExceeded: {
        color: 'red',
    },
    container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  autocompleteContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  suggestionItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  foodDetails: {
    marginBottom: 0,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  subheader: {
    fontSize: 20,
    marginTop: 0,
  },
  ingredient: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
  feedback: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  nutrientVeryGood: {
    color: 'green',
  },
  nutrientAvoid: {
    color: 'orange',
  },
  nutrientVeryBad: {
    color: 'red',
  },
  dropdownButton: {
    height: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropdownText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nutrientBeneficial: {
    color: 'green',
  },
  nutrientHarmful: {
    color: 'orange',
  },
  nutrientVeryHarmful: {
    color: 'red',
  },
});

export default CheckFood;