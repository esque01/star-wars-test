import { createContext, useContext, useEffect, useState } from "react";

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

    const checkAuthStatus = () => {
        const token: string | null = localStorage.getItem("jwt");

        if (token) {
            setIsAuthenticated(true);
        }
        else {
            setIsAuthenticated(false);
        }
        setIsLoading(false);
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
