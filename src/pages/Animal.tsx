import "../style/animal.scss";
import { useNavigate, useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { AnimalDetails } from "../components/AnimalDetails";
import { useEffect, useState } from "react";
import { calculateHoursSinceFed } from "../functions/dateTimeUtils";
import { Loader } from "../components/Loader";

// Komponent för att visa och hantera djurdetaljer
export const Animal = () => {
  const [disabled, setDisabled] = useState(false);
  const [animals, setAnimals] = useState<IAnimal[]>(() => {
    // Hämtar djurdata från sessionStorage eller använd en tom array om inga djur är sparade
    const storedAnimals = sessionStorage.getItem("animals");
    return storedAnimals ? JSON.parse(storedAnimals) : [];
  });

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Hittar det aktuella djuret baserat på route-parametern
  const findAnimal = animals.find(animal => animal.id === Number(id));

  useEffect(() => {
    if (findAnimal) {
      // Beräknar antal timmar sedan djuret senast blev matad
      const hoursSinceFed = calculateHoursSinceFed(new Date(findAnimal.lastFed));
      // Aktiverar eller avaktiverar knappen baserat på om djuret behöver mat
      setDisabled(hoursSinceFed < 3);
    }
  }, [findAnimal]);

  // Hanterar navigering tillbaka till djurlistan
  const handleBack = () => {
    navigate("/animals");
  };

  // Hanterar matning av det aktuella djuret
  const clickToFeed = (animal: IAnimal) => {
    const updatedAnimals = animals.map(a => 
      a.id === animal.id ? { ...a, isFed: true, lastFed: new Date().toLocaleString("sv-SE") } : a
    );

    // Uppdaterar djurdata i state och sessionStorage
    setAnimals(updatedAnimals);
    sessionStorage.setItem("animals", JSON.stringify(updatedAnimals));
    setDisabled(true);
  };

  return (
    <>
      {findAnimal ? (
        <AnimalDetails
          animal={findAnimal}
          handleBack={handleBack}
          clickToFeed={clickToFeed}
          disabled={disabled}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};