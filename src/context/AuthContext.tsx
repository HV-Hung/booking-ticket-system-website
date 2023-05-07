import React, { createContext, useEffect, useState } from "react";
import { User } from "../interface/Interface";
import useGet from "../api/useGet";
import { openNotification } from "../components/Notifications";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  user: User | undefined;
  login: (userData: Record<string, string>) => Promise<void>;
  logout: () => void;
  refetch: () => void;
  isFetching: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  login: () => Promise.resolve(),
  logout: () => {},
  refetch: () => {},
  isFetching: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { data: user, refetch, isFetching } = useGet("user/info");

  const login = async (userData: Record<string, string>) => {
    await fetch(import.meta.env.VITE_BACKEND_URL + "auth/signin", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          openNotification("success", "Đăng nhập thành công");
          refetch();
          return navigate("/");
        } else {
          return openNotification(
            "error",
            "Tên tài khoản hoặc mật khẩu không đùng"
          );
        }
      })
      .catch((err) => {
        return openNotification("error", err.message);
      });
  };

  const logout = () => {
    // code to logout the user and clear user data from state
  };

  console.log({ user });
  return (
    <AuthContext.Provider value={{ user, login, logout, refetch, isFetching }}>
      {children}
    </AuthContext.Provider>
  );
};
