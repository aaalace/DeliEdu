import InviteElement from "../inviteElement/InviteElement.tsx";
import { useCallback, useEffect, useState } from "react";
import { deleteInvitesApi, getInvitesApi } from "../../../api/invitesApi.ts";
import Invite from "../../../types/entities/invite";
import SortBar from "../dataManagers/sortBar/SortBar.tsx";
import FilterBar from "../dataManagers/filterBar/FilterBar.tsx";
import { DateOrderEnum } from "../../../enums/dateOrderEnum.ts";

interface InviteListProps {
  userId?: number,
  dataChanged?: boolean,
  setDataChanged?: (b: boolean) => void
}

const InviteList = ({userId, dataChanged, setDataChanged}: InviteListProps) => {

  const [city, setCity] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [order, setOrder] = useState<DateOrderEnum>(DateOrderEnum.NewFirst);

  const [invites, setInvites] = useState<Invite[]>([]);

  const handleDelete = async (id: number) => {
    const [state, _]: [boolean, string?] = await deleteInvitesApi(id);
    if (state) {
      setInvites(prevInvites => prevInvites.filter(invite => invite.id !== id));
    }
  };

  const loadInvites = useCallback(async () => {
    const [state, data]: [boolean, (Invite[] | string)] = await getInvitesApi(userId, city, date, order);
    if (state) {
      setInvites(data as Invite[]);
    }
  }, [userId, city, date, order])

  useEffect(() => {
    loadInvites().then();
  }, [userId, city, date, order]);

  useEffect(() => {
    if (dataChanged) {
      loadInvites().then();
    }
    if (setDataChanged) {
      setDataChanged(false);
    }
  }, [dataChanged]);

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "70%", alignItems: "center"}}>
        <FilterBar selectedCity={city} date={date} setSelectedCity={setCity} setDate={setDate}/>
        <SortBar order={order} setOrder={setOrder}/>
      </div>
      <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "80%"}}>
        {invites.map((invite: Invite) => {
          return <InviteElement key={invite.id} invite={invite} onDelete={handleDelete}/>
        })}
      </div>
    </div>
)
}

export default InviteList;