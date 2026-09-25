import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import TodoScreen from "./components/TodoScreen";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return loggedIn ? (
    <TodoScreen onLogout={() => setLoggedIn(false)} />
  ) : (
    <LoginScreen onLogin={() => setLoggedIn(true)} />
  );
}

export default App;