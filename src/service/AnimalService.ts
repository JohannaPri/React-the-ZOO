import { IAnimal } from "../models/IAnimal";
import { get } from "./ServiceBase";

const BASE_URL = 'https://animals.azurewebsites.net/api/animals';

// Funktion för att hämta djurdata från API
export const getAnimalAPI = async (): Promise<IAnimal[] | undefined> => {
  try {
    const response = await get<IAnimal[]>(BASE_URL);
    return response;
  } catch (error) {
    // Hanterar eventuella fel som uppstår vid hämtning av data
    console.error('Failed to fetch animals:', error);
    return undefined;
  }
};