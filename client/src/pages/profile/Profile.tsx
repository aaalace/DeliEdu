import { MouseEvent, useEffect, useState } from "react";
import { logoutApi } from "../../api/authApi.ts";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authLogout } from "../../store/slices/authSlice.ts";
import { useNavigate } from "react-router-dom";
import InviteList from "../../components/invite/inviteList/InviteList.tsx";
import User from "../../types/entities/user";
import { getUserById } from "../../api/userApi.ts";
import CityBlock from "../../components/profile/CityBlock.tsx";

const Profile = () => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const mainUser = useSelector(state => state.auth.user)

  const leave = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const success: boolean = await logoutApi();
    if (success) {
      dispatch(authLogout());
      navigate('/login');
    } else {
      alert("error, try to reload page");
    }
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const data: User | null = await getUserById(Number(id));
      if (data) {
        setCurrentUser(data);
      }
    };
    fetchCurrentUser().then();
  }, [id, mainUser.defaultCity])

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <h1>{id == mainUser.id ? 'мой аккаунт' : `${currentUser ? currentUser.name : ''}`}</h1>
      {id == mainUser.id ?
        <>
        <CityBlock currentUser={currentUser}/>
        <button onClick={leave}>выйти</button>
        </>
        :
        null
      }
      <InviteList userId={Number(id)}/>
    </div>
  )
}

export default Profile