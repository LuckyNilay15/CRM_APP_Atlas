import React, { useContext } from "react"; // Add useContext here
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { user, handleLogout } = useContext(AuthContext);

  if (!user) {
    return <h1>Please log in.</h1>; // If no user is logged in, show a placeholder
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Login;
