import { app } from "./lib/axios.ts";
import { useState } from "react";

function App() {
  const [user, setUser] = useState('')

  const test = async (id: number) => {
    const user = await app.get(`/users/${id}`);
    setUser(user.data.name);
  }

  return (
    <>
      <button onClick={() => test(1)}>1</button>
      <button onClick={() => test(2)}>2</button>
      <button onClick={() => test(3)}>3</button>
      <button onClick={() => test(4)}>4</button>
      {user}
    </>
  )
}

export default App
