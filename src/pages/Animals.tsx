import "../style/animal.scss";
import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { AnimalCard } from "../components/AnimalCard";
import { getAnimalAPI } from "../service/AnimalService";
import { Loader } from "../components/Loader";

// Komponent för att visa en lista med djur
export const Animals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>(() => {
    // Hämtar djurdata från sessionStorage eller använd en tom array
    const storedAnimals = sessionStorage.getItem("animals");
    return storedAnimals ? JSON.parse(storedAnimals) : [];
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        // Hämtar djurdata från API om ingen data finns i state
        if (animals.length === 0) {
          const response = await getAnimalAPI();
          if (response) {
            sessionStorage.setItem("animals", JSON.stringify(response));
            setAnimals(response);
          }
        }
      } catch (error) {
        console.error("Error fetching animals:", error);
      } finally {
        // Uppdaterar laddningsstatus när data har hämtats eller ett fel har inträffat
        setIsLoading(false);
      }
    };

    fetchAnimals();
  }, [animals.length]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Våra Djur</h1>
          <AnimalCard animals={animals} />
        </>
      )}
    </>
  );
};