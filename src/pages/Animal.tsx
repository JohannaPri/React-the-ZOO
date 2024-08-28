import '../style/animal.scss';
import { useNavigate, useParams } from "react-router-dom";
import { IAnimal } from '../models/IAnimal';
import { AnimalDetails } from '../components/AnimalDetails';
import { useEffect, useState } from 'react';
import { calculateHoursSinceFed } from '../functions/dateTimeUtils';
import { Loader } from '../components/Loader';

// Component to display and manage animal details
export const Animal = () => {
  const [disabled, setDisabled] = useState(false);
  const [animals, setAnimals] = useState<IAnimal[]>(() => {
    const storedAnimals = sessionStorage.getItem('animals');
    return storedAnimals ? JSON.parse(storedAnimals) : [];
  });

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the current animal based on the route parameter
  const findAnimal = animals.find(animal => animal.id === Number(id));

  useEffect(() => {
    if (findAnimal) {
      const hoursSinceFed = calculateHoursSinceFed(new Date(findAnimal.lastFed));
      setDisabled(hoursSinceFed < 3);
    }
  }, [findAnimal]);

  // Handle navigation back to the animals list
  const handleBack = () => {
    navigate('/animals');
  };

  // Handle feeding the animal
  const clickToFeed = (animal: IAnimal) => {
    const updatedAnimals = animals.map(a => 
      a.id === animal.id ? { ...a, isFed: true, lastFed: new Date().toLocaleString('sv-SE') } : a
    );

    setAnimals(updatedAnimals);
    sessionStorage.setItem('animals', JSON.stringify(updatedAnimals));
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

