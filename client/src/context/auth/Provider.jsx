import React, { useEffect, useReducer } from "react";
import { authContext } from "./Context.js";
import { authReducer } from "./Reducer.js";
import { useNoti } from "../../hooks/useNoti.js";
import authServices from "../../modules/auth/auth.services.js";
export const AuthProvider = ({ children }) => {
  const token = authServices.getToken();
  const noti = useNoti();

  const validateToken = async (token) => {
    if (token) {
      const { data, status } = await authServices.verifyToken(token);
      if (status != 200) {
        authServices.logout();
        return noti("Vuelva a iniciar sesion", "error");
      }
      dispatch({
        type: "LOGIN",
        payload: {
          token: data.token,
          isLogged: true,
          role: data.existingUser.role.name,
        },
      });
    }
  };
  useEffect(() => {
    validateToken(token);
  }, [token]);

  const initialState = {
    token: token ? token : "",
    isLogged: false,
    role: "",
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    validateToken(token);
  }, []);

  const login = async (credentials) => {
    const res = await authServices.login(credentials);

    if (res.status != 200) {
      return noti(res.response.data || "error", "error");
    }

    authServices.setToken(res.data.token);

    dispatch({
      type: "LOGIN",
      payload: {
        token: res.data.token,
        isLogged: true,
        role: res.data.role,
      },
    });

    noti("¡Bienvenido!", "success");

    return {
      role: res.data.role,
    };
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    authServices.logout();
    noti("Sesión cerrada", "success");
  };

  return (
    <authContext.Provider value={{ login, logout, authState }}>
      {children}
    </authContext.Provider>
  );
};
