import { createContext, useContext, useState, ReactNode } from "react";
import { IAnimal } from "../models/IAnimal";

// Definierar typen för värdet som kommer att lagras i Context
interface IAnimalContextValue {
  animals: IAnimal[];
  setAnimals: React.Dispatch<React.SetStateAction<IAnimal[]>>;
}

// Skapar ett Context för djurdata
const AnimalContext = createContext<IAnimalContextValue | undefined>(undefined);

export const AnimalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  return (
    <AnimalContext.Provider value={{ animals, setAnimals }}>
      {children}
    </AnimalContext.Provider>
  );
};

// Custom Hook för att använda AnimalContext
export const useAnimalContext = () => {
  const context = useContext(AnimalContext);
  // Kontrollerar att Hooken används inom en AnimalProvider
  if (!context) {
    throw new Error("useAnimalContext must be used within an AnimalProvider");
  }
  return context;
};