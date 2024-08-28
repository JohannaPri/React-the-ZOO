import { IAnimal } from "../models/IAnimal";
import { fetchData } from "./ServiceBase";

const BASE_URL = 'https://animals.azurewebsites.net/api/animals';

export const getAnimals = async (): Promise<IAnimal[]> => {
    try {
        const animals = await fetchData<IAnimal[]>(BASE_URL);
        return animals;
    } catch (error) {
        console.error("Failed to fetch animals:", error);
        throw error; 
    }
};