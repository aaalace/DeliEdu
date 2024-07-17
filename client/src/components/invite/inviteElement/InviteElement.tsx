import Invite from "../../../types/entities/invite";
import { Link } from "react-router-dom";
import Button from "../../general/button/Button.tsx";
import { useTypedSelector } from "../../../store/store.ts";

interface InviteElementProps {
  invite: Invite;
  onDelete: (id: number) => void;
}

const InviteElement = ({invite, onDelete}: InviteElementProps) => {

  const mainUser = useTypedSelector(state => state.auth.user)

  const deleteInvite = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete invite?`);
    if (!confirmed) return;
    await onDelete(invite.id);
  }

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
      <Link to={`/profile/${invite.userId}`}>
        <p>user: {invite.authorName}</p>
      </Link>
      <p>city: {invite.city}</p>
      <p>dt: {invite.dt}</p>
      <p>description: {invite.description}</p>
      <p>contacts: {invite.contacts}</p>
      {mainUser && invite.userId == mainUser.id && <Button text={"Delete"} onClick={deleteInvite}/>}
    </div>
  )
}

export default InviteElement;