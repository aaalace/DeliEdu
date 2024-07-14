import { MouseEvent } from "react";
import { logoutApi } from "../../api/authApi.ts";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authLogout } from "../../store/slices/authSlice.ts";
import { useNavigate } from "react-router-dom";
import InviteList from "../../components/general/inviteList/InviteList.tsx";

const Profile = () => {

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

  return (
    <div>
      <h1>{id == mainUser.id ? 'мой аккаунт' : `профиль пользователя ${Number(id)}`}</h1>
      {id == mainUser.id ?
        <button onClick={leave}>выйти</button>
        :
        null
      }
      <InviteList userId={Number(id)}/>
    </div>
  )
}

export default Profile