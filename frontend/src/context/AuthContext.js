import React, { createContext, useState, useContext } from "react"; // Add useContext here
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext); // useContext is used here

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    if (user) return; // Prevent double execution

    try {
      const payload = JSON.parse(
        atob(credentialResponse.credential.split(".")[1])
      );
      setUser({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,


        
      });
      console.log(payload.name);
      // Navigate to the home page
      navigate("/home");
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogout }}>
      <GoogleOAuthProvider clientId="29241022765-rv4rkrj4anslmuvk5lr2kfndu2lhjbj6.apps.googleusercontent.com">
        {!user ? (
          <div className="auth-container">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.error("Login Failed")}
            />
          </div>
        ) : (
          children // Render app components if user is logged in
        )}
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  );
};

export default AuthContext;
