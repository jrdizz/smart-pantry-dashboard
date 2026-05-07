import React, { useEffect, useState } from 'react';
import type {InventoryItem} from "../types/inventory.ts";

interface DashboardProps {
    currentUser: string | null;
    authToken: string | null;
}

const InventoryDashboard: React.FC<DashboardProps> = ({ currentUser, authToken}) => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [restockingItemId, setRestockingItemId] = useState<number | null>(null);
    const [restockAmount, setRestockAmount] = useState< number | string >('');
    const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
    const [actionFeedback, setActionFeedback] = useState<{ text: string; type:'success' | 'error' } | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try{
                const response = await fetch('http://localhost:8080/api/items');
                if (!response.ok) throw new Error(`Failed to fetch inventory: HTTP ${response.status}` );
                const data = await response.json();
                setItems(data);

            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const submitRestock = async (id: number) => {
        setActionFeedback(null);
        const quantityToAdd = Number(restockAmount);
        if(isNaN(quantityToAdd) || quantityToAdd <= 0) {
            setActionFeedback({text: "Please enter a positive number", type: 'error'});
            return;
        }
    try {
        const response = await fetch(`http://localhost:8080/api/items/${id}/restock`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Basic ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: quantityToAdd })
        });

        if (!response.ok) {
            throw new Error(`Restock failed: HTTP ${response.status}`);
        }

        const updatedItem: InventoryItem = await response.json();

        setItems(prevItems =>
        prevItems.map(item => (item.id === id ? updatedItem : item))
        );

        setRestockingItemId(null);
        setRestockAmount('');

        setActionFeedback({text: `Successfully restocked item`, type: 'success'});
        setTimeout(() => setActionFeedback(null), 3000)


        } catch (error) {
            setActionFeedback({text: error instanceof Error ? error.message : "Failed to restock", type: 'error'});
    }
    };

    const handleDelete = async (id: number) => {
        setActionFeedback(null);

        try {
            const response = await fetch(`http://localhost:8080/api/items/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Basic ${authToken}`
                }
            });

            if(!response.ok) {
                throw new Error(`Delete failed: HTTP ${response.status}`);
            }

            setItems(prevItems => prevItems.filter(item => item.id !== id));

            setActionFeedback({text: `Item deleted successfully`, type: 'success'});
            setTimeout(() => setActionFeedback(null), 3000);

        } catch (error) {
            setActionFeedback({text: error instanceof Error ? error.message : "Failed to delete item", type: 'error'});
        } finally {
            setDeletingItemId(null);
        }
    };

    if(loading) return <div>Loading pantry inventory...</div>;
    if (error) return <div style={{color: 'red'}}>{error}</div>;

    const isAdmin = currentUser === 'admin'

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif'}}><h2>Smart Pantry Inventory</h2>
            {actionFeedback && (
                <div style={{
                    padding: '10px',
                    marginBottom: '15px',
                    borderRadius: '4px',
                    backgroundColor: actionFeedback.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: actionFeedback.type === 'success' ? '#155724' : '#721c24'
                }}>
                    {actionFeedback.text}
                </div>
            )}
        <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left'}}><thead style={{ backgroundColor: '#f4f4f4'}}>
        <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Min Threshold</th>
            <th>Stock Status</th>
            {isAdmin && <th>Actions</th>}
        </tr>
        </thead>
            <tbody>
            {items.length === 0 ? (
                <tr>
                    <td colSpan={isAdmin ? 5 : 4} style={{ textAlign: 'center'}}>
                        No items found in the pantry
                    </td>
                </tr>
            ) : (
                items.map((item) => (
                    <tr
                        key={item.id}
                        style={{ backgroundColor: item.isLowStock ? '#ffebee' : 'transparent'}}
                >
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.minThreshold}</td>
                        <td style={{ color: item.isLowStock ? 'red' : 'green', fontWeight: 'bold'}}>
                            {item.isLowStock ? 'Low Stock' : 'OK'}
                        </td>

                        {isAdmin && (
                            <td>
                                {restockingItemId === item.id && (
                                    <div style={{ display: 'flex', gap:'5px'}}>
                                        <input
                                            type="number"
                                            value={restockAmount}
                                            onChange={(e) => setRestockAmount(e.target.value)}
                                            placeholder="Qty"
                                            style={{ width: '60px', padding:'5px' }}
                                            autoFocus
                                            />
                                        <button
                                            onClick={() => submitRestock(item.id)}
                                            style={{ backgroundColor: '#007BFF', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer'}}
                                            >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => { setRestockingItemId(null); setRestockAmount(''); }}
                                            style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}

                                {deletingItemId === item.id && (

                                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center'}}>
                                        <span style={{ fontSize: '13px', color: '#dc3545', fontWeight: 'bold', marginRight: '5px'}}>Sure?</span>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => setDeletingItemId(null)}
                                        style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px'}}
                                        >
                                            No
                                    </button>
                                    </div>
                                    )}

                                {restockingItemId !== item.id && deletingItemId !== item.id && (
                                    <div style={{ display: 'flex', gap: '5px'}}>
                                        <button
                                            onClick={() => { setRestockingItemId(item.id); setRestockAmount(''); setDeletingItemId(null);}}
                                            >
                                            Restock
                                        </button>
                                        <button
                                            onClick={() => { setDeletingItemId(item.id); setRestockingItemId(null); }}
                                            style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border:'none', cursor: 'pointer', borderRadius: '3px'}}
                                            >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        )}
                    </tr>
            ))
            )}
            </tbody>
        </table>
        </div>

    );
};

export default InventoryDashboard;
