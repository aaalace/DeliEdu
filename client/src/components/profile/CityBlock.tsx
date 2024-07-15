import { useDispatch, useSelector } from "react-redux";
import User from "../../types/entities/user";
import { useState } from "react";
import { changeCityApi } from "../../api/userApi.ts";
import { ChangeCityRequest } from "../../types/requests/changeCityRequest.ts";
import { authChangeCity } from "../../store/slices/authSlice.ts";

interface CityBlockProps {
  currentUser: User
}

const CityBlock = ({ currentUser }: CityBlockProps) => {

  const [cityOnChange, setCityOnChange] = useState(false);
  const [newCity, setNewCity] = useState('');

  const dispatch = useDispatch();

  const changeCity = async () => {
    const data: ChangeCityRequest = {
      defaultCity: newCity
    }
    const user: User | null = await changeCityApi(data);
    if (user) {
      dispatch(authChangeCity(user))
    }
    setCityOnChange(false);
  }

  const cancelChangeCity = () => {
    setCityOnChange(false);
    setNewCity('');
  }

  return (
    <div>
      { cityOnChange ?
        <div>
          <input
            type="search"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
          />
          <button onClick={cancelChangeCity}>cancel</button>
          <button onClick={changeCity}>save</button>
        </div>
        :
        <div>
          Город:{currentUser.defaultCity}
          <button onClick={() => setCityOnChange(true)}>edit</button>
        </div>
      }
    </div>
  )
}

export default CityBlock;