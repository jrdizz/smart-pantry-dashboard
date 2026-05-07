import React, { useState } from 'react';

interface AddItemAdmin {
    authToken: string | null;
    onItemAdded: () => void;
}

const AddItemForm: React.FC<AddItemAdmin> = ({ authToken, onItemAdded}) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const FIXED_MIN_THRESHOLD = 10;
    const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error'} | null>(null);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setFeedback(null);

        if(quantity < 0 ){
            setFeedback({ text: 'Quantity cannot be negative', type: 'error'});
            return
        }
    try {
            const response = await fetch('http://localhost:8080/api/items', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, quantity, minThreshold: FIXED_MIN_THRESHOLD })
            });

            if (response.ok) {
                setFeedback({ text: 'Item added successfully!', type: 'success'});
                setName('');
                setQuantity(0);
                onItemAdded();

                setTimeout(() => setFeedback(null), 3000);
            } else {
                setFeedback({text: 'Error: Invalid data.', type: 'error'});
            }
    } catch (error) {
            setFeedback({text: 'Network error', type: 'error'});
    }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '15px', marginTop: '20px', borderRadius: '8px' }}>
            <h3>Add new inventory item</h3>
            {feedback && (
                <div style={{padding: '10px',
                marginBottom: '15px',
                borderRadius: '4px',
                backgroundColor: feedback.type === 'success' ? '#d4edda' : '#f8d7da',
                color: feedback.type === 'success' ? '#155724' : '#721c24'}}>
                    {feedback.text}
                </div>
                )}
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
                <input type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="number" min="0" placeholder="Initial Quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
                <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px', cursor: 'pointer'}}>
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default AddItemForm;