import { useState } from 'react';
import LoginForm from './components/LoginForm.tsx';
import InventoryDashboard from './components/InventoryDashboard.tsx';
import AddItemForm from "./components/AddItemAdmin.tsx";

function App() {
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = () => setRefreshKey(prev => prev +1);

    const handleLoginSuccess = (username: string, token: string) => {
        setCurrentUser(username);
        setAuthToken(token);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>Smart Pantry App</h1>

            {currentUser ? (
                <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#d4edda', borderRadius: '5px' }}>
                    Logged in as: <strong>{currentUser}</strong>
                </div>
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}

            {currentUser === 'admin' && (
                <AddItemForm authToken={authToken} onItemAdded={triggerRefresh} />
            )}

            <hr style={{ margin: '40px 0', border: '1px solid #ccc' }} />

            <InventoryDashboard key={refreshKey} currentUser={currentUser} authToken={authToken} />
        </div>
    );
}

export default App;