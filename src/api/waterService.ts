import * as Yup from "yup"; // Traukiam Yup, nes be taisyklių - niekur

import { supabase } from "@/lib/supabase"; // Supabase pas mus kaip baikerių klubas, visiems savo
import { Tables } from "@/types"; // Čia mūsų stalų suktinis, kad žinom kas kur yra
import { addWaterConsumptionValidationSchema } from "@/utils/validationSchemas"; // Patikros schema, kad neišgertumėm per daug

// Funkcija vandens įpylimui, nes dehidracija - tai ne mūsų tema
export const addWaterConsumption = async (
  amount: number, // kiek supylėm
  unit: string, // ar buteliais, ar bokalais
  userId: string, // kas tas herojus
  selectedDate: string, // kada šventė vyko
) => {
  try {
    // Pirmiausia tikrinam, ar nesumelavom su kiekiais
    await addWaterConsumptionValidationSchema.validate({ amount, unit });

    // Bambalam - įrašom duomenis į lentelę
    const { error } = await supabase.from("water_consumption").insert({
      amount,
      unit,
      user_id: userId,
      consumed_at: selectedDate,
    });

    // Jei kažkas negerai, tai verkiame kartu su konsole
    if (error) {
      console.error("Klaida pildant vandenį:", error);
      return null;
    }

    // Viskas čiki-piki, grąžinam true
    return true;
  } catch (error) {
    // Tikriname kas būtent susišikė
    if (error instanceof Yup.ValidationError) {
      console.error("Klaida validuojant:", error);
    } else {
      console.error("Klaida pildant vandenį:", error);
    }
    return null;
  }
};

// Čia gauname info apie vandens vartojimą, reik šnibždėti
export const fetchWaterConsumption = async (userId: string) => {
  try {
    // Ieškom, kas, kiek ir kada prigėrė
    const { data, error } = await supabase
      .from("water_consumption")
      .select("*")
      .eq("user_id", userId)
      .order("consumed_at", { ascending: false });

    // Jei čia klaida, tai vėl verkiam
    if (error) {
      console.error("Nepavyko gauti duomenų:", error);
      return [];
    }

    // Visą gautą loot'ą grąžinam atgal
    return data as Tables<"water_consumption">[];
  } catch (error) {
    console.error("Klaida gaudant vandens data:", error);
    return [];
  }
};

// Ištrynimo magic-trickas, rekordas dingsta
export const deleteWaterConsumption = async (recordId: number) => {
  try {
    // Pradanginam rekordą pagal jo ID
    const { error } = await supabase
      .from("water_consumption")
      .delete()
      .eq("id", recordId);

    // Vėl verkiam, jei nesigavo
    if (error) {
      console.error("Nepavyko ištrinti:", error);
      return false;
    }

    // Ištrinta, kaip byla KGB archyvuose - be pėdsakų
    return true;
  } catch (error) {
    console.error("Klaida trinant vandenį:", error);
    return false;
  }
};

// Atnaujinimo reikalai, kaip "Pimp My Ride" bet vandeniu
export const updateWaterConsumption = async (
  recordId: number, // rekordo ID
  amount: number, // naujas kiekis
  unit: string, // naujas vienetas
  selectedDate: string, // nauja data
) => {
  try {
    // Dar kartą tikrinam ar čia ne bybys kiaušai
    await addWaterConsumptionValidationSchema.validate({ amount, unit });

    // Update'inam kaip reikiant
    const { error } = await supabase
      .from("water_consumption")
      .update({
        amount,
        unit,
        consumed_at: selectedDate,
      })
      .eq("id", recordId);

    // Klaida - šitas gyvenimas, ką darysi, kartais nepadeda
    if (error) {
      console.error("Atnaujint nepavyko:", error);
      return false;
    }

    // Atnaujinta, kaip prabangus remontas - viskas blizga
    return true;
  } catch (error) {
    // Tikrinam kas čia dabar ne taip
    if (error instanceof Yup.ValidationError) {
      console.error("Klaida validuojant:", error);
    } else {
      console.error("Atnaujint nepavyko:", error);
    }
    return false;
  }
};
