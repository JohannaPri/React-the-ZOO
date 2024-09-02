import { Link } from "react-router-dom";
import "../style/home.scss";
import logo from "/logo-small.png";
import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { calculateHoursSinceFed } from "../functions/dateTimeUtils";
import { getAnimalAPI } from "../service/AnimalService"; 
import { Loader } from "../components/Loader";

export const Home = () => {
  // State för att hålla en lista över hungriga djur
  const [hungryAnimals, setHungryAnimals] = useState<IAnimal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect körs vid första renderingen för att hämta djurdata
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        // Försöker hämta djurdata från sessionStorage om den finns
        const storedAnimals = sessionStorage.getItem("animals");
        let animals: IAnimal[] = [];

        if (storedAnimals) {
          animals = JSON.parse(storedAnimals);
        } else {
          const response = await getAnimalAPI(); 
          if (response) {
            sessionStorage.setItem("animals", JSON.stringify(response));
            animals = response;
          }
        }

        // Filtrerar ut djur som har blivit matade för 4 eller fler timmar sedan
        const hungry = animals.filter(animal => {
          const hoursSinceFed = calculateHoursSinceFed(new Date(animal.lastFed));
          return hoursSinceFed >= 4; 
        });

        // Uppdaterar state med de hungriga djuren
        setHungryAnimals(hungry);
      } catch (error) {
        console.error("Error fetching animals:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    // Startar funktionen för att hämta djurdata vid komponentens första render
    fetchAnimals();
  }, []);

  return (
    <>
      {isLoading ? ( 
        <Loader />
      ) : (
        <div className="hero-img">
          <div className="hero-info">
            <div className="logo-container">
              <img src={logo} alt="the zoo logo" width={375} />
            </div>
            <Link to="/animals">
              <button>Våra Djur</button>
            </Link>
            <div className="hungry-animals">
              <h2>Hungriga djur!</h2>
              {hungryAnimals.length > 0 ? (
                <ul>
                  {hungryAnimals.map((animal) => (
                    <li key={animal.id}>{animal.name}</li>
                  ))}
                </ul>
              ) : (
                <p>Just nu är inga djur hungriga.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};