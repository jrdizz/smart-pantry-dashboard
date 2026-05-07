import React, { useState } from 'react';

interface LoginFormProps {
    onLoginSuccess: (username:string, token: string) =>void;
}
const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSecureRequest = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('Sending requests');

        const token = window.btoa(`${username}:${password}`);

        try {
            const response = await fetch('http://localhost:8080/api/items', {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setMessage('Success! Authenticated request went through.');
                onLoginSuccess(username, token)
            } else if (response.status === 401) {
                setMessage('Error: 401 Unauthorized. Invalid username or password.');
            } else {
                setMessage(`Error: HTTP ${response.status}`);
            }
        } catch (error) {
            setMessage('Network Error: Could not connect to the server');
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: '40px auto', fontFamily: 'sans-serif'}}>
            <h2>Login</h2>

            <form onSubmit={handleSecureRequest} style={{ display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px'}}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete={username}
                        style={{ width: '100px', padding: '8px' }}/>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px'}}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete={"current-password"}
                        style={{ width: '100px', padding: '8px'}}
                        />
                </div>

                <button
                    type="submit"
                    style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor:'pointer'}}
                    >
                    Test request
                </button>
            </form>

            {message && (
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
                    <strong>Status:</strong> {message}
                </div>
            )}
        </div>
    );
};

export default LoginForm;