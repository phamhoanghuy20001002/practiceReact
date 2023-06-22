import React from "react";

const UserContext = React.createContext({ email: '', auth: '' });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ email: '', auth: '' });

    const loginContext = (email, token) => {
        localStorage.setItem('token', token)
        localStorage.setItem('email', email)

        setUser((user) => ({
            email: email,
            auth: '',
        }));
    };

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')

        setUser((user) => ({
            email: '',
            auth: '',
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};
export { UserContext, UserProvider }