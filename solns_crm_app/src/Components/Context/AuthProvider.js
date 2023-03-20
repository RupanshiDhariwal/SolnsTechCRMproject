import { createContext, useReducer, useEffect } from "react";

const AuthContext = createContext({});

export const authReducer = (auth, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return auth;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setAuth({ type: "LOGIN", payload: user });
    }
    console.log(auth);
  }, []);

  console.log("AuthContext auth: ", auth);

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
