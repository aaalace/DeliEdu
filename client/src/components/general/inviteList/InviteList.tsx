import InviteElement from "../inviteElement/InviteElement.tsx";
import { useCallback, useEffect, useState } from "react";
import { deleteInvitesApi, getInvitesApi } from "../../../api/invitesApi.ts";
import Invite from "../../../types/entities/invite";
import { DateOrderEnum } from "../../../lib/dateOrderEnum.ts";

interface InviteListProps {
  userId?: number,
  city?: string,
  date?: string,
  order?: DateOrderEnum
}

const InviteList = ({userId, city, date, order = DateOrderEnum.NewFirst}: InviteListProps) => {

  const [invites, setInvites] = useState<Invite[]>([]);

  const handleDelete = async (id: number) => {
    await deleteInvitesApi(id);
    setInvites(prevInvites => prevInvites.filter(invite => invite.id !== id));
  };

  const loadInvites = useCallback(async () => {
    const response: Invite[] | null = await getInvitesApi(userId, city, date);
    if (response) {
      setInvites(response);
    }
  }, [userId, city, date])

  useEffect(() => {
    loadInvites().then();
  }, [userId, city, date]);

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
      {invites.map((invite: Invite) => {
        return <InviteElement key={invite.id} invite={invite} onDelete={handleDelete}/>
      })}
    </div>
)
}

export default InviteList;