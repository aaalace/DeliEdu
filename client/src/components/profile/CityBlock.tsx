import { useDispatch } from "react-redux";
import User from "../../types/entities/user";
import { useState } from "react";
import { changeCityApi } from "../../api/userApi.ts";
import { ChangeCityRequest } from "../../types/requests/changeCityRequest.ts";
import { authChangeCity } from "../../store/slices/authSlice.ts";
import ErrorBlock from "../general/errorBlock/ErrorBlock.tsx";
import CityAutocomplete from "../cityAutocomplete/CityAutocomplete.tsx";
import Button from "../general/button/Button.tsx";
import { useTypedSelector } from "../../store/store.ts";

interface CityBlockProps {
  currentUser: User
}

const CityBlock = ({ currentUser }: CityBlockProps) => {

  const [cityOnChange, setCityOnChange] = useState(false);
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();
  const mainUser = useTypedSelector(state => state.auth.user);

  const changeCity = async () => {
    const reqData: ChangeCityRequest = { defaultCity: city }
    const [state, data]: [boolean, (User | string)] = await changeCityApi(reqData);
    if (state) {
      dispatch(authChangeCity((data as User).defaultCity));
      setError('');
    } else {
      setError(data as string);
    }
    setCityOnChange(false);
  }

  const cancelChangeCity = () => {
    setCityOnChange(false);
    setCity('');
    setError('');
  }

  const setCityOnChangeHandler = () => {
    setCityOnChange(true);
  }

  if (mainUser && mainUser.id != currentUser.id) {
    return <p>Город:{currentUser.defaultCity}</p>
  }

  return (
    <div>
      { cityOnChange ?
        <div>
          <CityAutocomplete setSelectedCity={setCity}/>
          <Button text="Cancel" onClick={cancelChangeCity}/>
          <Button text="Save" onClick={changeCity}/>
          {error.length > 0 ? <ErrorBlock message={error}/> : null}
        </div>
        :
        <div>
          <p>Город:{mainUser ? mainUser.defaultCity : '-'}</p>
          <Button text="Edit" onClick={setCityOnChangeHandler}/>
        </div>
      }
    </div>
  )
}

export default CityBlock;