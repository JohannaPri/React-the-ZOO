import { IAnimal } from "../models/IAnimal";
import { getAnimalAPI } from "../service/AnimalService";

export interface IAnimalsLoader {
  animalList: IAnimal[];
  error: string;
}

/**
 * Hämtar djurdata från API och hanterar eventuella fel.
 * 
 * @returns Ett objekt med djurdata och felmeddelande (om något fel uppstod).
*/

export const animalsLoader = async (): Promise<IAnimalsLoader> => {
  const data: IAnimalsLoader = { animalList: [], error: '' };

  try {
    const response = await getAnimalAPI();
    if (response) {
      data.animalList = response;
    } else {
      data.error = "No response from the API";
    }
  } catch (error) {
    console.error("An error occurred:", error);
    data.error = "Something went wrong. Please try again later.";
  }

  return data;
};
