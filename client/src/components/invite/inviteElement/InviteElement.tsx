import Invite from "../../../types/entities/invite";
import { Link } from "react-router-dom";
import Button from "../../general/button/Button";
import { useTypedSelector } from "../../../store/store";
import './index.scss';

interface InviteElementProps {
  invite: Invite;
  onDelete: (id: number) => void;
}

const InviteElement = ({invite, onDelete}: InviteElementProps) => {

  const mainUser = useTypedSelector(state => state.auth.user);

  const deleteInvite = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete invite?`);
    if (!confirmed) return;
    await onDelete(invite.id);
  }

  return (
    <div className="invite-card">
      <div className="invite-card__header">
        <Link to={`/profile/${invite.userId}`} className="invite-card__user">
          {invite.authorName}
        </Link>
        <div className="invite-card__date">
          {new Date(invite.dt).toLocaleString()}
        </div>
      </div>
      <div className="invite-card__body">
        <div className="invite-card__city">
          {invite.city}
        </div>
        <div className="invite-card__description">
          <span className="invite-card__label">Description:</span> {invite.description}
        </div>
        <div className="invite-card__contacts">
          <span className="invite-card__label">Contacts:</span> {invite.contacts}
        </div>
      </div>
      <div className="button-container">
        {mainUser && invite.userId === mainUser.id &&
            <Button text={"Delete"} onClick={deleteInvite} />
        }
      </div>
    </div>
  );
}

export default InviteElement;
