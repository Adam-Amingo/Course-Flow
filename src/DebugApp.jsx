import React from 'react';

export default function DebugApp() {
    return (
        <div style={{ padding: '50px', backgroundColor: 'yellow', color: 'black' }}>
            <h1>DEBUG MODE ACTIVE</h1>
            <p>If you can see this, React is working perfectly.</p>
            <p>The issue is in the main App.jsx or its components.</p>
        </div>
    );
}
