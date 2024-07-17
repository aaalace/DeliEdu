import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.scss';
import Input from "../general/input/Input.tsx";
import { useTypedSelector } from "../../store/store.ts";

interface City {
  geonameId: number;
  name: string;
  countryName: string;
}

interface AutoCompleteProps {
  setSelectedCity: (city: string) => void
}

const AutoComplete = ({ setSelectedCity }: AutoCompleteProps) => {
  const [query, setQuery] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const [defaultCitySet, setDefaultCitySet] = useState<boolean>(false);
  const [onType, setOnType] = useState<boolean>(false);

  const mainUser = useTypedSelector(state => state.auth.user);

  useEffect(() => {
    if (query.length < 3) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const response = await axios.get('http://api.geonames.org/searchJSON', {
          params: {
            q: query,
            maxRows: 10,
            username: import.meta.env.VITE_GEONAMES,
            featureClass: 'P',
            lang: 'ru'
          },
        });
        setCities(response.data.geonames || []);
      } finally {}
    };

    if (onType) fetchCities().then();
  }, [query]);

  useEffect(() => {
    if (query.length == 0) {
      setDefaultCitySet(false);
    }
  }, [query.length]);

  const handleChange = (value: string) => {
    if (!onType) setOnType(true)
    setQuery(value);
    if (value === '') {
      setSelectedCity('');
      setCities([]);
    }
  };

  const handleSelect = (city: City) => {
    setOnType(false)
    setSelectedCity(city.name);
    setCities([]);
    setQuery(city.name)
  };

  const setDefaultCity = () => {
    if (!mainUser) {
      return
    }
    const city: City = {
      geonameId: 0,
      name: mainUser.defaultCity,
      countryName: ""
    }
    handleSelect(city);
    setDefaultCitySet(true);
  }

  return (
    <div className="autocomplete">
      <div className="autocomplete-input-container">
        <Input label="City" type="text" value={query} setValue={handleChange}/>
        {mainUser && !defaultCitySet && mainUser.defaultCity != '-' && query.length == 0 &&
            <button className="default-button" onClick={setDefaultCity}>{mainUser.defaultCity}</button>
        }
      </div>
      {cities.length > 0 && (
        <ul className="autocomplete-results">
          {cities.map((city) => (
            <li key={city.geonameId} onClick={() => handleSelect(city)} className="autocomplete-item">
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
