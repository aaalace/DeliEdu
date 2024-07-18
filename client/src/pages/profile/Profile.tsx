import { MouseEvent, useEffect, useState } from "react";
import { logoutApi } from "../../api/authApi.ts";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { authLogout } from "../../store/slices/authSlice.ts";
import { useNavigate } from "react-router-dom";
import InviteList from "../../components/invite/inviteList/InviteList.tsx";
import User from "../../types/entities/user.ts";
import { getUserById } from "../../api/userApi.ts";
import CityBlock from "../../components/profile/CityBlock.tsx";
import Button from "../../components/general/button/Button.tsx";
import { useTypedSelector } from "../../store/store.ts";
import "./index.scss"

const Profile = () => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const mainUser = useTypedSelector(state => state.auth.user)

  if (!mainUser) {
    return null;
  }

  const leave = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const [state, _]: [boolean, string?] = await logoutApi();
    if (state) {
      dispatch(authLogout());
      navigate('/login');
    }
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const [state, data]: [boolean, (User | string)] = await getUserById(Number(id));
      if (state) {
        setCurrentUser(data as User);
      } else {
        navigate(`/profile/${mainUser.id}`)
      }
    };
    fetchCurrentUser().then();
  }, [id, mainUser.defaultCity])

  if (!currentUser) {
    return null;
  }

  return (
    <div className="profile-page">
      <h1>{id == mainUser.id.toString() ? 'мой аккаунт' : `${currentUser ? currentUser.name : ''}`}</h1>
      <CityBlock currentUser={currentUser}/>
      {id == mainUser.id.toString() && <Button text="Log out" onClick={leave}/>}
      <InviteList userId={Number(id)}/>
    </div>
  )
}

export default Profile