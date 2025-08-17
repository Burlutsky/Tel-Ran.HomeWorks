import React, { createContext, useContext, useMemo, useState } from "react";
import api from "../api/axios";
import type {AuthContextType} from "../types/types.ts";


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    const login = async (username: string, password: string) => {

        const { data } = await api.post<{ token: string }>("/auth/login", {
            username,
            password,
        });
        setToken(data.token);
        localStorage.setItem("token", data.token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    const value = useMemo(() => ({ token, login, logout }), [token]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
