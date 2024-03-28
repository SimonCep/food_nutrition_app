import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Modal } from "react-native";

const EditGoals: React.FC = () => {
    const [totalCalories, setTotalCalories] = useState<string>("");
    const [weightLossChecked, setWeightLossChecked] = useState<boolean>(false);
    const [veganChecked, setVeganChecked] = useState<boolean>(false);
    const [vegetarianChecked, setVegetarianChecked] = useState<boolean>(false);
    const [diseaseSpecificChecked, setDiseaseSpecificChecked] = useState<boolean>(false);

    const handleSaveGoals = () => {
        console.log("Goals saved!");
    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: "#f3f4f6" }}>
            <TextInput
                style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", padding: 10, marginBottom: 20, fontSize: 18, color: "#000" }}
                placeholder="Total Calories"
                placeholderTextColor="#6B7280"
                value={totalCalories}
                onChangeText={setTotalCalories}
                keyboardType="numeric"
            />
            <View style={{ flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
                <TouchableOpacity onPress={() => setWeightLossChecked(!weightLossChecked)}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, marginRight: 10, justifyContent: "center", alignItems: "center", borderColor: "#ccc", backgroundColor: weightLossChecked ? "#3182CE" : "#fff" }}>
                            {weightLossChecked && <Text style={{ color: "#fff" }}>✓</Text>}
                        </View>
                        <Text>Weight Loss</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVeganChecked(!veganChecked)}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, marginRight: 10, justifyContent: "center", alignItems: "center", borderColor: "#ccc", backgroundColor: veganChecked ? "#3182CE" : "#fff" }}>
                            {veganChecked && <Text style={{ color: "#fff" }}>✓</Text>}
                        </View>
                        <Text>Vegan</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVegetarianChecked(!vegetarianChecked)}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, marginRight: 10, justifyContent: "center", alignItems: "center", borderColor: "#ccc", backgroundColor: vegetarianChecked ? "#3182CE" : "#fff" }}>
                            { vegetarianChecked&& <Text style={{ color: "#fff" }}>✓</Text>}
                        </View>
                        <Text>Vegetarian</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDiseaseSpecificChecked(!diseaseSpecificChecked)}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, marginRight: 10, justifyContent: "center", alignItems: "center", borderColor: "#ccc", backgroundColor: diseaseSpecificChecked ? "#3182CE" : "#fff" }}>
                            {diseaseSpecificChecked && <Text style={{ color: "#fff" }}>✓</Text>}
                        </View>
                        <Text>Disease specific</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Button title="Save" onPress={handleSaveGoals} />
        </View>
    );
};

export default EditGoals;
