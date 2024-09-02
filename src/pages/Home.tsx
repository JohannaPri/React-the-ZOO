import { Link } from "react-router-dom";
import "../style/home.scss";
import logo from "/logo-small.png";
import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { calculateHoursSinceFed } from "../functions/dateTimeUtils";
import { getAnimalAPI } from "../service/AnimalService"; 
import { Loader } from "../components/Loader";

export const Home = () => {
  const [hungryAnimals, setHungryAnimals] = useState<IAnimal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
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

        const hungry = animals.filter(animal => {
          const hoursSinceFed = calculateHoursSinceFed(new Date(animal.lastFed));
          return hoursSinceFed >= 4; 
        });

        setHungryAnimals(hungry);
      } catch (error) {
        console.error("Error fetching animals:", error);
      } finally {
        setIsLoading(false); 
      }
    };

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