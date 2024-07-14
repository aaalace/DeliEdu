import InviteList from "../../components/general/inviteList/InviteList.tsx";
import { useState } from "react";

const Dashboard = () => {

  const [city, setCity] = useState<string>('');
  const [date, setDate] = useState<string>('');

  return (
    <div>
      <h1>дашборд</h1>
      <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />
      <InviteList city={city} date={date}/>
    </div>
  )
}

export default Dashboard