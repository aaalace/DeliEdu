import { useDispatch } from "react-redux";
import User from "../../types/entities/user.ts";
import { useState } from "react";
import { changeCityApi } from "../../api/userApi.ts";
import { ChangeCityRequest } from "../../types/requests/changeCityRequest.ts";
import { authChangeCity } from "../../store/slices/authSlice.ts";
import ErrorBlock from "../general/errorBlock/ErrorBlock.tsx";
import CityAutocomplete from "../cityAutocomplete/CityAutocomplete.tsx";
import { useTypedSelector } from "../../store/store.ts";
import iconPen from '../../icons/iconPen.svg';
import iconCheck from '../../icons/iconCheck.svg';
import iconMinus from '../../icons/iconMinus.svg';
import "./index.scss"

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

  if (mainUser && mainUser.id != currentUser.id) {
    return null
  }

  return (
    <div>
      { cityOnChange ?
        <div className="edit-data-container">
          <CityAutocomplete setSelectedCity={setCity}/>
          <img src={iconCheck} className="icon" alt="Dash" onClick={changeCity} />
          <img src={iconMinus} className="icon" alt="Dash" onClick={cancelChangeCity} />
          {error.length > 0 ? <ErrorBlock message={error}/> : null}
        </div>
        :
        <div className="ok-data-container">
          <p>{mainUser ? mainUser.defaultCity : '-'}</p>
          <img src={iconPen} className="icon" alt="Dash" onClick={() => setCityOnChange(true)} />
        </div>
      }
    </div>
  )
}

export default CityBlock;