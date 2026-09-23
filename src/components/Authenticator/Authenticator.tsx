import React from 'react';
import './Authenticator.css';

type AuthenticatorProps = {
    isLoggedIn: boolean;
    handleLogin: () => void;
    handleLogout: () => void;
};

export const Authenticator: React.FC<AuthenticatorProps> = ({
    isLoggedIn,
    handleLogin,
    handleLogout
}: AuthenticatorProps) => {
    return <>{
        isLoggedIn
            ? <button onClick={handleLogout} className="sg-authenticator-button">logout</button>
            : <button onClick={handleLogin} className="sg-authenticator-button">Login</button>
    }</>
}

export default Authenticator;