import Invite from "../../../types/entities/invite";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteInvitesApi } from "../../../api/invitesApi.ts";

interface InviteElementProps {
  invite: Invite;
  onDelete: (id: number) => void;
}

const InviteElement = ({invite, onDelete}: InviteElementProps) => {

  const mainUser = useSelector(state => state.auth.user)

  const deleteInvite = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete invite?`);
    if (!confirmed) return;
    await onDelete(invite.id);
  }

  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
      <Link to={`/profile/${invite.userId}`}>
        <p>user: {invite.userId}</p>
      </Link>
      <p>city: {invite.city}</p>
      <p>dt: {invite.dt}</p>
      <p>description: {invite.description}</p>
      <p>contacts: {invite.contacts}</p>
      {invite.userId == mainUser.id ?
        <button onClick={deleteInvite}>удалить</button>
        :
       null
      }
    </div>
  )
}

export default InviteElement;