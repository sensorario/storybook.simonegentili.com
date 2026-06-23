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
            ? <button onClick={handleLogout}
                style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}>logout</button>
            : <button onClick={handleLogin}
                style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}>Login</button>
    }</>
}

export default Authenticator;