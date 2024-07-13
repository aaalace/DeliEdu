import { useState } from "react";
import { login, logout, refreshToken } from "../../api/userApi.ts";

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const entry = async () => {
    await login({email, password})
  }

  const refresh = async () => {
    await refreshToken()
  }

  const leave = async () => {
    await logout()
  }

  return (
    <div>
      логин
      <div>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={entry}>ok</button>
        <button onClick={refresh}>refresh</button>
        <button onClick={leave}>logout</button>
      </div>
    </div>
  )
}

export default Login