import React from 'react';

const TestGrid = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100%',
            zIndex: -1, // Ensure it stays behind other content
        }}>
            {/* This div will show the grid background */}
        </div>
    );
};

export default TestGrid; 