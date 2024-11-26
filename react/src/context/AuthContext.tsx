import { createContext, useContext, useEffect, useState } from "react";
import APIClient from "../data/APIClient";

interface AuthContextProps {
    isAuthenticated: boolean;
    logout: () => void;
    setIsAuthenticated: (value: boolean) => void; 
}; 


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        checkAuthStatus();
    }, []); 


    const logout = async() => {
        setIsAuthenticated(false);
        localStorage.removeItem("jwt");
    }


    const checkAuthStatus = async() => {

        const token: string | null = localStorage.getItem("jwt");

        try {
            if (token) {
                const isValid = await validateToken(token);

                if (isValid) {
                    setIsAuthenticated(true);
                }
                else {
                    await refreshToken(token);
                }
            }
            else {
                setIsAuthenticated(false);
            }
        } 
        catch (error) {
            setIsAuthenticated(false);  
        }
        finally {
            setIsLoading(false);
        }
    }


    const validateToken = async(token: string) => {
        try {
            const response = await APIClient.post('/validate-token', { token }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                }
            });

            if (response.status === 200) {
                return true;
            }
            else if (response.status === 401) {
                return false;
            }

            return false;
        } 
        catch (error: any) {
            if (error.response) {
                if (error.response.status === 401) {
                    return false;
                }
            }
            return false;
        }
    }


    const refreshToken = async(token: string) => {
        try {
            const response = await APIClient.post('/refresh-token', { token }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                }
            });

            if (response.status === 200) {
                localStorage.setItem("jwt", response.data);
                setIsAuthenticated(true);
            }
            else {
                setIsAuthenticated(false);
            }
        } 
        catch (error: any) {
            console.log(error);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    const authContextValue: AuthContextProps = { isAuthenticated, logout, setIsAuthenticated }

    return (
        <AuthContext.Provider value={authContextValue}>
            { children }
        </AuthContext.Provider>
    );
};

export const  useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
        throw new Error("UseAuth must be used within an AuthProvider");
    }
    return context;
}
