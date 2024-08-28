import { createContext, useContext, useState, ReactNode } from 'react';
import { IAnimal } from '../models/IAnimal';

// Definiera typen för Context-värdet
interface IAnimalContextValue {
  animals: IAnimal[];
  setAnimals: React.Dispatch<React.SetStateAction<IAnimal[]>>;
}

// Skapa Context
const AnimalContext = createContext<IAnimalContextValue | undefined>(undefined);

// Context Provider-komponent
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
  if (!context) {
    throw new Error('useAnimalContext must be used within an AnimalProvider');
  }
  return context;
};